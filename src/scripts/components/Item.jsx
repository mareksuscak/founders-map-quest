'use strict';

var React = require('react');

var Item = React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  render: function() {
    /*jshint ignore:start */
    return (
      <div className="item clearfix">
        <h3 className="col12">
          <a href="#">{this.props.data.companyName}</a>
        </h3>

        <div className="col8">
          <small>{this.props.data.founders}, <a href={this.props.data.homepage} target="_blank"><i className="fa fa-home"/></a></small>

          <p>
            <strong>Address:</strong><br/>
            {this.props.data.street}<br/>
            {this.props.data.city}, {this.props.data.postalCode}<br/>
            {this.props.data.country}
          </p>
        </div>

        <a href={this.props.data.photo} target="_blank">
          <img className="col4" src={this.props.data.photo} />
        </a>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = Item;
