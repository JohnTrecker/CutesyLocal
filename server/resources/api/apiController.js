const mongoose = require('mongoose');
const axios = require('axios');
const Venues = require('../../db/models/venues.js');
const Users = require('../../db/models/users');
const helpers = require('../lib/helpers');
const mapboxToken = require('../../config/config').mapboxgl_access_token;
mongoose.Promise = require('bluebird');

// ===============
// User methods
// ===============

// ===============
// Venues methods
// ===============
exports.retrieve = function (req, res) {
  console.log('Retreive method called. Returning all venues...')
  Venues.find({}, function(error, venues) {
    if (error) {
      console.log('error retrieving venues: ', error);
      res.send(404);
    } else {
      console.log('serving venues from controller...');
      let result = helpers.geojsonify(venues);
      res.status(202)
      .json(result);
    }
  });
};

exports.retrieveById = function (req, res) {
  Venues.find({ _id: '5899120bc19279088548cbc8' }, function(error, venues) {
    if (error) {
      console.log('error retrieving ', venueType, ' data:', error);
      res.send(404);
    } else {
      let result = helpers.geojsonify(venues);
      res.status(202)
      .json(result);
    }
  });
};

exports.retrieveByVenue = function (req, res) {
  var venueType = req.params.venueType;
  Venues.find({ venueType: venueType }, function(error, venues) {
    if (error) {
      console.log('error retrieving ', venueType, ' data:', error);
      res.send(404);
    } else {
      let result = helpers.geojsonify(venues);
      res.status(202)
      .json(result);
    }
  });
};

exports.createOne = function (req, res) {
  var newVenue = req.body;
  Venues.create(newVenue, function(error, newVenue) {
    if (error) {
      console.log('error creating one: ', error);
      res.send(404);
    } else {
      res.status(201)
      .json(newVenue);
    }
  });
};

exports.delete = function (req, res) {
  Venues.remove({}, function(error, venues) {
    if (error) {
      console.log('error deleting venues: ', error);
      res.send(404);
    } else {
      res.status(204)
      .json(venues);
    }
  });
};

exports.retrieveOne = function (req, res) {
  // ======================================================================
  // Use req.params.number to pull number passed into URL as "/api/:number"
  // ======================================================================
  // N.b. req.params.number.replace(':number', '') === req.params.number
  var number = req.params.number;
  Venues.findOne({ number: number }, function(error, venue) {
    if (error) {
      console.log('error retrieving one: ', error);
      res.send(404);
    } else {
      res.status(200)
      .json(venue);
    }
  });
};

exports.updateOneVenue = function (req, res) {
  let data = req.body,
      user = data.user,
      id   = data.venue._id,
      review = data.review;

  Venues.findOne({ _id: id }, function(error, venue) {
    if (error) {
      console.log('error updating one: ', error);
      res.send(404);
    } else {
      venue.reviews.push({
        reviewer: user.name,
        review: review.review,
        rating: review.rating,
        image: user.picture.data.url,
      });
      venue.rating = helpers.avgRating(venue);
      venue.save();
      res.status(200)
      .json(venue);
    }
  });
};


exports.deleteOne = function (req, res) {
  var number = req.params.number;
  Venues.findOneAndRemove({ number: number }, function(error, venue) {
    if (error) {
      console.log('error deleting one: ', error);
      res.send(404);
    } else {
      res.status(500)
      .json(venue);
    }
  });
};

exports.retrieveKey = function (req, res) {
  if (mapboxToken === undefined) {
    console.log('error retrieving key');
    res.send(404);
  } else {
    res.status(202)
    .json(mapboxToken);
  }
};

exports.retrieveYelp = function (req, res) {
  // TODO: make yelp request dynamic
  var yelp_url = 'https://api.yelp.com/v3/businesses/search?term=dogs+allowed&latitude=37.775712&longitude=-122.413692&radius=8000&limit=5&categories=restaurants';
  var token = 'Bearer ' + keys.yelp_api_token;

  axios({
    url: yelp_url,
    method: 'get',
    headers: { authorization: token }
  })
  .then(function(result){
    console.log('success retreiving yelp data on back end');
    if (result === undefined) {
      // console.log('Back end retrieved yelp data is undefined :\n', result);
      res.send(404);
    } else {
      // console.log('Back end retrieved yelp data:\n', result.data);
      res.json(result.data);
    }
  })
  .catch(function(error){
    console.log('error retrieving yelp data on back end:\n', error)
  })
};