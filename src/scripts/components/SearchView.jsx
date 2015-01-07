'use strict';

var React = require('react'),
    cx = require('react/lib/cx'),
    SortableFounderList = require('./SortableFounderList.jsx'); // jshint ignore:line

var SearchView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    allFounders: React.PropTypes.array.isRequired
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
      'z10': true,
      'round-bottom': true,
      //'animate': true,
      'active': this.props.isVisible
    });

    return (
      <div className={classes}>
          <SortableFounderList allFounders={this.props.allFounders}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = SearchView;
