'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    ReactSelect = require('react-select'); // jshint ignore:line

var CsvUploadForm = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    onNextStep: React.PropTypes.func.isRequired
  },

  handleNextStepClick: function() {
    this.props.onNextStep();
  },


  handleSeparatorChange: function() {

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
        <textarea placeholder="Paste founders CSV here..." className="row4 space-bottom1 col12"/>

        <div className="space-bottom1 clearfix">
          <div className="option col4">
            <input type="radio" name="separator" id="comma" value="comma" onChange={this.handleSeparatorChange} />
            <label className="inline" htmlFor="comma">Comma</label>
          </div>

          <div className="option col4">
            <input type="radio" name="separator" id="semicolon" value="semicolon" onChange={this.handleSeparatorChange} />
            <label className="inline" htmlFor="semicolon">Semicolon</label>
          </div>

          <div className="option col4">
            <input type="radio" name="separator" id="tab" value="tab" onChange={this.handleSeparatorChange} />
            <label className="inline" htmlFor="tab">Tab</label>
          </div>
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
