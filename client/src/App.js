import React from 'react';
import Mapbox from './map/Map.js'
import Landing from './home/Landing'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/map" component={Mapbox} />
    </div>
  </Router>
);

export default App;