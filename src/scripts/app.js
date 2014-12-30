'use strict';

var React = require('react');
var App = require('./components/App'); // jshint ignore:line
window.React = React; // export for http://fb.me/react-devtools

React.render(
  /*jshint ignore:start */
  <App />,
  document.getElementById('container')
  /*jshint ignore:end */
);
