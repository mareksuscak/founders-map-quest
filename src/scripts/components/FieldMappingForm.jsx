'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    ReactSelect = require('react-select'); // jshint ignore:line

var FieldMappingForm = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    onNextStep: React.PropTypes.func.isRequired
  },

  handleFinishClick: function() {
    this.props.onNextStep();
  },

  handleCancelClick: function(e) {
    e.preventDefault();
  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'screen': true,
      'mapping-form': true,
      'active': this.props.isVisible
    });

    return (
      <div className={containerClasses}>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Company Name column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Latitude column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Longitude column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Founders column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Photo column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Homepage column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Street column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select City column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Postal Code column..."/>
        <ReactSelect className="space-bottom0 col12" placeholder="Select Country column..."/>

        <div className="clearfix">
          <button className="col12" onClick={this.handleFinishClick}>Finish</button>
        </div>

        <div>
          <small>or <a href="#" onClick={this.handleCancelClick}>Cancel</a></small>
        </div>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = FieldMappingForm;
