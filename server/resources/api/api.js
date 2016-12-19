var mongoose = require('mongoose');

// ================================
// TODO: Join Venues / Users tables
// ================================
var venueSchema = mongoose.Schema({
  number: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  types: [String],
  reviews: [String],
  imageUrl: String
});

// TODO: create new schema for users
  // number, user name, imageUrl, review history
// var userSchema = mongoose.Schema({
//   number: {
//     type: Number,
//     unique: true
//   },
//   name: {
//     type: String,
//     unique: true
//   },
//   reviews: [String],
//   imageUrl: String
// });


// Registers the venuesSchema with Mongoose as the 'Venues' collection.
var Venues = mongoose.model('Venues', venueSchema);
// var Users = mongoose.model('USers', userSchema);

module.exports = Venues;
// module.exports = Users;

