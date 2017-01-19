import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';
import Nav from './Nav';
import './assets/index.css';
let $ = require('jquery');
let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); // eslint-disable-line no-console
let helpers = require('./lib/helpers');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      restaurantData: '',
      parkData: '',
      eventData: '',
      visibleVenues: [],
      bounds: ''
    }
  }
  updateVisibleVenues(e){
    let classNames = ['restaurant', 'park', 'event'];
    let venue;
    let toggledButtons = this.state.visibleVenues;

    // Find the relevant class name
    function findVenue(node, NodeClass) {
      node = node || e.target;
      NodeClass = node.className;
      if ( classNames.includes(NodeClass) ) {
        venue = NodeClass;
        return;
      } else {
        let parentNode = node.parentNode;
        let parentNodeClass = parentNode.className
        findVenue(parentNode, parentNodeClass);
      }
    };
    findVenue();

    // toggle button color
    let palette = {
      restaurant: "rgb(42, 183, 202)",
      park: "rgb(126, 211, 33)",
      event: "rgb(208, 2, 27)"
    };
    let updatedButtonBackgroundColor = $("button." + venue).css("background-color") === "rgb(221, 221, 221)" ? palette[venue] : "rgb(221, 221, 221)";
    let updatedButtonTextColor = $("button." + venue).css("background-color") === "rgb(221, 221, 221)" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";

    $("button." + venue).css("background-color", updatedButtonBackgroundColor);
    $("button." + venue).css("color", updatedButtonTextColor);

    // update state.visibleVenues
    if (toggledButtons.includes(venue)) {
      let i = toggledButtons.indexOf(venue);
      toggledButtons.splice(i, i + 1);
    } else {
      toggledButtons.push(venue);
    }
    this.setState({visibleVenues: toggledButtons});
  }
  render(){
    return (
      <div id="container">
        <Nav updateVisibleVenues={this.updateVisibleVenues.bind(this)} />
        <div id="map"></div>
        <div id="popup"></div>
      </div>
    )
  }
  componentDidMount(){
    fetch( 'http://localhost:3000/api/keys' )
      .then( response => response.json() )
      .then( (token) => {
        mapboxgl.accessToken = token;
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/jttrecker/cixhxpdge00hg2ppdzmrw1ox9',
            center: [-122.413692, 37.775712],
            zoom: 12
        });

        const venues = ['restaurant', 'park', 'event'];
        map.on('load', function() {
          venues.forEach(function(venue){
            helpers.renderMarkers(map, venue);
          });
        });

        map.on('click', function (e) {
          let features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-points-restaurant', 'unclustered-points-park', 'unclustered-points-event'] });
          if (features.length) {
            let marker = features[0];
            ReactDOM.render(<Popup marker={marker.properties} />, document.getElementById('popup'));
          };
        });
      })
      .catch( function(e){
        console.log('error fetching mapbox token:\n', e);
      })
  }
}


export default App
