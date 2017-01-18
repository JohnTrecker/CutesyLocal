const express = require('express');
const app = express();
const apiRouter = require('./resources/api/apiRouter');
const bodyParser = require('body-parser');
const helpers = require('./resources/lib/helpers');
let restaurants = require('../client/src/data/restaurant.json');
let parks = require('../client/src/data/event.json');
let events = require('../client/src/data/park.json');

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
});
