let express    = require('express');
let mongoose   = require('mongoose');
let bodyParser = require('body-parser');
let fs         = require('fs');
let app        = express();
let helpers    = require('./resources/lib/helpers');
let configDB   = require('./config/database.js');
let Venue      = require('./db/models/venues');
let data       = require('./data/venues3.json');
let dotenv     = require('dotenv');

dotenv.load();

// db configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(callback){
  console.log('Huzzah. DB connected.')

  // =====================================
  // TO DROP USER GENERATED RECORDS...
  // =====================================
  helpers.dropCollection('Venue');
  data.forEach(function(venue) {
    let newVenue = new Venue(venue);

    newVenue.save(function(error) {
      if (!error) {
        console.log('new venue saved!:\n', venue);
      }
    });
  });

})

// middleware ==================================================================
app.use(require('morgan')('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms
app.use(require('connect-flash')()); // use connect-flash for flash messages stored in session

// routes ======================================================================
app.use('/api', require('./resources/api/apiRouter'));

// launch ======================================================================
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else {
  app.use(express.static('client/public'));
}

app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), () => {
  console.log(`Server listening at http://localhost:${app.get('port')}/`);
});
