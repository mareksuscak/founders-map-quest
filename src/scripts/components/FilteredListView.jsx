'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    Filter = require('./Filter.jsx'), // jshint ignore:line
    ItemList = require('./ItemList.jsx'); // jshint ignore:line

var FilteredListView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func.isRequired,
    onShowOnMapToggle: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      activeScreen: 'list',
      filter: {
        searchTerm: '',
        sortBy: 'id',
        sortOrder: 'desc'
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

  getSortFunc: function() {
    var lower = this.state.filter.sortOrder === 'asc' ? -1 : 1;
    var greater = this.state.filter.sortOrder === 'desc' ? -1 : 1;

    return function(a,b) {
      if (a[this.state.filter.sortBy] < b[this.state.filter.sortBy]) {
        return lower;
      }

      if (a[this.state.filter.sortBy] > b[this.state.filter.sortBy]) {
        return greater;
      }
      // a must be equal to b
      return 0;
    }.bind(this);
  },

  getFilterFunc: function() {
    var searchByProps = ['id', 'companyName', 'founders', 'city', 'country', 'postalCode', 'street'];
    var searchTerm = this.state.filter.searchTerm.toString().toLowerCase();

    return function(itm) {
      var result = false;

      searchByProps.forEach(function(prop) {
        result = result || itm[prop].toString().toLowerCase().indexOf(searchTerm) >= 0;
      });

      return result;
    };
  },

  getFilteredFounders: function() {
    var result = this.props.data;

    if(this.state.filter.searchTerm && this.state.filter.searchTerm.trim() !== '') {
      result = result.filter(this.getFilterFunc());
    }

    if(this.state.filter.sortBy) {
      result = result.sort(this.getSortFunc());
    }

    return result;
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

    var filteredData = this.getFilteredFounders();

    return (
      <div className={containerClasses}>
        <div className={filterStateClasses}>
          <small className="fl">Matched <em>{filteredData.length}</em> item(s)</small>

          <a href="#" title="Configure filter" className="fr" onClick={this.onConfigureFilterClick}>
            <i className="fa fa-cog"/>
          </a>
        </div>

        <Filter defaultConfig={this.state.filter} isVisible={this.state.activeScreen === 'filter'} onChange={this.onFilterChange}/>
        <ItemList isVisible={this.state.activeScreen === 'list'} data={filteredData} onItemClick={this.props.onItemClick} onShowOnMapToggle={this.props.onShowOnMapToggle}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = FilteredListView;
