'use strict';

var React = require('react'),
    FounderStore = require('../stores/FounderStore'),
    L = require('leaflet');

// marker cluster does not provide any exports
require('leaflet.markercluster');

function getStateFromStores() {
  return {
    founders: FounderStore.getAll()
  }
}

function createLeafletMap() {
  var tiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
      attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; ' +
                   'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
      id: 'mareksuscak.klk3k3lc',
      subdomains: 'abcd'
    });

    var latLng = L.latLng(46.498, -0.791);

    return L.map('leaflet-map-container', {center: latLng, zoom: 4, layers: [tiles]});
}

function addClusteredFounderPois(map, founders) {
  var markers = L.markerClusterGroup();

  founders.forEach(function(founder) {
    var marker = L.marker(new L.LatLng(founder.latitude, founder.longitude), { title: founder.label });
    marker.bindPopup(founder.label);
    markers.addLayer(marker);
  });

  map.addLayer(markers);
}

var MapSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    FounderStore.addChangeListener(this._onChange);
    this._map = createLeafletMap();
    addClusteredFounderPois(this._map, this.state.founders);
  },

  componentWillUnmount: function() {
    FounderStore.removeChangeListener(this._onChange);
    this._map.remove();
  },

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      /*jshint ignore:start */
      <section className="map">
        <div id="leaflet-map-container"></div>
      </section>
      /*jshint ignore:end */
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    // The react component itself is stateless
    var state = getStateFromStores();
    // TODO: redraw POIs on the map
  }

});

module.exports = MapSection;
