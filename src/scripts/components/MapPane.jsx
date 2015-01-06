'use strict';

var React = require('react');

// These do bind automatically
require('mapbox.js');
require('leaflet.markercluster');

var MapPane = React.createClass({

  componentDidMount: function() {
    this.bindMap();
  },

  componentWillUnmount: function() {
    this.unbindMap();
  },

  shouldComponentUpdate: function() {
    return false;
  },

  bindMap: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoibWFyZWtzdXNjYWsiLCJhIjoiTlNDdTB0TSJ9.l8a2Hh2VuDglYJtd0VLDMQ';

    var zoomControl = new L.Control.Zoom({ position: 'bottomleft' });
    var latLng = L.latLng(46.498, -0.791);
    var zoom = 4;

    var map = L.mapbox.map('map', 'mareksuscak.klk3k3lc', {zoomControl: false});
    map.setView(latLng, zoom);
    zoomControl.addTo(map)

    this._map = map;
  },

  unbindMap: function() {
    this._map.remove();
  },

  render: function() {
    return (
      /*jshint ignore:start */
      <div className="map-pane z1" id="map"/>
      /*jshint ignore:end */
    );
  }

});

module.exports = MapPane;
