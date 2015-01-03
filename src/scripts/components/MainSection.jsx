'use strict';

var React = require('react'),
    Header = require('./Header.jsx'), // jshint ignore:line
    Filter = require('./Filter.jsx'), // jshint ignore:line
    Loader = require('./Loader.jsx'); //jshint ignore:line

var MainSection = React.createClass({

  render: function() {
    return (
      /*jshint ignore:start */
      <main className="main">
        <Header/>
        <div className="info">
          <Filter/>
        </div>

        <div className="content">

        </div>
      </main>
      /*jshint ignore:end */
    );
  }

});

module.exports = MainSection;
