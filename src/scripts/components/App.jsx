'use strict';

var React = require('react'),
    MapPane = require('./MapPane.jsx'), // jshint ignore:line
    NavBar = require('./NavBar.jsx'), // jshint ignore:line
    SearchView = require('./SearchView.jsx'), // jshint ignore:line
    RegistrationView = require('./RegistrationView.jsx'), // jshint ignore:line
    Loader = require('./Loader.jsx'); // jshint ignore:line

var App = React.createClass({

  getInitialState: function() {
    return {
      isLoading: false
    };
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
      /*jshint ignore:start */
      <div className="app">
        <MapPane/>
        <NavBar/>
        <SearchView/>
        <RegistrationView/>
        <Loader active={this.state.isLoading}/>
      </div>
      /*jshint ignore:end */
    );
  }

});

module.exports = App;
