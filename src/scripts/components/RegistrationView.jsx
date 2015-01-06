'use strict';

var React = require('react'),
    CsvUploadForm = require('./CsvUploadForm.jsx'),
    FieldMappingForm = require('./FieldMappingForm.jsx');

var RegistrationView = React.createClass({
  render: function() {
    return (
      /*jshint ignore:start */
      <div className="registration-view">
        <CsvUploadForm/>
        <FieldMappingForm/>
      </div>
      /*jshint ignore:end */
    );
  }
});

module.exports = RegistrationView;
