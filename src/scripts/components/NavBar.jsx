'use strict';

var React = require('react');

var NavBar = React.createClass({
  render: function() {
    return (
      /*jshint ignore:start */
      <div className="navbar dark fill-darken2 z10">
        <input type="text" className="search-box unborder" />
        <button className="register-button small strong unround"><i className="fa fa-plus fa-fw"/></button>
      </div>
      /*jshint ignore:end */
    );
  }
});

module.exports = NavBar;
