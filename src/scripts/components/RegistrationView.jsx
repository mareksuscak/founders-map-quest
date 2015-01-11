'use strict';

var React = require('react'),
    cx = require('react/lib/cx'),
    CsvUploadForm = require('./CsvUploadForm.jsx'), // jshint ignore:line
    FieldMappingForm = require('./FieldMappingForm.jsx'); // jshint ignore:line

var RegistrationView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      activeForm: 'upload'
    };
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
        <CsvUploadForm isVisible={this.state.activeForm === 'upload'}/>
        <FieldMappingForm isVisible={this.state.activeForm === 'mapping'}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = RegistrationView;
