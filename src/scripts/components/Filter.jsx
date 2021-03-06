'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    ReactSelect = require('react-select'); // jshint ignore:line

var Filter = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    defaultConfig: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  componentWillMount: function() {
    this.defaultConfig = this.props.defaultConfig;
    this.setState(this.props.defaultConfig);
  },

  handleSearchTermChange: function(e) {
    this.setState({ searchTerm: e.target.value });
  },

  handleKeyDown: function(e) {
    if(e.keyCode === 13) {
      this.handleApplyFilter();
    }
  },

  handleSortByChange: function(e, values) {
    var sortBy = values.length > 0 ? values[0].value : this.props.defaultConfig.sortBy;
    this.setState({ sortBy: sortBy });
  },

  handleToggleSortOrder: function(e) {
    e.preventDefault();
    this.setState({
      sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
    });
  },

  handleApplyFilter: function() {
    this.props.onChange(this.state);
  },

  handleResetFilter: function(e) {
    e.preventDefault();
    this.setState(this.defaultConfig);
    this.props.onChange(this.defaultConfig);
  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'filter': true,
      'screen': true,
      'pad2': true,
      'active': this.props.isVisible
    });

    var sortByOptions = [
      { value: 'id', label: 'Date Added' },
      { value: 'companyName', label: 'Company Name' },
      { value: 'founders', label: 'Founders' },
      { value: 'city', label: 'City' },
      { value: 'country', label: 'Country' },
      { value: 'postalCode', label: 'Postal Code' },
      { value: 'street', label: 'Street' }
    ];

    return (
      <div className={containerClasses}>
        <div className="space-bottom1 clearfix">
          <input type="text" className="search-term col12" value={this.state.searchTerm} onChange={this.handleSearchTermChange} onKeyDown={this.handleKeyDown} placeholder="Search keyword..."/>
        </div>
        <div className="space-bottom1 contain clearfix">
          <ReactSelect className="sort-by col11" options={sortByOptions} value={this.state.sortBy} onChange={this.handleSortByChange} placeholder="Sort by..."/>
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
