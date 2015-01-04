'use strict';

var React = require('react'),
    ReactSelect = require('react-select'),
    FounderActionCreators = require('../actions/FounderActionCreators'),
    assign = require('object-assign');

var Filter = React.createClass({

  getInitialState: function() {
    return {
      sortBy: 'publishedAt',
      sortOrder: 'desc',
      filterBy: 'any',
      searchTerm: ''
    }
  },

  handleSearchTermChange: function(event) {
    this.setState(assign(this.state, {
      searchTerm: event.target.value
    }));
  },

  handleKeyDown: function(event) {
    if(event.keyCode === 13 || event.keyCode === 10) {
      FounderActionCreators.applyFilter(this.state);
      event.preventDefault();
    }
  },

  handleSearchClick: function(event) {
    FounderActionCreators.applyFilter(this.state);
    event.preventDefault();
  },

  handleSortOrderClick: function(event) {
    this.setState(assign(this.state, {
      sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
    }));

    FounderActionCreators.applyFilter(this.state);
    event.preventDefault();
  },

  handleFilterByChange: function(event, selected) {
    this.setState(assign(this.state, {
      filterBy: selected[0]
    }));

    FounderActionCreators.applyFilter(this.state);
  },

  handleSortByChange: function(event, selected) {
    this.setState(assign(this.state, {
      sortBy: selected[0]
    }));

    FounderActionCreators.applyFilter(this.state);
  },

  render: function() {
    var sortOptions = [
      { value: 'createdAt', label: 'Sort by date...' }
    ];

    var filterOptions = [
      { value: 'any', label: 'Filter by any...' }
    ];

    return (
      /*jshint ignore:start */
      <div className="filter">
        <div className="filter-col">
          <ReactSelect
              className="sort-by"
              value="createdAt"
              options={sortOptions}
              onChange={this.handleSortByChange}
          />

          { this.state.sortOrder == 'asc' &&
          <a href="#" className="sort-order" onClick={this.handleSortOrderClick}><i className="fa fa-sort-alpha-asc fa-fw"></i></a>}

          { this.state.sortOrder == 'desc' &&
          <a href="#" className="sort-order" onClick={this.handleSortOrderClick}><i className="fa fa-sort-alpha-desc fa-fw"></i></a>}
        </div>

        <div className="filter-col">
          <ReactSelect
              className="filter-by"
              value="any"
              options={filterOptions}
              onChange={this.handleFilterByChange}
          />
        </div>

        <div className="filter-col">
          <input type="text" className="search-term" placeholder="Search term..." defaultValue={this.state.searchTerm}
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
