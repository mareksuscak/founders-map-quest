'use strict';

var React = require('react'),
    assign = require('object-assign'),
    WebApiUtils = require('../utils/WebApiUtils'),
    cx = require('react/lib/cx'), // jshint ignore:line
    Alerts = require('./Alerts.jsx'), // jshint ignore:line
    ReactSelect = require('react-select'); // jshint ignore:line

var FieldMappingForm = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    onFinish: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    csv: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      fieldMapping: {
        companyName: null,
        founders: null,
        city: null,
        country: null,
        postalCode: null,
        street: null,
        photo: null,
        homepage: null,
        latitude: null,
        longitude: null
      },
      errors: []
    }
  },

  createFounderFromRow: function(row) {
    return {
      companyName: row[this.state.fieldMapping.companyName],
      founders: row[this.state.fieldMapping.founders],
      city: row[this.state.fieldMapping.city],
      country: row[this.state.fieldMapping.country],
      postalCode: row[this.state.fieldMapping.postalCode],
      street: row[this.state.fieldMapping.street],
      photo: row[this.state.fieldMapping.photo],
      homepage: row[this.state.fieldMapping.homepage],
      latitude: row[this.state.fieldMapping.latitude],
      longitude: row[this.state.fieldMapping.longitude]
    }
  },

  extractFounderObjects: function() {
    return this.props.csv.data.map(this.createFounderFromRow);
  },

  handleFinishClick: function() {
    if(this.isValid()) {
      var founders = this.extractFounderObjects();
      WebApiUtils.publishFounders(founders);
      this.props.onFinish();
      this.setState(this.getInitialState());
    }
  },

  handleCancelClick: function(e) {
    e.preventDefault();
    this.props.onCancel();
    this.setState(this.getInitialState());
  },

  handleFieldMappingChange: function(field) {
    return function(e, values) {
      if(values.length === 0) {
        return;
      }

      var newFieldMapping = {};
      newFieldMapping[field] = values[0].value;
      var fieldMapping = assign(this.state.fieldMapping, newFieldMapping);

      this.setState({ fieldMapping: fieldMapping });
    }.bind(this);
  },

  isValid: function() {
    // ensure all fields do have mapping
    for(var propertyName in this.state.fieldMapping) {
      if(this.state.fieldMapping[propertyName] === null) {
        this.setState({ errors: ['You must configure mapping of all fields.'] });
        return false;
      }
    }
    return true;
  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'screen': true,
      'mapping-form': true,
      'active': this.props.isVisible
    });

    var options = this.props.csv.colHeaders.map(function(field, idx) {
      return { value: idx.toString(), label: field };
    });

    return (
      <div className={containerClasses}>
        {this.state.errors.length > 0 &&
        <Alerts className="space-bottom1 alert alert-error" data={this.state.errors} />}

        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.companyName} onChange={this.handleFieldMappingChange('companyName')} placeholder="Select Company Name column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.latitude} onChange={this.handleFieldMappingChange('latitude')} placeholder="Select Latitude column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.longitude} onChange={this.handleFieldMappingChange('longitude')} placeholder="Select Longitude column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.founders} onChange={this.handleFieldMappingChange('founders')} placeholder="Select Founders column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.photo} onChange={this.handleFieldMappingChange('photo')} placeholder="Select Photo column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.homepage} onChange={this.handleFieldMappingChange('homepage')} placeholder="Select Homepage column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.street} onChange={this.handleFieldMappingChange('street')} placeholder="Select Street column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.city} onChange={this.handleFieldMappingChange('city')} placeholder="Select City column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.postalCode} onChange={this.handleFieldMappingChange('postalCode')} placeholder="Select Postal Code column..."/>
        <ReactSelect className="space-bottom0 col12" options={options} value={this.state.fieldMapping.country} onChange={this.handleFieldMappingChange('country')} placeholder="Select Country column..."/>

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
