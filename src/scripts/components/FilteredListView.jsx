'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    Filter = require('./Filter.jsx'), // jshint ignore:line
    ItemList = require('./ItemList.jsx'); // jshint ignore:line

var FilteredListView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      activeScreen: 'list',
      filter: {

      }
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
      activeScreen: 'list',
      filter: newFilter
    });
  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'filtered-list-view': true,
      'view': true,
      'z10': true,
      'round-bottom': true,
      'active': this.props.isVisible
    });

    var filterStateClasses = cx({
      'filter-state': true,
      'clearfix': true,
      'visible': this.state.activeScreen === 'list',
      'pad2': true
    });

    // TODO: apply filter function
    var filteredData = this.props.data;

    return (
      <div className={containerClasses}>
        <div className={filterStateClasses}>
          <small className="fl">Matched <em>{filteredData.length}</em> item(s)</small>

          <a href="#" title="Configure filter" className="fr" onClick={this.onConfigureFilterClick}>
            <i className="fa fa-cog"/>
          </a>
        </div>

        <Filter ref="filter" isVisible={this.state.activeScreen === 'filter'} onChange={this.onFilterChange}/>
        <ItemList isVisible={this.state.activeScreen === 'list'} data={filteredData}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = FilteredListView;
