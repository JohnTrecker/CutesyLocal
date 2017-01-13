var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/cutesy_local';
var Venue = require('../server/resources/api/api'); // TODO: test `Api`
mongoose.Promise = require('bluebird');

// ================================================
// Node can automatically read a JSON file like so
// ================================================
var data = require('../client/src/data/restaurant.json');

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'Hold your horses! Connection error: ', error));
db.once('open', function() {
  console.log('You\'re connected to MongoDB');

  // Venue.remove({}, function(error) {
  //   if (error) { console.log('Failed to clear database'); }
  // });
  // =================================
  // Alternate way to save to MongoDB
  // =================================
  data.forEach(function(venue) {
    var newVenue = new Venue(venue);

    newVenue.save(function(error) {
      if (error) {
        console.log('Could not save new venue');
      }
    });
  });
});

module.exports = db;