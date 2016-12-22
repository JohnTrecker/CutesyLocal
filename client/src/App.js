let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); // eslint-disable-line no-console
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
let $ = require('jquery');
let keys = require('./config/api_keys.json');
let restaurantData = require('./data/yelp.json');
let parkData = require('./data/parks.json');
let eventData = require('./data/events.json');


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
  updateVisibleVenues(e){
    let classes = ['restaurant', 'park', 'event'];
    let venue;
    let toggledButtons = this.state.visibleVenues;

    // Find the relevant class name
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
    let marker = $(`.mkr-${venue}`);
    let visibility = marker.css("visibility") === "hidden" ? "visible" : "hidden";
    marker.css("visibility", visibility);

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

    // remove from

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
    return (
      <div id="container">
        <div id="nav">
          <Button updateVisibleVenues={this.updateVisibleVenues.bind(this)} class="restaurant">
            <div className="btn-contents"><Image class="restaurant"/> Food/Drink</div>
          </Button>
          <Button updateVisibleVenues={this.updateVisibleVenues.bind(this)} class="park">
            <div className="btn-contents"><Image class="park"/> Parks</div>
          </Button>
          <Button updateVisibleVenues={this.updateVisibleVenues.bind(this)} class="event">
            <div className="btn-contents"><Image class="event"/> Events</div>
          </Button>
        </div>
        <div id="map"></div>
        <div id="popup"></div>
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
      //      fix Forbidden 403 response status
      let markers = {};

      // Add markers and popups to map
      state.forEach(function(data, index){
        data.forEach(function(marker) {

          // marker
          let el = document.createElement('div');
          let coordinates = marker.geometry.coordinates;
          el.className = 'mkr-' + marker.properties.venue;

          // onClick behavior
          el.onclick = function(){
            ReactDOM.render(<Popup marker={marker.properties}/>, document.getElementById('popup'));
          };

          // add to map
          markers[marker.properties.name] = new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .addTo(map);

        });
      });
    });
  }

}

let Button = (props) =>
  <button className={ props.class } onClick={ props.updateVisibleVenues } >
    { props.children }
  </button>

const Image = (props) =>
  <img className={ props.class } role="presentation" />

let Popup = function(props){
  const rating = props.marker.rating * 20;
  const ratingClass = rating >= 80 ? 'great' : (rating < 60 ? 'notsogood' : 'good');
  return (
    <div className="popup-contents">
      <div className="image">
        <img src="http://now-here-this.timeout.com/wp-content/uploads/2014/09/dog-eating-dinner.jpg" role="presentation"/>
      </div>
      <div className="description">
        <p className="title">{ props.marker.name }</p>
        <p className="address">{ props.marker.location.address1 }</p>
        <div className="rating">
          <img className={ ratingClass } alt="http://emojipedia-us.s3.amazonaws.com/cache/6b/16/6b164a624288271a884ab2a22f9bb693.png" />
          <p className="percentage">{ rating } </p>
          <p className="dog-friendly">% dog friendly</p>
        </div>
      </div>
      <div className="icon">
        <div className={`pop-${props.marker.venue}`}></div>
      </div>
    </div>
  )
};

// {`mkr-${props.marker.venue}`}

// let Marker = (props) => {
//   return(
//     <div id="popups">
//       <h1>{ props.spot.name }</h1>
//       <p>{ props.spot.location.address1 }</p>
//       <p>Rating: { props.spot.rating }/5</p>
//     </div>
//   )

// }

    // <img src="./assets/icon_mkr_restaurant.png" role="presentation" />

export default App
