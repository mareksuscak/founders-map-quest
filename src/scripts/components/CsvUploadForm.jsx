'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    ReactSelect = require('react-select'); // jshint ignore:line

var DEFAULT_SEPARATOR = 'comma';

var CsvUploadForm = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    onNextStep: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      rawCsvData: '',
      separator: DEFAULT_SEPARATOR,
      errors: []
    };
  },

  resolveSeparator: function() {
    if('semicolon' === this.state.separator) {
      return ';';
    }

    if('tab' === this.state.separator) {
      return '\t';
    }

    return ',';
  },

  parseCsvField: function(field) {
    return field.trim();
  },

  parseCsvRow: function(separator) {
    return function(row) {
      return row
        .split(separator) // split to fields
        .map(this.parseCsvField); // and map them to trim each field
    }.bind(this);
  },

  parseRawCsv: function() {
    var separator = this.resolveSeparator();
    var result = this.state.rawCsvData
      .split('\n') // split to rows
      .map(this.parseCsvRow(separator)); // and map each row to array of columns

    return {
      colHeaders: [].concat.apply([], result.slice(0,1)), // flatten
      data: result.slice(1)
    };
  },

  handleNextStepClick: function() {
    var csv = this.parseRawCsv();

    if(this.isValid(csv)) {
      this.props.onNextStep(csv);
      this.setState(this.getInitialState());
    }
  },

  handleSeparatorChange: function(e) {
    this.setState({ separator: e.target.value });
  },

  handleRawCsvDataChange: function(e) {
    this.setState({ rawCsvData: e.target.value });
  },

  isValid: function(csv) {
    this.setState({ errors: [] }); // clean errors

    var isValid = true;
    var errors = [];

    // check the number of data rows
    if(csv.data.length === 0) {
      errors.push('Csv has no data rows.');
      isValid = false;
    }

    // compare number of colHeaders and field in each row
    var colsCount = csv.colHeaders.length;
    for(var i=0; i < csv.data.length; i++) {
      if(csv.data[i].length !== colsCount) {
        errors.push('Csv is not valid.');
        isValid = false;
        break;
      }
    }

    this.setState({ errors: errors });

    return isValid;
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
        { this.state.errors.length > 0 &&
        <div className="space-bottom1 alert alert-error">
          <ul>
            {this.state.errors.map(function(error) {
              return <li>{error}</li>;
            })}
          </ul>
        </div>}

        <textarea placeholder="Paste founders CSV here..." className="row4 space-bottom1 col12" value={this.state.rawCsvData} onChange={this.handleRawCsvDataChange} />

        <div className="space-bottom1 clearfix">
          <div className="option col4">
            <input type="radio" name="separator" id="comma" value="comma" onChange={this.handleSeparatorChange} defaultChecked={DEFAULT_SEPARATOR === 'comma'} />
            <label className="inline" htmlFor="comma">Comma</label>
          </div>

          <div className="option col4">
            <input type="radio" name="separator" id="semicolon" value="semicolon" onChange={this.handleSeparatorChange} defaultChecked={DEFAULT_SEPARATOR === 'semicolon'} />
            <label className="inline" htmlFor="semicolon">Semicolon</label>
          </div>

          <div className="option col4">
            <input type="radio" name="separator" id="tab" value="tab" onChange={this.handleSeparatorChange} defaultChecked={DEFAULT_SEPARATOR === 'tab'} />
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
