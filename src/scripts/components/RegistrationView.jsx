'use strict';

var React = require('react'),
    assign = require('object-assign'),
    Alerts = require('./Alerts.jsx'), // jshint ignore:line
    cx = require('react/lib/cx'), // jshint ignore:line
    CsvUploadForm = require('./CsvUploadForm.jsx'), // jshint ignore:line
    FieldMappingForm = require('./FieldMappingForm.jsx'); // jshint ignore:line

var RegistrationView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    onRegistrationFinished: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      activeForm: 'upload',
      csv: {
        colHeaders: [],
        data: []
      },
      successMessages: []
    };
  },

  handleUploadNextStep: function(csv) {
    this.setState({ activeForm: 'mapping', csv: csv });
  },

  handleFinish: function(founders) {
    var nextState = assign(this.getInitialState(), { successMessages: ['Founders have been published.'] });
    this.setState(nextState);
    this.props.onRegistrationFinished();

    // set timeout that will clear the message after 5 seconds
    setTimeout(function() {
      this.setState({ successMessages: [] });
    }.bind(this), 5000);
  },

  handleCancel: function() {
    this.setState(this.getInitialState());
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
        {this.state.successMessages.length > 0 &&
        <Alerts className="space-bottom1 alert alert-success" data={this.state.successMessages}/>}

        <CsvUploadForm isVisible={this.state.activeForm === 'upload'} onNextStep={this.handleUploadNextStep}/>
        <FieldMappingForm csv={this.state.csv} isVisible={this.state.activeForm === 'mapping'} onFinish={this.handleFinish} onCancel={this.handleCancel}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = RegistrationView;
