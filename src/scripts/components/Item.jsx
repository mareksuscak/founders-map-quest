'use strict';

var React = require('react');

var Item = React.createClass({
  /*jshint ignore:start */
  render: function() {
    return (
      <div className="item">
        <h3>
          <a href="#">Label</a>
        </h3>

        <ul>
          <li><strong>Property: </strong>Value</li>
        </ul>

        <img src="http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg" />
      </div>
    );
    /*jshint ignore:end */
  }
});

module.exports = Item;
