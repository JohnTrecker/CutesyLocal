let express  = require('express');
let mongoose = require('mongoose');
let passport = require('passport');
let helpers  = require('./resources/lib/helpers');
let flash    = require('connect-flash');
let app      = express();
let routehelpers = require('./resources/lib/routehelpers');

let configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

  // set up our express application
  app.use(express.logger('dev')); // log every request to the console
  app.use(express.cookieParser()); // read cookies (needed for auth)
  app.use(express.bodyParser()); // get information from html forms

  // required for passport
  app.use(express.session({ secret: 'alldogsgotoheaven' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.use('/api', require('./resources/api/apiRouter'));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
  helpers.newUser,
  helpers.setCookie,
  helpers.setUserId,
  helpers.setHeader,
  helpers.loginRedirect
);

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

// zombie code ======================================================================
// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
