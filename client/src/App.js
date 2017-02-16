import React from 'react';
import Popup from './Popup';
import Login from './Login';
import Nav from './Nav';
import ReviewModal from './ReviewModal';
import './assets/index.css';
import { Sidebar } from 'semantic-ui-react'

let $ = require('jquery');
let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); // eslint-disable-line no-console
mapboxgl.accessToken = 'pk.eyJ1IjoianR0cmVja2VyIiwiYSI6ImNpdWZ1OWliZzAwaHQyenFmOGN0MXN4YTMifQ.iyXRDHRVMREFePkWFQuyfg';
let map;

let helpers = require('./lib/helpers');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      venue: undefined,
      review: {accommodations: {}},
      reviewModalOpen: false,
      loginModalOpen: false,
      popupOpen: false,
      reviewsVisible: false,
      visibleVenues: [],
    }
  }

  render(){
    return (
      <Sidebar.Pushable id="container">
        <Popup
          marker={this.state.venue}
          user={this.state.user}
          visible={this.state.popupOpen}
          toggleReviewModal={this.toggleState.bind(this, 'reviewModalOpen')}
          toggleLoginModal={this.toggleState.bind(this, 'loginModalOpen')}
          reviewsVisible={this.state.reviewsVisible}
          showReviews={this.toggleState.bind(this, 'reviewsVisible')} />
        <Sidebar.Pusher>
          <Nav
            updateVisibleVenues={this.updateVisibleVenues.bind(this)} />
          <div id="map"></div>
          <Login
            open={this.state.loginModalOpen}
            setUser={this.setUser.bind(this)}
            toggleModal={this.toggleState.bind(this, 'loginModalOpen')} />
          <ReviewModal
            marker={this.state.venue}
            user={this.state.user}
            handleChange={this.handleChange.bind(this)}
            submitReview={this.submitReview.bind(this)}
            open={this.state.reviewModalOpen}
            toggleModal={this.toggleState.bind(this, 'reviewModalOpen')} />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }

  componentDidMount(){
    if (!this.user) this.toggleState('loginModalOpen')
    let setVenue = this.toggleState.bind(this);
    let togglePopup = this.togglePopup.bind(this);

    fetch( 'http://localhost:3000/api/keys' )
      .then( response => response.json() )
      .then( function(token) {
        mapboxgl.accessToken = token;
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/jttrecker/cixhxpdge00hg2ppdzmrw1ox9',
            center: [-122.413692, 37.775712],
            zoom: 12
        });

        const venues = ['restaurant', 'park', 'event'];
        const markers = [];
        map.on('load', function() {
          venues.forEach(function(venue){
            helpers.renderMarkers(map, venue);
            markers.push(`unclustered-points-${venue}`);
          });
        });

        map.on('mousemove', function (e) {
          let features = map.queryRenderedFeatures(e.point, { layers: markers });
          if (features) map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });

        map.on('click', function (e) {
          let features = map.queryRenderedFeatures(e.point, { layers: markers });
          let markersPresent = features.length > 0 ? true : false;
          if (markersPresent) {
            let marker = features[0];
            map.flyTo({center: marker.geometry.coordinates});
            marker.properties.reviews = JSON.parse(marker.properties.reviews);
            marker.properties.accommodations = JSON.parse(marker.properties.accommodations);
            setVenue({venue: marker.properties, reviewsVisible: false});
          }
          togglePopup(markersPresent);
        });
      })
      .catch( function(e){
        console.log('error fetching mapbox token:\n', e);
      })
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

  toggleState(stateOrObj){
    let newState = {};
    if (typeof stateOrObj === 'string') newState[stateOrObj] = !this.state[stateOrObj];
    else newState = stateOrObj;
    this.setState(newState);
  }

  togglePopup(markerPresent){
    const either = markerPresent && !this.state.popupOpen
    const or = !markerPresent && this.state.popupOpen
    if (either || or) this.toggleState('popupOpen');
  }

  setUser(profile){
    this.setState({user: profile, loginModalOpen: !this.state.loginModalOpen});
  }

  handleChange(e, el){
    let key = el.className;
    let value = key === 'rating' ? el.rating :
      (key === 'review' ? el.value : el.checked)
    // TODO: validate `value` for XSS prevention
    let newState = Object.assign({}, this.state.review);
    if (key === 'rating') newState[key] = value
    else if (key === 'review') newState[key] = value
    else newState.accommodations[key] = value
    this.setState({review: newState});
  }

  submitReview(){
    const body = {};
    [body.user, body.venue, body.review] = [this.state.user, this.state.venue, this.state.review];
    console.log('Step 1 - body passed to saveReview in helpers:\n', body);

    let promise = new Promise(function(resolve, reject){
      resolve(helpers.saveReview(body, map, body.venue.venueType));
    })

    const newState = Object.assign({}, this.state.venue);
    const that = this;
    promise.then(function(value) {
      console.log('Step 5: returned value from Controller', value);
      newState["reviews"] = value.reviews;
      newState["accommodations"] = value.accommodations;
      that.setState({venue: newState});
      that.toggleState('reviewModalOpen');
    });
  }

}

export default App
