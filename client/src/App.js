import Login from './Login';
import Nav from './Nav';
import Popup from './Popup';
import React from 'react';
import ReviewModal from './ReviewModal';
import { Sidebar } from 'semantic-ui-react'

console.log(DB_USER)
console.log(DB_PASSWORD)
console.log(MAPBOXGL_ACCESS_TOKEN)
console.log(FACEBOOK_CLIENT_ID);
// require('dotenv').config();
let helpers = require('./lib/helpers');
let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
let map;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: undefined,
      venue: undefined,
      review: {
        accommodations: {}
      },
      reviewModalOpen: false,
      loginModalOpen: false,
      popupOpen: false,
      reviewsVisible: false,
      visibleVenues: [],
    }
  }

  componentWillMount(){
    let toggleState = this.toggleState.bind(this);
    let togglePopup = this.togglePopup.bind(this);
    fetch( '/api/keys' )
      .then( response => response.json() )
      .then( function(token) {
        console.log('MBGL token in App.js:\n', token);
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
          setTimeout(() => toggleState('loading'), 700);
          venues.forEach(function(venue){
            helpers.renderMarkers(map, venue);
            markers.push(`unclustered-points-${venue}`);
          });
        });

        map.on('mousemove', function (e) {
          let features = map.queryRenderedFeatures(e.point, { layers: markers });
          if (features) map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });

        map.on('click', function (e) { // eslint-disable-next-line no-console
          let features = map.queryRenderedFeatures(e.point, { layers: markers });// eslint-disable-next-line no-console
          let markersPresent = features.length > 0 ? true : false;

          if (markersPresent) {
            let marker = features[0];
            map.flyTo({center: marker.geometry.coordinates});
            if (typeof marker.properties.reviews === 'string') {
              marker.properties.reviews = JSON.parse(marker.properties.reviews)
            }
            if (typeof marker.properties.accommodations === 'string') {
              marker.properties.accommodations = JSON.parse(marker.properties.accommodations)
            }
            // marker.properties.reviews.accommodations = marker.properties.accommodations;
            toggleState({venue: marker.properties, reviewsVisible: false});
          }

          togglePopup(markersPresent);
        });
      })
      .catch( function(e){
        console.log('error fetching mapbox token:\n', e);
      })

  }

  render(){
    const { loading, loginModalOpen, popupOpen, reviewModalOpen,
          reviewsVisible, user, venue, visibleVenues } = this.state;
    return (
      <Sidebar.Pushable id="container">
        <Popup
          marker={venue}
          user={user}
          visible={popupOpen}
          toggleReviewModal={this.toggleState.bind(this, 'reviewModalOpen')}
          toggleLoginModal={this.toggleState.bind(this, 'loginModalOpen')}
          reviewsVisible={reviewsVisible}
          showReviews={this.toggleState.bind(this, 'reviewsVisible')} />
        <Sidebar.Pusher>
          <Nav
            visibleVenues={visibleVenues}
            updateVisibleVenues={this.updateVisibleVenues.bind(this)}
            loading={loading} />
          <div id="map"></div>
          <Login
            open={loginModalOpen}
            setUser={this.setUser.bind(this)}
            toggleModal={this.toggleState.bind(this, 'loginModalOpen')} />
          <ReviewModal
            marker={venue}
            user={user}
            handleChange={this.handleChange.bind(this)}
            submitReview={this.submitReview.bind(this)}
            open={reviewModalOpen}
            toggleModal={this.toggleState.bind(this, 'reviewModalOpen')} />
        </Sidebar.Pusher>
      </Sidebar.Pushable>

    )
  }

  componentDidMount(){
    if (!this.state.user) this.toggleState('loginModalOpen');
  }

  updateVisibleVenues(e){
    let classNames = ['restaurant', 'park', 'event'];
    let venue;
    let toggledButtons = this.state.visibleVenues.slice();

    // Find the relevant class name
    (function findVenue(node) {
      node = node || e.target;
      let NodeClass = node.className.split(' ').pop();
      if ( classNames.includes(NodeClass) ) {
        venue = NodeClass;
        return;
      } else {
        let parentNode = node.parentNode;
        findVenue(parentNode);
      }
    })()

    // Reset visibleVenues
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
    let newState = JSON.parse(JSON.stringify(this.state.review));
    if (key === 'rating') newState[key] = value
    else if (key === 'review') newState[key] = value
    else newState.accommodations[key] = value
    this.setState({review: newState});
  }

  submitReview(){
    const body = {};
    [body.user, body.venue, body.review] = [this.state.user, this.state.venue, this.state.review];
    if (!body.review.review) {
      window.alert('Woops, you forgot to write a review.');
      return
    }
    let promise = new Promise(function(resolve, reject){
      resolve(helpers.saveReview(body, map, body.venue.venueType));
    })

    let newVenueState = JSON.parse(JSON.stringify(this.state.venue));
    const that = this;
    promise.then(function(value) {
      newVenueState["reviews"] = value.reviews;
      newVenueState["accommodations"] = value.accommodations;
      newVenueState["rating"] = value.rating;

      that.setState({venue: newVenueState});
      that.setState({review: {accommodations: {}} });
      that.toggleState('reviewModalOpen');
    });
  }

}

export default App
