// eslint-disable-next-line
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React from 'react';
import './assets/index.css';
import data from './yelp.json';
import $ from 'jquery';
let keys = require('./config/api_keys.json');
let btn_coffee = require('./assets/icon_btn_coffee.png');
let btn_park = require('./assets/icon_btn_park.png');
let btn_event = require('./assets/icon_btn_event.png');
let mkr_coffee = require('./assets/icon_mkr_coffee.png');
let mkr_park = require('./assets/icon_mkr_park.png');
let mkr_event = require('./assets/icon_mkr_event.png');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: [-122.413692, 37.775712],
      visibleVenues: [],
    }
  }
  update(e){
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

  componentWillMount(){
    mapboxgl.accessToken = keys.mapboxgl_access_token;
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: this.state.location,
        zoom: 12
    });

    map.on('load', function(){
      let markers = {};
      data.businesses.forEach(function(marker) {
          // create an img element for the marker
          let el = document.createElement('div');
          let venue = 'mkr-restaurant' //marker.categories[0].alias
          let img_url = venue === 'dog_parks' ? mkr_park : (venue === 'event' ? mkr_event : mkr_coffee);
          let coordinates = [].concat(marker.coordinates.longitude, marker.coordinates.latitude);

          el.className = venue;
          el.style.backgroundImage = "url(" + img_url + ")";

          markers[marker.name] = new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .addTo(map);
      });
    })
  }
  render(){
    return (
      <div className="nav">
        <Button update={this.update.bind(this)} class="restaurant">
          <div className="btn-contents"><Image icon={btn_coffee}/> Food/Drink</div>
        </Button>
        <Button update={this.update.bind(this)} class="park">
          <div className="btn-contents"><Image icon={btn_park}/> Parks</div>
        </Button>
        <Button update={this.update.bind(this)} class="event">
          <div className="btn-contents"><Image icon={btn_event}/> Events</div>
        </Button>
      </div>
    )
  }
  componentDidMount(){
  }
}

let Button = (props) => <button className={ props.class } onClick={ props.update } >{ props.children }</button>

const Image = (props) => <img src={ props.icon } role="presentation" />


export default App
