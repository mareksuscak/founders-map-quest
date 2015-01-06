'use strict';

var React = require('react'),
    CsvUploadForm = require('./CsvUploadForm.jsx'), // jshint ignore:line
    FieldMappingForm = require('./FieldMappingForm.jsx'); // jshint ignore:line

var RegistrationView = React.createClass({
  render: function() {
    /*jshint ignore:start */
    return (
      <div className="registration-view">
        <CsvUploadForm/>
        <FieldMappingForm/>
      </div>
    );
    /*jshint ignore:end */
  }
});

module.exports = RegistrationView;
