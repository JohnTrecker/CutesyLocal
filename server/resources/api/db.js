// const uri = 'mongodb://localhost:27017/cutesy',
const mongoose = require('mongoose');
//       db = mongoose.connection;

// mongoose.connect(uri);
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function(callback){
//   console.log('Huzzah. DB connected.')
// })

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
  address: String,
  longitude: Number,
  latitude: Number,
  imageUrl: String,
  venueType: String,
  reviews: [{
    reviewer: String,
    review: String
  }],
  rating: Number,
  dates: String,
  url: String
});

let userSchema = mongoose.Schema({
  facebook: {
    id: {
      type: Number,
      unique: true,
      required: true
    },
    token: String,
    name: String,
    email: String,
  },
  reviews: [{
    venueName: String,
    date: Date,
    review: String
  }],
  imageUrl: String
});

exports.Venues = mongoose.model('Venues', venueSchema);
exports.Users = mongoose.model('Users', userSchema);