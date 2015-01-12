'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    CsvUploadForm = require('./CsvUploadForm.jsx'), // jshint ignore:line
    FieldMappingForm = require('./FieldMappingForm.jsx'); // jshint ignore:line

var RegistrationView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      activeForm: 'upload',
      
    };
  },

  handleUploadNextStep: function() {
    this.setState({ activeForm: 'mapping' });
  },

  handleFinish: function() {
    this.setState({ activeForm: 'upload' });
  },

  handleCancel: function() {
    this.setState({ activeForm: 'upload' });
  },

  render: function() {
    /*jshint ignore:start */
    var classes = cx({
      'registration-view': true,
      'view': true,
      'z10': true,
      'round-bottom': true,
      'pad2': true,
      'active': this.props.isVisible
    });

    return (
      <div className={classes}>
        <CsvUploadForm isVisible={this.state.activeForm === 'upload'} onNextStep={this.handleUploadNextStep}/>
        <FieldMappingForm isVisible={this.state.activeForm === 'mapping'} onFinish={this.handleFinish} onCancel={this.handleCancel}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = RegistrationView;
