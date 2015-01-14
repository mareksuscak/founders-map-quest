'use strict';

var React = require('react'),
    cx = require('react/lib/cx'); // jshint ignore:line

var Alerts = React.createClass({

  getDefaultProps: function() {
    return {
      data: []
    };
  },

  render: function() {
    /*jshint ignore:start */
    return (
      <div className={this.props.className}>
        <ul>
          {this.props.data.map(function(row) {
            return <li>{row}</li>;
          })}
        </ul>
      </div>
    );
    /*jshint ignore:end */
  }
});

module.exports = Alerts;
