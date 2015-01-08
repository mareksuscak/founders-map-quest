'use strict';

var React = require('react'),
    ReactSelect = require('react-select');

var FieldMappingForm = React.createClass({

  handleFinishClick: function() {

  },

  render: function() {
    return (
      /*jshint ignore:start */
      <div className="mapping-form pad2">
        <div className="clearfix">
          <button className="col12" onClick={this.handleFinishClick}>Finish</button>
        </div>
      </div>
      /*jshint ignore:end */
    );
  }

});

module.exports = FieldMappingForm;
