'use strict';

var React = require('react'),
    cx = require('react/lib/cx'),
    CsvUploadForm = require('./CsvUploadForm.jsx'), // jshint ignore:line
    FieldMappingForm = require('./FieldMappingForm.jsx'); // jshint ignore:line

var RegistrationView = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool,
    onLoadStart: React.PropTypes.func,
    onLoadEnd: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      isVisible: false
    };
  },

  render: function() {
    /*jshint ignore:start */
    var classes = cx({
      'registration-view': true,
      'view': true,
      'z10': true,
      //'animate': true,
      'active': this.props.isVisible
    });

    return (
      <div className={classes}>
        <CsvUploadForm/>
        <FieldMappingForm/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = RegistrationView;
