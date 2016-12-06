import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import './assets/index.css';
let keys = require('./config/api_keys.json');
let coffee = require('./assets/icon_coffee.png');
let park = require('./assets/icon_park.png');
let event = require('./assets/icon_event.png');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: [-122.413692, 37.775712],
      venues: 'restaurants',
    }
  }
  update(e){
    this.setState({venues: e.target.value})
  }
  componentWillMount(){
  }
  render(){
    return (
      <div id="map">
        <Nav update={this.update.bind(this)} />
      </div>

    )
  }
  componentDidMount(){
    mapboxgl.accessToken = keys.mapboxgl_access_token;
    new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: this.state.location,
        zoom: 12
    });
  }
}

class Nav extends React.Component {
  render(){
    return (
      <div className="ui three buttons">
        <Button classes="ui toggle button blue"><Image icon={coffee}/> Food/Drink</Button>
        <div className="or"></div>
        <Button classes="ui toggle button green"><Image  icon={park}/> Parks</Button>
        <div className="or"></div>
        <Button classes="ui toggle button red"><Image  icon={event}/> Events</Button>
      </div>
    )
  }
}

const Button = (props) => <button className={props.classes}>{ props.children }</button>

class Image extends React.Component {
  render(){
    return <img className="ui avatar image" src={this.props.icon} />
  }
}

export default App
