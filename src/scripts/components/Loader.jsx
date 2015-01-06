'use strict';

var React = require('react'),
    cx = require('react/lib/cx'); // jshint ignore:line

var Loader = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function() {
    return {
      isVisible: false
    };
  },

  render: function() {
    /*jshint ignore:start */
    var classes = cx({
      'animate': true,
      'loader': true,
      'z100': true,
      'active': this.props.isVisible
    });

    return (
      <div className={classes}>
        <div className="spinner"/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = Loader;
