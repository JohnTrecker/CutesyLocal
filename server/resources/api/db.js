// const mongoose = require('mongoose');

// let venueSchema = mongoose.Schema({
//   name: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   address: String,
//   longitude: Number,
//   latitude: Number,
//   imageUrl: String,
//   venueType: String,
//   reviews: [{
//     reviewer: String,
//     review: String
//   }],
//   rating: Number,
//   dates: String,
//   url: String,
//   ammenities: {
//     inside: Boolean,
//     outside: Boolean,
//     service: Boolean
//   }
// });

// let userSchema = mongoose.Schema({
//   facebook: {
//     id: Number,
//     accessToken: String,
//     name: String,
//     email: String,
//     picture: String
//   },
//   reviews: [{
//     venueName: String,
//     date: Date,
//     review: String
//   }],
//   imageUrl: String
// });

// exports.Venues = mongoose.model('Venues', venueSchema);
// exports.Users = mongoose.model('Users', userSchema);