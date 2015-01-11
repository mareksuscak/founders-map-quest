'use strict';

var React = require('react');

// These do bind automatically
require('mapbox.js');
require('leaflet.markercluster');

var MapPane = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  componentDidMount: function() {
    this.bindMap();
    this.showFounders(this.props.data);
  },

  componentWillUnmount: function() {
    this.unbindMap();
  },

  componentWillReceiveProps: function(nextProps) {
    this.clearFounders();
    this.showFounders(nextProps.data);
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
    zoomControl.addTo(map);

    this._map = map;
  },

  unbindMap: function() {
    this._map.remove();
  },

  clearFounders: function() {
    this._map.removeLayer(this._markers);
    this._markers = null;
    this._markersIndex = null;
  },

  showFounders: function(founders) {
    var markers = new L.MarkerClusterGroup({ animateAddingMarkers: true });
    var markersIndex = [];

    founders.forEach(function(founder) {
      var marker = L.marker(new L.LatLng(founder.latitude, founder.longitude), {
          icon: L.mapbox.marker.icon({'marker-symbol': 'rocket', 'marker-color': '3498DB'}),
          title: founder.companyName
      });

      // index it so we can focus the node later
      markersIndex[founder.id] = marker;

      marker.bindPopup(founder.companyName);
      markers.addLayer(marker);
    });

    // bring marker to the center on click
    markers.on('click', function(e) {
      this._map.panTo(e.layer.getLatLng());
    }.bind(this));

    this._markers = markers;
    this._markersIndex = markersIndex;
    this._map.addLayer(markers);
  },

  focusFounderMarker: function(id) {
    var markerLayer = this._markersIndex[id];
    var matchingFounders = this.props.data.filter(function(founder) { return founder.id === id; });

    if(!markerLayer || matchingFounders.length === 0) {
      return;
    }

    var founder = matchingFounders[0];

    this._map.panTo([founder.latitude, founder.longitude]);
    this._markers.zoomToShowLayer(markerLayer, function() {
      markerLayer.openPopup();
    });
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
