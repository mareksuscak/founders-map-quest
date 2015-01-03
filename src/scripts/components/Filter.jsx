'use strict';

var React = require('react'),
    objectAssign = require('object-assign');

var Filter = React.createClass({

  getInitialState: function() {
    return {
      sortBy: null,
      sortOrder: 'asc',
      filterBy: null,
      searchTerm: null
    };
  },

  handleSearchTermChange: function(event) {
    var newState = objectAssign(this.state, {
      searchTerm: event.target.value
    });

    this.setState(newState);
  },

  handleKeyDown: function(event) {
    if(event.keyCode === 13 || event.keyCode === 10) {
      event.preventDefault();
    }
  },

  handleSearchClick: function(event) {
    event.preventDefault();
  },

  handleSortOrderClick: function(event) {
    var newState = objectAssign(this.state, {
      sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
    });

    this.setState(newState);
    event.preventDefault();
  },

  render: function() {
    return (
      /*jshint ignore:start */
      <div className="filter">
        <div className="filter-col">
          <select className="sort-by">
            <option>Sort by...</option>
          </select>

          { this.state.sortOrder == 'asc' &&
          <a href="#" className="sort-order" onClick={this.handleSortOrderClick}><i className="fa fa-sort-alpha-asc fa-fw"></i></a>}

          { this.state.sortOrder == 'desc' &&
          <a href="#" className="sort-order" onClick={this.handleSortOrderClick}><i className="fa fa-sort-alpha-desc fa-fw"></i></a>}
        </div>

        <div className="filter-col">
          <select className="filter-by">
            <option>Filter by...</option>
          </select>
        </div>

        <div className="filter-col">
          <input type="text" className="search-term" placeholder="Search term..." value={this.state.searchTerm}
            onChange={this.handleSearchTermChange} onKeyDown={this.handleKeyDown} />
          <a href="#" className="search-btn" onClick={this.handleSearchClick}>
            <i className="fa fa-search fa-fw"></i>
          </a>
        </div>
      </div>
      /*jshint ignore:end */
    );
  }

});

module.exports = Filter;
