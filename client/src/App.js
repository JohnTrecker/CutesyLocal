import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'; // eslint-disable-line no-console
import React from 'react';
import './assets/index.css';
let restaurantData = require('./data/yelp.json');
let parkData = require('./data/parks.json');
let eventData = require('./data/events.json');
let $ = require('jquery');
let keys = require('./config/api_keys.json');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: [-122.413692, 37.775712],
      restaurantData: restaurantData,
      parkData: parkData,
      eventData: eventData,
      visibleVenues: [],
    }
  }
  updatevisibleVenues(e){
    let classes = ['restaurant', 'park', 'event'];
    let venue;
    let toggledButtons = this.state.visibleVenues;

    // Find the relevant classname
    function findVenue(node, nodeClass) {
      node = node || e.target;
      nodeClass = node.className;
      if ( classes.includes(nodeClass) ) {
        venue = nodeClass;
        return;
      } else {
        let parentNode = node.parentNode;
        let parentNodeClass = parentNode.className
        findVenue(parentNode, parentNodeClass);
      }
    };
    findVenue();

    // toggle marker visibility
    let visibility = $(".mkr-" + venue).css("visibility") === "hidden" ? "visible" : "hidden";
    $(".mkr-" + venue).css("visibility", visibility);

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
    let venueData = [data[0].properties.venue, 'Data'].join();
    this.setState( '{' + venueData + ': ' + data + '}' );
  }
  componentWillMount(){
    // let that = this;

    // // TODO: reset state with current yelp data
    // fetch( 'http://localhost:3000/api/yelp' )
    //   .then( (res) => res.json() )
    //   .then( function(results){
    //     that.setState( {restaurantData: results} )
    //     // Bug: Resets `that` but never affects `this`
    //     //      How does egghead.io make it work?
    //   })
    //   .catch( function(e){
    //     debugger;
    //     console.log(e);
    //   })

  }
  render(){
    // TODO: refactor uneccessary icon names
    return (
      <div className="nav">
        <Button updatevisibleVenues={this.updatevisibleVenues.bind(this)} class="restaurant">
          <div className="btn-contents"><Image class="restaurant"/> Food/Drink</div>
        </Button>
        <Button updatevisibleVenues={this.updatevisibleVenues.bind(this)} class="park">
          <div className="btn-contents"><Image class="park"/> Parks</div>
        </Button>
        <Button updatevisibleVenues={this.updatevisibleVenues.bind(this)} class="event">
          <div className="btn-contents"><Image class="event"/> Events</div>
        </Button>
      </div>
    )
  }
  componentDidMount(){
    mapboxgl.accessToken = keys.mapboxgl_access_token;
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: this.state.location,
        zoom: 12
    });

    let state = [this.state.eventData, this.state.parkData, this.state.restaurantData];
    map.on('load', function(){

      //TODO: clean up previous markers
      //      delete zombie code
      let markers = {};

      state.forEach(function(data){
        data.forEach(function(marker) {
          let el = document.createElement('div');
          // let venue = marker.properties.venue;
          // let img_url = venue === 'park' ? mkr_park : (venue === 'event' ? mkr_event : mkr_coffee);
          let coordinates = marker.geometry.coordinates;

          el.className = 'mkr-' + marker.properties.venue;
          // el.style.backgroundImage = "url(" + img_url + ")";

          markers[marker.properties.name] = new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .addTo(map);
        });
      });
    });
  }
}

let Button = (props) => <button className={ props.class } onClick={ props.updatevisibleVenues } >{ props.children }</button>

const Image = (props) => <img className={ props.class } role="presentation" />


export default App
