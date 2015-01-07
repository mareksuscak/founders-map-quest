'use strict';

var React = require('react'),
    page = require('page'),
    WebApiUtils = require('../utils/WebApiUtils'),
    MapPane = require('./MapPane.jsx'), // jshint ignore:line
    NavBar = require('./NavBar.jsx'), // jshint ignore:line
    SearchView = require('./SearchView.jsx'), // jshint ignore:line
    RegistrationView = require('./RegistrationView.jsx'), // jshint ignore:line
    Loader = require('./Loader.jsx'); // jshint ignore:line

var App = React.createClass({

  getInitialState: function() {
    return {
      activeView: '',
      isLoading: true,
      allFounders: []
    };
  },

  componentDidMount: function() {
    this.registerRoutes();

    page.start({
      // We don't support server-side routes so always add a hashbang
      hashbang: true
    });

    this.loadData();
  },

  componentWillUnmount: function() {
    page.stop();
  },

  loadData: function() {
    var data = WebApiUtils.getAllFounders();
    this.setState({ allFounders: data, isLoading: false });
  },

  registerRoutes: function() {
    var nullRoute = this.viewChangeRoute('');
    var searchRoute = this.viewChangeRoute('search');
    var registrationRoute = this.viewChangeRoute('registration');

    page('/', nullRoute);
    page('/search', searchRoute);
    page('/registration', registrationRoute);
    page('*', nullRoute);
  },

  viewChangeRoute: function(view, cb) {
    return function(context) {
      this.setState({
        activeView: view
      });

      if(cb) {
        cb(context);
      }
    }.bind(this);
  },

  render: function() {
    /*jshint ignore:start */
    return (
      <div className="app">
        <MapPane allFounders={this.state.allFounders}/>
        <NavBar activeView={this.state.activeView}/>
        <SearchView isVisible={this.state.activeView === 'search'} allFounders={this.state.allFounders}/>
        <RegistrationView isVisible={this.state.activeView === 'registration'}/>
        <Loader isVisible={this.state.isLoading}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = App;
