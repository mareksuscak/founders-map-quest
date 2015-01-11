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

    // Max height for all views
    this.refreshMaxHeight();
    window.addEventListener('resize', this.refreshMaxHeight);
  },

  componentWillUnmount: function() {
    page.stop();
    window.removeEventListener('resize', this.refreshMaxHeight);
  },

  loadData: function() {
    var data = WebApiUtils.getAllFounders();
    this.setState({ data: data, isLoading: false });
  },

  refreshMaxHeight: function() {
    var maxHeight = document.documentElement.clientHeight - 60; // 10 margin top, 10 margin bottom, 40 navbar
    var views = document.querySelectorAll('.view');

    [].forEach.call(views, function(view) {
      view.style.maxHeight = maxHeight.toString() + 'px'
    });
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
