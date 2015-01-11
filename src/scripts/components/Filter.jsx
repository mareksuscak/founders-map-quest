'use strict';

var React = require('react'),
    cx = require('react/lib/cx'),
    ReactSelect = require('react-select');

var Filter = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

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

  handleApplyFilter: function(e) {
    this.props.onChange(this.state);
  },

  handleResetFilter: function(e) {
    e.preventDefault();
    var newState = this.getInitialState();
    this.setState(newState);
    this.props.onChange(newState);
  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'filter': true,
      'screen': true,
      'active': this.props.isVisible
    });

    return (
      <div className={containerClasses}>
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
        <div className="space-bottom0 clearfix">
          <button className="col12" onClick={this.handleApplyFilter}>Apply filter</button>
        </div>
        <div>
          <small>or <a href="#" onClick={this.handleResetFilter}>Reset the filter configuration</a></small>
        </div>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = Filter;
