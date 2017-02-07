let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
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

let User = mongoose.model('User', userSchema);
module.exports = User
