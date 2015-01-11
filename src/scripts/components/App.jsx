'use strict';

var React = require('react'),
    page = require('page'),
    WebApiUtils = require('../utils/WebApiUtils'),
    MapPane = require('./MapPane.jsx'), // jshint ignore:line
    NavBar = require('./NavBar.jsx'), // jshint ignore:line
    FilteredListView = require('./FilteredListView.jsx'), // jshint ignore:line
    RegistrationView = require('./RegistrationView.jsx'), // jshint ignore:line
    Loader = require('./Loader.jsx'); // jshint ignore:line

var App = React.createClass({

  getInitialState: function() {
    return {
      activeView: '',
      isLoading: true,
      data: []
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
    this.setState({ data: data, isLoading: false });
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

  handleLoadStart: function() {
    this.setState({ isLoading: true });
  },

  handleLoadEnd: function() {
    this.setState({ isLoading: false });
  },

  render: function() {
    /*jshint ignore:start */
    return (
      <div className="app">
        <MapPane data={this.state.data}/>
        <NavBar activeView={this.state.activeView}/>
        <FilteredListView isVisible={this.state.activeView === 'search'} data={this.state.data}/>
        <RegistrationView isVisible={this.state.activeView === 'registration'}/>
        <Loader isVisible={this.state.isLoading}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = App;
