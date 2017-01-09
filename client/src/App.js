let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); // eslint-disable-line no-console
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import Popup from './Popup';
import './assets/index.css';
let $ = require('jquery');
let keys = require('./config/api_keys.json');

mapboxgl.accessToken = keys.mapboxgl_access_token;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: [-122.413692, 37.775712],
      restaurantData: '',
      parkData: '',
      eventData: '',
      visibleVenues: [],
      bounds: ""
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
  updateData(data){
    let venueData = `${data[0].properties.venue}Data`;
    this.setState( `${venueData}: ${data}` );
  }
  updateLocation(loc){
    this.setState({location: loc});
  }
  // componentWillMount(){

  //   // TODO: reset state with current yelp data
  //   fetch( 'http://localhost:3000/api/yelp' )
  //     .then( (res) => res.json() )
  //     .then( function(results){
  //       this.updateData( results );
  //       // Bug: Resets `that` but never affects `this`
  //       //      How does egghead.io make it work?
  //     })
  //     .catch( function(e){
  //       debugger;
  //       console.log(e);
  //     })

  // }
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
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jttrecker/cixhxpdge00hg2ppdzmrw1ox9',
        center: this.state.location,
        zoom: 12
    });
    // map.addControl(new mapboxgl.AttributionControl(), 'top-left');

    const venues = ["restaurant", "park", "event"];
    map.on('load', function(){

      venues.forEach(function(venue){
        map.addSource(venue, {
          type: "geojson",
          data: require("./data/" + venue + ".json"),
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        });

        map.addLayer({
          "id": "unclustered-points-" + venue,
          "type": "symbol",
          "source": venue,
          "filter": ["!has", "point_count"],
          "layout": {
              "icon-image": "icon_mkr_" + venue,
              "visibility": "none",
          }
        });

        let palette = {
          restaurant: '#2ab7ca',
          park: '#7ed321',
          event: '#d0021b'
        };


        map.addLayer({
          "id": "cluster-" + venue,
          "type": "circle",
          "source": venue,
          "layout": {
            "visibility": "none"
          },
          "paint": {
            "circle-color": palette[venue],
            "circle-radius": 18
          },
          "filter": [">", "point_count", 0]
        });

        map.addLayer({
          "id": "cluster-count-" + venue,
          "type": "symbol",
          "source": venue,
          "layout": {
            "visibility": "none",
            "text-field": "{point_count}",
            "text-font": [
              "DIN Offc Pro Medium",
              "Arial Unicode MS Bold"
            ],
            "text-size": 12
          }
        });

        // for each coorespnding button in nav bar
          // add onclick behavior to toggle layer visibility
        let button = document.getElementsByClassName(venue)[0];
        let markerLayers = [`unclustered-points-${venue}`, `cluster-${venue}`, `cluster-count-${venue}`];

        button.onclick = function(e) {
          markerLayers.forEach(function(markerLayer){
            let visibility = map.getLayoutProperty(markerLayer, 'visibility');
            if (visibility === 'visible') {
              map.setLayoutProperty(markerLayer, 'visibility', 'none');
            } else {
              map.setLayoutProperty(markerLayer, 'visibility', 'visible');
            }
          });
        };

      });
    });

    map.on('click', function (e) {
      let features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-points-restaurant', 'unclustered-points-park', 'unclustered-points-event'] });
      if (features.length) {
        let marker = features[0].properties;
        ReactDOM.render(<Popup marker={marker} />, document.getElementById('popup'));
      };

    });
  }

}


export default App
