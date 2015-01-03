'use strict';

var React = require('react');

var Header = React.createClass({

  handleRegisterClick: function(event) {
    event.preventDefault();
  },

  handleHeaderClick: function(event) {
    event.preventDefault();
  },

  render: function() {
    return (
      /*jshint ignore:start */
      <header className="header">
        <h1>
          <a href="#" onClick={this.handleHeaderClick}>
            Founder<strong>Map</strong>
          </a>
        </h1>
        <a href="#" className="btn register-btn" title="Register Founders"
          onClick={this.handleRegisterClick}>
          <i className="fa fa-plus fa-fw"></i>
        </a>
      </header>
      /*jshint ignore:end */
    );
  }
});

module.exports = Header;
