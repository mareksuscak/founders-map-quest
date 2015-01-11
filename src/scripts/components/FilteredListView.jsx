'use strict';

var React = require('react'),
    cx = require('react/lib/cx'),
    Filter = require('./Filter.jsx'),
    ItemList = require('./ItemList.jsx'); // jshint ignore:line

var FilteredListView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      activeScreen: 'list'
    };
  },

  onConfigureFilterClick: function(e) {
    e.preventDefault();
    this.setState({
      activeScreen: this.state.activeScreen === 'list' ? 'filter' : 'list'
    });
  },

  onFilterChange: function(newFilter) {
    this.setState({
      activeScreen: 'list'
    });
  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'filtered-list-view': true,
      'view': true,
      'z10': true,
      'round-bottom': true,
      'pad2': true,
      'active': this.props.isVisible
    });

    var filterStateClasses = cx({
      "filter-state": true,
      "clearfix": true,
      "visible": this.state.activeScreen === 'list',
      "space-bottom0": true
    });

    return (
      <div className={containerClasses}>
        <div className={filterStateClasses}>
          <small className="fl">Matched <em>126</em> items</small>

          <a href="#" title="Configure filter" className="fr" onClick={this.onConfigureFilterClick}>
            <i className="fa fa-cog"/>
          </a>
        </div>

        <Filter isVisible={this.state.activeScreen === 'filter'} onChange={this.onFilterChange}/>
        <ItemList isVisible={this.state.activeScreen === 'list'} data={this.props.data}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = FilteredListView;
