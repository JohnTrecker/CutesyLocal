let uri = 'mongodb://localhost:27017/cutesy'

let mongoose = require('mongoose');
mongoose.connect(uri);

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(callback){
  console.log('Huzzah. DB connected.')
})

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
exports.Venues = mongoose.model('Venues', venueSchema);
// var Users = mongoose.model('Users', userSchema);