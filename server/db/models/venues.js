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
    accommodations: {
      inside: Boolean,
      outside: Boolean,
      service: Boolean,
      specials: Boolean,
      allowed: Boolean,
      encouraged: Boolean,
      offleash: Boolean,
      disposal: Boolean,
      shade: Boolean,
      water: Boolean,
      fenced: Boolean,
      equipment: Boolean,
      smallDogEnclosure: Boolean
    },
    timestamp: Number,
  }],
  rating: Number,
  dates: String,
  url: String,
  imageUrl: String,
  accommodations: {
    inside: Boolean,
    outside: Boolean,
    service: Boolean,
    specials: Boolean,
    allowed: Boolean,
    encouraged: Boolean,
    offleash: Boolean,
    disposal: Boolean,
    shade: Boolean,
    water: Boolean,
    fenced: Boolean,
    equipment: Boolean,
    smallDogEnclosure: Boolean
  }
});

let Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue