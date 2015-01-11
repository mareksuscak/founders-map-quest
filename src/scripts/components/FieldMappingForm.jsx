'use strict';

var React = require('react'),
    cx = require('react/lib/cx'), // jshint ignore:line
    ReactSelect = require('react-select'); // jshint ignore:line

var FieldMappingForm = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    onNextStep: React.PropTypes.func.isRequired
  },

  handleFinishClick: function() {
    this.props.onNextStep();
  },

  render: function() {
    /*jshint ignore:start */
    var containerClasses = cx({
      'screen': true,
      'mapping-form': true,
      'active': this.props.isVisible
    });

    return (
      <div className={containerClasses}>
        <div className="clearfix">
          <button className="col12" onClick={this.handleFinishClick}>Finish</button>
        </div>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = FieldMappingForm;
