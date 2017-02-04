const mongoose = require('mongoose');

let venueSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  address: String,
  longitude: Number,
  latitude: Number,
  venueType: String,
  reviews: [{
    reviewer: String,
    review: String
  }],
  rating: Number,
  dates: String,
  url: String,
  imageUrl: String,
  inside: Boolean,
  outside: Boolean,
  service: Boolean
});

exports.Venues = mongoose.model('Venues', venueSchema);