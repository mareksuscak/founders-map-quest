'use strict';

var React = require('react'),
    ReactSelect = require('react-select');

var SortableFounderList = React.createClass({

  getInitialState: function() {
    return {
      searchTerm: '',
      sortBy: '',
      sortOrder: 'asc'
    };
  },

  handleSearchTermChange: function(e) {
    this.setState({ searchTerm: e.target.value });
  },

  handleToggleSortOrder: function(e) {
    e.preventDefault();
    this.setState({
      sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
    });
  },

  handleSearchRun: function(e) {

  },

  render: function() {
    return (
      /*jshint ignore:start */
      <div className="sortable-list pad2">
        <div className="space-bottom1 clearfix">
          <input type="text" className="search-term col12" value={this.state.searchTerm} onChange={this.handleSearchTermChange} placeholder="Search keyword..."/>
        </div>
        <div className="space-bottom1 contain clearfix">
          <ReactSelect className="sort-by col11" placeholder="Sort by..."/>
          <a href="#" className="sort-order row1 col1" onClick={this.handleToggleSortOrder}>
            { this.state.sortOrder === 'asc' &&
            <i className="fa fa-sort-alpha-asc fa-fw"/>}

            { this.state.sortOrder === 'desc' &&
            <i className="fa fa-sort-alpha-desc fa-fw"/>}
          </a>
        </div>
        <div className="clearfix">
          <button className="col12" onClick={this.handleSearchRun}>Search</button>
        </div>
      </div>
      /*jshint ignore:end */
    );
  }
});

module.exports = SortableFounderList;
