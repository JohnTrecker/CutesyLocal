import React from 'react';
import Mapbox from './Map'
import Home from './Home'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/map" component={Mapbox} />
    </div>
  </Router>
);

export default App;