// eslint-disable-next-line
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import data from './yelp.json';
let keys = require('./config/api_keys.json');
let coffee = require('./assets/icon_coffee.png');
let park = require('./assets/icon_park.png');
let event = require('./assets/icon_event.png');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: [-122.413692, 37.775712],
      venues: null,
    }
  }
  update(e){
    this.setState({venues: e.target.value})
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
          let venue = 'restaurant' //marker.categories[0].alias
          let img_url = venue === 'dog_parks' ? park : (venue === 'event' ? event : coffee);
          let coordinates = [].concat(marker.coordinates.longitude, marker.coordinates.latitude);

          el.className = 'marker ' + venue;
          el.style.backgroundImage = "url(" + img_url + ")";

          markers[marker.name] = new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .addTo(map);
      });
    })
  }
  render(){
    return (
      <div>
        <Nav update={this.update.bind(this)} />
      </div>
    )
  }
  componentDidMount(){
  }
}

class Nav extends React.Component {
  constructor(){
    super();
  }
  render(){
    return (
      <div className="ui three buttons">
        <Button onClick={this.update} classes="ui toggle button blue"><Image icon={coffee}/> Food/Drink</Button>
        <div className="or"></div>
        <Button classes="ui toggle button green"><Image icon={park}/> Parks</Button>
        <div className="or"></div>
        <Button classes="ui toggle button red"><Image icon={event}/> Events</Button>
      </div>
    )
  }
}

const Button = (props) =>
  <button className={props.classes}>
    { props.children }
  </button>

class Image extends React.Component {
  render(){
    return <img className="ui avatar image" src={this.props.icon} role="presentation" />
  }
}

export default App
