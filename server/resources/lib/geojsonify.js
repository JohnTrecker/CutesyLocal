let NodeGeocoder = require('node-geocoder');
let keys = require('../../config/config.json');

let options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: keys.mapquest_consumer_key,
  formatter: null
};

let geocoder = NodeGeocoder(options);

exports.geojsonify = function(data) {
  return data.businesses.map(function(spot){

    let longitude, latitude;
    let address = [spot.location.address1, spot.location.city].join(" ");
    let transferData () => {
      let result = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [longitude, latitude]
        },
        "properties": spot
      };

      result.properties.image_url = result.properties.image_url || "http://dogsamongus.com/dogs/wp-content/uploads/2014/12/dog-with-sign.jpg";
      result.properties.venue = spot.categories[0].alias === "dog_parks" ? "park" :
                                (spot.categories[0].alias === "events" ? "event" : "restaurant");
      delete result.properties.coordinates;
      return result;
    }

    // finds coordinates if none provided
    if (!spot.coordinates.latitude) {
      geocoder.geocode(address) // Alternately try gps-coordiates.net API
        .then(function(res) {
          console.log(res);
          longitude = spot.coordinates.longitude || newLong;
          latitude = spot.coordinates.latitude || newLat;
        })
        .then(function() {
          transferData();
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      transferData();
    }

  });
};