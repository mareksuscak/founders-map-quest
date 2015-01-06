'use strict';

var React = require('react');

var NavBar = React.createClass({
  render: function() {
    /*jshint ignore:start */
    return (
      <nav className="navbar-wrapper z10 clearfix">
        <div className="navbar-overlay fl dark fill-darken2">
          <a href="#">
            <h1 className="fl">Founders<strong>Map</strong></h1>
          </a>
          <div className="navbar fr">
            <a className="nav-search button small strong unround"><i className="fa fa-search"/></a>
          </div>
        </div>
        <a className="nav-register fr button small strong round-right">Registration</a>
      </nav>
    );
    /*jshint ignore:end */
  }
});

module.exports = NavBar;
