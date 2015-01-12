'use strict';

var React = require('react');

var Item = React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired,
    onShowOnMapToggle: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  handleShowOnMapClick: function(e) {
    e.preventDefault();
    this.props.onShowOnMapToggle(this.props.data.id, !this.props.showOnMap);
  },

  handleLabelClick: function(e) {
    e.preventDefault();
    this.props.onClick(this.props.data.id);
  },

  render: function() {
    /*jshint ignore:start */
    return (
      <div className="item clearfix">
        <h3 className="col12">
          <a href="#" onClick={this.handleLabelClick}>{this.props.data.companyName}</a>,&nbsp;
          <small>
            {this.props.data.showOnMap && 
              <a href="#" title="Hide on map" onClick={this.handleShowOnMapClick}><i className="fa fa-eye"/></a>}
            
            {!this.props.data.showOnMap && 
            <a href="#" className="active" title="Show on map" onClick={this.handleShowOnMapClick}><i className="fa fa-eye-slash"/></a>}
          </small>
        </h3>

        <div className="details col8">
          <small>{this.props.data.founders}, <a href={this.props.data.homepage} title="Visit home page" target="_blank"><i className="fa fa-home"/></a></small>

          <p>
            <strong>Address:</strong><br/>
            {this.props.data.street}<br/>
            {this.props.data.city}, {this.props.data.postalCode}<br/>
            {this.props.data.country}
          </p>
        </div>

        <a href={this.props.data.photo} title="Display image" target="_blank">
          <img className="col4" src={this.props.data.photo} alt="logo" />
        </a>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = Item;
