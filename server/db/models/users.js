const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  facebook: {
    id: Number,
    accessToken: String,
    name: String,
    email: String,
    picture: String
  },
  reviews: [{
    venueName: String,
    date: Date,
    review: String
  }],
  imageUrl: String
});

exports.Users = mongoose.model('Users', userSchema);