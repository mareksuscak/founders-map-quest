'use strict';

var React = require('react');
var App = require('./components/App.jsx'); // jshint ignore:line
window.React = React; // export for http://fb.me/react-devtools

React.render(
  /*jshint ignore:start */
  <App />,
  document.getElementById('react-container')
  /*jshint ignore:end */
);
