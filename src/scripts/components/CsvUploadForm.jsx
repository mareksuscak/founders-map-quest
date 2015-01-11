'use strict';

var React = require('react'),
    cx = require('react/lib/cx');

var CsvUploadForm = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired
  },

  handleNextStepClick: function() {

  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'screen': true,
      'csv-upload-form': true,
      'active': this.props.isVisible
    });

    return (
      <div className={containerClasses}>
        <div className="space-bottom1 clearfix">
          <textarea placeholder="Paste founders CSV here..." className="row4 col12"/>
        </div>
        <div className="clearfix">
          <button className="col12" onClick={this.handleNextStepClick}>Next step</button>
        </div>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = CsvUploadForm;
