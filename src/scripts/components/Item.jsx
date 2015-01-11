'use strict';

var React = require('react');

var Item = React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  handleHideClick: function(e) {
    e.preventDefault();
  },

  handleUnhideClick: function(e) {
    e.preventDefault();
  },

  handleLabelClick: function(e) {
    e.preventDefault();
  },

  render: function() {
    /*jshint ignore:start */
    return (
      <div className="item clearfix">
        <h3 className="col12">
          <a href="#" onClick={this.handleLabelClick}>{this.props.data.companyName}</a>,&nbsp;
          <small>
            <a href="#" onClick={this.handleUnhideClick}><i className="fa fa-eye"/></a>
            <a href="#" className="active" onClick={this.handleHideClick}><i className="fa fa-eye-slash"/></a>
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
