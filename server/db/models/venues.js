let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let venueSchema = new Schema({
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
    review: String,
    image: String,
    rating: Number,
    timestamp: Date,
  }],
  rating: Number,
  dates: String,
  url: String,
  imageUrl: String,
  inside: {
    type: Boolean,
    default: false
  },
  outside: {
    type: Boolean,
    default: false
  },
  service: {
    type: Boolean,
    default: false
  }
});

let Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue