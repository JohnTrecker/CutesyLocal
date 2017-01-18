import React from 'react';
import ReactDOM from 'react-dom';
import Popup from '../Popup';
import '../assets/index.css';

exports.renderMarkers = (map, venue) => {
    fetch( `http://localhost:3000/api/venues/${venue}` )
      .then( response => response.json() )
      .then( (venueData) => {

        map.on('load', function() {
          let source = `${venue}Data`;
          map.addSource(source, {
            type: "geojson",
            data: venueData,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
          });

          map.addLayer({
            "id": "unclustered-points-" + venue,
            "type": "symbol",
            "source": source,
            "filter": ["!has", "point_count"],
            "layout": {
                "icon-image": "icon_mkr_" + venue,
                "visibility": "visible"
            }
          });

          let palette = {
            'restaurant': '#2ab7ca',
            'park': '#7ed321',
            'event': '#d0021b'
          };

          map.addLayer({
            "id": "cluster-" + venue,
            "type": "circle",
            "source": source,
            "paint": {
              "circle-color": palette[venue],
              "circle-radius": 18
            },
            "filter": ["has", "point_count"],
          });

          map.addLayer({
            "id": "cluster-count-" + venue,
            "type": "symbol",
            "source": source,
            "layout": {
              "visibility": "visible",
              "text-field": "{point_count}",
              "text-font": [
                "DIN Offc Pro Medium",
                "Arial Unicode MS Bold"
              ],
              "text-size": 12
            }
          });

          // for each coorespnding button in nav bar
          //   add onclick behavior to toggle layer visibility
          let button = document.getElementsByClassName(venue)[0];
          let markerLayers = [`unclustered-points-${venue}`, `cluster-${venue}`, `cluster-count-${venue}`];

          button.onclick = function(e) {
            markerLayers.forEach(function(markerLayer){
              let visibility = map.getLayoutProperty(markerLayer, 'visibility');
              if (visibility === 'visible') {
                map.setLayoutProperty(markerLayer, 'visibility', 'none');
              } else {
                map.setLayoutProperty(markerLayer, 'visibility', 'visible');
              }
            });
          };
        });

        map.on('click', function (e) {
          let features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-points-restaurant', 'unclustered-points-park', 'unclustered-points-event'] });
          if (features.length) {
            let marker = features[0];
            ReactDOM.render(<Popup marker={marker.properties} />, document.getElementById('popup'));
          };
        });

      })
      .catch( function(e) {
        console.log(`error fetching ${venue} data:\n`, e);
      })
}