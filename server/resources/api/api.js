var mongoose = require('mongoose');

// ================================
// TODO: Join Venues / Users tables
// ================================
let venueSchema = mongoose.Schema({
  number: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  coordinates: [CoordinatesSchema],
  reviews: [ReviewSchema],
  imageUrl: String,
  venueType: String
});

let CoordinatesSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number
})

let ReviewSchema = mongoose.Schema({
  reviewer: String,
  review: String
})

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
let Venues = mongoose.model('Venues', venueSchema);
// var Users = mongoose.model('Users', userSchema);

module.exports = Venues;
// module.exports = Users;

