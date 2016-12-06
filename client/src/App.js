import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import './assets/index.css';
let keys = require('./config/api_keys.json')

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
    let mapbox = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: this.state.location,
        zoom: 12
    });
  }
}

const Nav = (props) => (
  <div className="ui three buttons">
    <button className="ui button" onClick={props.update}>Food/Drink</button>
    <div className="or"></div>
    <button className="ui button" onClick={props.update}>Parks</button>
    <div className="or"></div>
    <button className="ui button" onClick={props.update}>Events</button>
  </div>
)


export default App
