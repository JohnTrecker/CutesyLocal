const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Strategy = require('passport-facebook').Strategy
    , apiRouter = require('./resources/api/apiRouter')
    , helpers = require('./resources/lib/helpers')
    , id = require('./config/config').facebook_client_id
    , secret = require('./config/config').facebook_client_secret;

let app = express();
app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else {
  app.use(express.static('client/public'));
}

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(app.get('port'), () => {
  console.log(`Server listening at http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  passport.authenticate('facebook')
});
