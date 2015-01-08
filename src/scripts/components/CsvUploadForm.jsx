'use strict';

var React = require('react');

var CsvUploadForm = React.createClass({

  handleNextStepClick: function() {

  },

  render: function() {
    return (
      /*jshint ignore:start */
      <div className="csv-upload-form pad2">
        <div className="space-bottom1 clearfix">
          <textarea placeholder="Paste founders CSV here..." className="row4 col12"/>
        </div>
        <div className="clearfix">
          <button className="col12" onClick={this.handleNextStepClick}>Next step</button>
        </div>
      </div>
      /*jshint ignore:end */
    );
  }

});

module.exports = CsvUploadForm;
