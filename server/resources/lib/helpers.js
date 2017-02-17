// let bodyParser = require('body-parser');
// let request    = require('request');
// let cheerio    = require('cheerio');
// let geocoding  = require('google-geocoding');
// let path       = require('path');
// let NodeGeocoder = require('node-geocoder');
// let keys = require('../../config/config.json');
let fs = require('fs');
let _ = require('underscore');
let mongoose = require('mongoose');

module.exports = {

  addTimestamp: function(file){
    let result = file.map(function(venue){
      if (!venue.reviews) return venue
      venue.reviews.map(function(review){
        review.timestamp = Date.now()
        return review
      })
      return venue;
    });

    fs.writeFile('./server/data/venues3.json', JSON.stringify(result, null, 2), function(err){
      if (err) throw err;
      console.log("new file generated");
    });

  },

  transferYelpData: function(file, yelpData){

    let result = file.map(function(venue){
      yelpData[venue.venueType].forEach(function(yelpVenue){
        let props = yelpVenue.properties;
        if (props.name === venue.name) {
          if (!venue.url) venue.url = props.url;
          if (!venue.imageUrl) venue.imageUrl = props.image_url;
          if (venue.url === "") venue.url = null;
          if (venue.imageUrl === "") venue.imageUrl = null;
        }
      })
      return venue;
    });

    fs.writeFile('./server/data/venues2.json', JSON.stringify(result, null, 2), function(err){
      if (err) throw err;
      console.log("new file generated");
    });
  },

  replaceImages: function(file){
    const index = {
      "Patrick": {
        name: "Patrick",
        image: "http://semantic-ui.com/images/avatar2/large/patrick.png"
      },
      "Laura": {
        name: "Laura",
        image: "http://1.semantic-ui.com/images/avatar/large/laura.jpg"
      }
    };

    let result = file.map(function(venue){
      if(venue.reviews.length && (venue.reviews[0].reviewer === 'Laura' || venue.reviews[0].reviewer === 'Patrick') ) {
      let nomen = venue.reviews[0].reviewer;
        venue.reviews[0].image = index[nomen].image;
      }
      return venue;
    })

    fs.writeFile('./server/data/venues2.json', JSON.stringify(result, null, 2), function(err){
      if (err) throw err;
      console.log("new file generated");
    });
  },

  addImages: function(file){
    let avatars = ['Elliot', 'Jenny', 'Joe', 'Kristy', 'Matt', 'Stevie', 'Ade', 'Daniel', 'Molly', 'Veronika', 'Chris', 'Helen', 'Christian', 'Laura', 'Chloe', 'Elyse', 'Justen', 'Lena', 'Lindsay', 'Lorenzo', 'Mark', 'Nan', 'Patrick', 'Tom', 'Warren']
    const index = {};
    avatars.forEach(function(avatar){
      index[avatar] = `http://semantic-ui.com/images/avatar/large/${avatar.toLowerCase()}.jpg`
    })

    let result = file.map(function(venue){
      if (venue.reviews.length){
        venue.reviews[0].image = index[venue.reviews[0].reviewer]
      }
      return venue;
    })

    fs.writeFile('./server/data/venues3.json', JSON.stringify(result, null, 2), function(err){
      if (err) throw err;
      console.log("new file generated");
    });
  },

  avgRating: function(venue){
    let sum = venue.reviews.reduce(function(memo, curr){
      return curr.rating + memo;
    }, 0);
    return sum/venue.reviews.length;
  },

  avgAccomRating: function(venue){
    let cumAccomm = JSON.parse(JSON.stringify(venue.accommodations));
    for (let prop in cumAccomm) {
      cumAccomm[prop] = 0;
    }

    venue.reviews.forEach(function(review){
      Object.entries(review.accommodations)
            .forEach(function(checkboxResult){
              if (checkboxResult[1] === true) cumAccomm[checkboxResult[0]]++
            })
    })

    for (let key in cumAccomm){
      let avg = cumAccomm[key]/venue.reviews.length;
      cumAccomm[key] = avg > .4 ? true : false;
    }
    return cumAccomm
  },

  dropCollection: function(modelName) {
    if (!modelName || !modelName.length) {
      Promise.reject(new Error('You must provide the name of a model.'));
    }

    try {
      var model = mongoose.model(modelName);
      var collection = mongoose.connection.collections[model.collection.collectionName];
    } catch (err) {
      return Promise.reject(err);
    }

    return new Promise(function (resolve, reject) {
      collection.drop(function (err) {
        if (err) {
          reject(err);
          return;
        }

        // Remove mongoose's internal records of this
        // temp. model and the schema associated with it
        delete mongoose.models[modelName];
        delete mongoose.modelSchemas[modelName];

        resolve();
      });
    });
  },

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
  },

  addSchemata: function(json, newFields) {

    let result = json.map( function(venue) {
      return _.extend(venue, newFields);
    })

    fs.writeFile('./data/venues.json', JSON.stringify(result, null, 2), function(err){
      if (err) throw err;
      console.log("new file generated");
    });
  },

  removeNull: function(json){
    json.forEach(function(venue){
      venue.inside = false;
      venue.outside = false;
      venue.service = false;
    })

    fs.writeFile('./data/venues2.json', JSON.stringify(json, null, 2), function(err){
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