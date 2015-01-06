'use strict';

var React = require('react'),
    SortableFounderList = require('./SortableFounderList.jsx');

var SearchView = React.createClass({
  render: function() {
    return (
      /*jshint ignore:start */
      <div className="search-view">
        <SortableFounderList/>
      </div>
      /*jshint ignore:end */
    );
  }
});

module.exports = SearchView;
