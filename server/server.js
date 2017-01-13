const express = require('express');
const app = express();
const apiRouter = require('./resources/api/apiRouter');

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else {
  app.use(express.static('client/public'));
}

app.use('/api', apiRouter);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
