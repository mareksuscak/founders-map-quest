'use strict';

var React = require('react');
var WebApiUtils = require('./utils/WebApiUtils');
var App = require('./components/App.jsx'); // jshint ignore:line
window.React = React; // export for http://fb.me/react-devtools

// Setup sample data
WebApiUtils.initialize();

React.render(
  /*jshint ignore:start */
  <App />,
  document.getElementById('react-container')
  /*jshint ignore:end */
);
