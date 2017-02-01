// let bodyParser = require('body-parser');
// let request    = require('request');
// let cheerio    = require('cheerio');
// let geocoding  = require('google-geocoding');
// let path       = require('path');
// let NodeGeocoder = require('node-geocoder');
// let keys = require('../../config/config.json');
let fs = require('fs');

module.exports = {

  simplify: function(geojson) {
    return geojson.features.map(function(entry) {
      return {
        name: entry.properties.name,
        address: entry.properties.location.address1,
        longitude: entry.geometry.coordinates[0],
        latitude: entry.geometry.coordinates[1],
        imageUrl: entry.properties.imageUrl,
        venueType: entry.properties.venue || (entry.properties.name.includes('Park') ? 'park' : 'restaurant'),
        reviews: entry.properties.reviews,
        rating: entry.properties.rating,
        dates: entry.properties.dates || null,
        url: entry.properties.url
      };
    });
  },

  geojsonify: function(json) {
    let features = json.map(function(feature){
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [feature.longitude, feature.latitude]
        },
        "properties": feature
      };
    });

    return {
    "type": "FeatureCollection",
    "features": features
    };
  },

  generate: function(...files) {
    // To make an array of geojson venue objects...
    let result = files.map( venue_data => {
      return simplify(venue_data);
    })

    fs.writeFile('./data/venuesArray.json', JSON.stringify(result, null, 2), function(err){
      if (err) throw err;
      console.log("new file generated");
    });
  }
}

// function oldGeojsonify (json) {
//   let options = {
//     provider: 'google',
//     httpAdapter: 'https',
//     apiKey: keys.mapquest_consumer_key,
//     formatter: null
//   };

//   let geocoder = NodeGeocoder(options);
//   return data.businesses.map(function(spot){

//     let longitude, latitude;
//     let address = [spot.location.address1, spot.location.city].join(" ");
//     let transferData = () => {
//       let result = {
//         "type": "Feature",
//         "geometry": {
//           "type": "Point",
//           "coordinates": [longitude, latitude]
//         },
//         "properties": spot
//       };

//       result.properties.image_url = result.properties.image_url || "http://dogsamongus.com/dogs/wp-content/uploads/2014/12/dog-with-sign.jpg";
//       result.properties.venue = spot.categories[0].alias === "dog_parks" ? "park" :
//                                 (spot.categories[0].alias === "events" ? "event" : "restaurant");
//       delete result.properties.coordinates;
//       return result;
//     }

//     // finds coordinates if none provided
//     if (!spot.coordinates.latitude) {
//       geocoder.geocode(address) // Alternately try gps-coordiates.net API
//         .then(function(res) {
//           console.log(res);
//           longitude = spot.coordinates.longitude || newLong;
//           latitude = spot.coordinates.latitude || newLat;
//         })
//         .then(function() {
//           transferData();
//         })
//         .catch(function(err) {
//           console.log(err);
//         });
//     } else {
//       transferData();
//     }

//   });
//   // insert each into a feature
// };

// function scraper (req, res){
//   res.json({ message: 'Welcome to the Cutesy Local RESTful API!' });

//   // scrape for local dog events
//   let url = 'http://dogtrekker.com/events';
//   let json = {
//     total: null,
//     businesses: []
//   }

//   // TODO: String requests
//   request(url, function(error, response, body){
//     if(error) {
//       console.log(error);
//     }
//     console.log("Status code: ", response.statusCode);

//     let $ = cheerio.load(body);
//     $('div#events > div.activity').each(function(value, index) {
//         if ( $(this).find('div.ypaddress').text().includes('San Francisco') ) {
//         // collection
//         let data = {
//           "image_url": null,
//           "dates": null,
//           "description": null,
//           "location": {
//             "address1": null,
//             "zip_code": null,
//             "state": "CA",
//             "country": "US",
//             "city": "San Francisco"
//           },
//           "name": null,
//           "categories": [
//             {
//               "alias": "events",
//               "title": "Dog Events"
//             }
//           ],
//           "id": null,
//           "url": null,
//           "coordinates": {
//             "latitude": null,
//             "longitude": null
//           }
//         }
//         let loc = $(this).find('div.ypaddress').text().trim();
//         console.log("'loc' of entry ", index," equals:\n", loc);
//         let address = loc.slice(0, loc.indexOf('Phone:')).trim();
//         console.log("'address' of entry ", index," equals:\n", address);
//         let raw = $(this).text().trim();
//         console.log("'raw' of entry ", index," equals:\n", raw);

//         // TODO: verify address1
//         data.name = $(this).find('div.title > a').text().trim();
//         data.location.address1 = address.slice(0, address.indexOf(','));
//         data.location.zip_code = address.slice(-5);
//         data.dates = raw.slice(raw.indexOf('\r\n'), raw.indexOf('\r\n\r\n'));
//         data.url = 'http://dogtrekker.com' + $(this).find('div.activitylinks > a:nth-child(2)').attr('href');
//         console.log()
//         geocoding.geocode(address, function(err, location) {
//             if (err) {
//               console.log('Error: ' + err);
//             } else if( !location ) {
//               console.log('No result.');
//             } else {
//               data.coordinates.latitude = location.lat;
//               data.coordinates.longitude = location.lng;
//             }
//         });

//         // // get description in second request
//         // request(data.url, function(error, response, eventPage){
//         //   if(error) {
//         //     console.log(error);
//         //   }
//         //   console.log("Status code: ", response.statusCode);

//         //   let $details = cheerio.load(eventPage);
//         //   data.description = $details('p.event-description').text().trim();
//         //   data.dates = $details('div.primary.event > span').text().trim();
//         // });

//         json.businesses.push(data);
//       }

//     });

//     // update json data
//     json.total = json.businesses.length;
//     // write json to new data file
//     fs.writeFile('../../data/events.json', JSON.stringify(json, null, 4), function(error) {
//       if (error) throw error;
//       console.log("New events saved.");
//     })

//   })
// };