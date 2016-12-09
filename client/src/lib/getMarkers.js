exports.getMarkers = function(data){
  // Iterate through json data
  let markers = {};
  data.forEach(function(marker) {
      // create an img element for the marker
      let el = document.createElement('div');
      let iconName = {
          restaurants: 'coffee',
          dog_parks: 'park',
          events: 'event'
      };
        let img_url = ["./assets/icon_", iconName[marker.categories.alias], ".png"].join("");
      let coordinates = [].concat(marker.coordinates.longitude, marker.coordinates.latitude);

      el.className = 'marker';
      el.style.backgroundImage = 'url(' + img_url + ')';

      markers[marker.name] = new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .addTo(map);
  });
}