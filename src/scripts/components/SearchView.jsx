'use strict';

var React = require('react'),
    cx = require('react/lib/cx'),
    SortableFounderList = require('./SortableFounderList.jsx'); // jshint ignore:line

var SearchView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      isVisible: false
    };
  },

  render: function() {
    /*jshint ignore:start */
    var classes = cx({
      'search-view': true,
      'view': true,
      'active': this.props.isVisible
    });

    return (
      <div className={classes}>
        <SortableFounderList/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = SearchView;
