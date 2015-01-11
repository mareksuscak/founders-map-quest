'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    Item = require('./Item.jsx'); // jshint ignore:line

var ItemList = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired
  },

  render: function() {
    /*jshint ignore:start */
    var items = this.props.data.map(function(item) {
      return (
        <Item key={item.id} data={item}/>
      );
    });

    var containerClasses = cx({
      'filtered-list': true,
      'screen': true,
      'pad2x': true,
      'active': this.props.isVisible
    });

    return (
      <div className={containerClasses}>
        {items}
      </div>
    );
    /*jshint ignore:end */
  }
});

module.exports = ItemList;
