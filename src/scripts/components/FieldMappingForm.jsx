'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    ReactSelect = require('react-select'); // jshint ignore:line

var FieldMappingForm = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    onFinish: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      fieldMapping: {}
    }
  },

  handleFinishClick: function() {
    // TODO: validate and create founders based on mapping
    this.props.onFinish();
    this.setState(this.getInitialState());
  },

  handleCancelClick: function(e) {
    e.preventDefault();
    this.props.onCancel();
    this.setState(this.getInitialState());
  },

  isValid: function() {
    // TODO validation
    return true;
  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'screen': true,
      'mapping-form': true,
      'active': this.props.isVisible
    });

    var options = this.props.csvFields.map(function(field) {
      return { value: '', label: '' };
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
