'use strict';

var React = require('react'),
    FounderStore = require('../stores/FounderStore'),
    L = require('leaflet');

// marker cluster does not provide any exports
require('leaflet.markercluster');

function getStateFromStores() {
  return {
    founders: FounderStore.getAll(),
    current: FounderStore.getCurrent()
  };
}

var MapSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    FounderStore.addChangeListener(this._onChange);

    this._map = L.map('leaflet-map-container').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'examples.map-i875mjb7'
    }).addTo(this._map);
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
    this.setState(getStateFromStores());
  }

});

module.exports = MapSection;
