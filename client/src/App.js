import React from 'react';
import Popup from './Popup';
import Nav from './Nav';
import Review from './Review';
import './assets/index.css';
import './semantic-ui/semantic.min.css';

let $ = require('jquery');
let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); // eslint-disable-line no-console
let helpers = require('./lib/helpers');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      currentVenue: undefined,
      modalOpen: false,
      visibleVenues: [],
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

  // TODO: persist UG review data
  saveReview(){
  }

  toggleModal(){
    this.setState({modalOpen: !this.state.modalOpen})
  }

  setUser(profile){
    this.setState({user: profile})
  }

  setCurrentVenue(marker){
    this.setState({currentVenue: marker});
  }

  render(){
    return (
      <div id="container">
        <Nav
          updateVisibleVenues={this.updateVisibleVenues.bind(this)} />
        <div id="map"></div>
        <Review
          marker={this.state.currentVenue}
          user={this.state.user}
          open={this.state.modalOpen}
          toggleModal={this.toggleModal.bind(this)} />
        <Popup
          marker={this.state.currentVenue}
          user={this.state.user}
          setUser={this.setUser.bind(this)}
          toggleModal={this.toggleModal.bind(this)} />,
      </div>
    )
  }

  componentDidMount(){
    // if (!this.user) this.toggleModal();
    let setCurrentVenue = this.setCurrentVenue.bind(this);
    fetch( 'http://localhost:3000/api/keys' )
      .then( response => response.json() )
      .then( function(token) {
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
            // console.log('feature clicked\nsetUser = ', setUser, '\ntoggleModal = ', toggleModal);
            let marker = features[0];
            setCurrentVenue(marker.properties);
          }
        });
      })
      .catch( function(e){
        console.log('error fetching mapbox token:\n', e);
      })
  }
}

// ReactDOM.render(
//   document.getElementById('popup'));


export default App
