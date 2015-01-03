'use strict';

var React = require('react'),
    MainSection = require('./MainSection.jsx'), // jshint ignore:line
    MapSection = require('./MapSection.jsx'); // jshint ignore:line

var App = React.createClass({

  render: function() {

    return (
      /*jshint ignore:start */
      <div className="founder-map-app">
        <MainSection/>
        <MapSection/>
      </div>
      /*jshint ignore:end */
    );
  }
});

module.exports = App;
