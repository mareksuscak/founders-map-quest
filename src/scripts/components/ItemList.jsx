'use strict';

var React = require('react'),
    cx = require('react/lib/cx'),
    Item = require('./Item.jsx');

var ItemList = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired
  },

  render: function() {
    /*jshint ignore:start */
    var items = (
      <Item/>
    );

    var containerClasses = cx({
      'filtered-list': true,
      'screen': true,
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
