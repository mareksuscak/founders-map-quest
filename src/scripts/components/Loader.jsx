'use strict';

var React = require('react');

var Loader = React.createClass({

  render: function() {
    return (
      /*jshint ignore:start */
      <div className="loader">
        <img src="images/loader.gif" />
      </div>
      /*jshint ignore:end */
    );
  }

});

module.exports = Loader;
