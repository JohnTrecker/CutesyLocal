const apiRouter = require('express').Router();
const apiController = require('./apiController');

// =====================================================================
// TODO: Create route handlers for '/users' endpoint
// =====================================================================
apiRouter.route('/venues')
  .get(function(req, res) {
    apiController.retrieve(req, res);
  })
  .post(function(req, res) {
    apiController.createOne(req, res);
  })
  .put(function(req, res) {
    apiController.updateOne(req, res);
  })
  .delete(function(req, res) {
    if (req.params.number) apiController.deleteOne(req, res);
    else apiController.delete(req, res);
  });

apiRouter.route('/venues/:venueType')
  .get(function(req, res) {
    apiController.retrieveByVenue(req, res);
  })

apiRouter.route('/keys')
  .get(function(req, res) {
    apiController.retrieveKey(req, res);
  });

apiRouter.route('/yelp')
  .get(function(req, res) {
    apiController.retrieveYelp(req, res);
  });

// apiRouter.route('/users')
//   .get(function(req, res) {
//     if (req.params.number) apiController.retrieveOne(req, res);
//     else apiController.retrieveOne(req, res);
//   })
//   .post(function(req, res) {
//     apiController.createOne(req, res);
//   })
//   .put(function(req, res) {
//     apiController.updateOne(req, res);
//   })
//   .delete(function(req, res) {
//     if (req.params.number) apiController.deleteOne(req, res);
//     else apiController.delete(req, res);
//   });

module.exports = apiRouter;

