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
      data: [],
      focusedMarkerId: -1
    };
  },

  componentDidMount: function() {
    this.registerRoutes();
    this.reloadData();

    // Max height for all views
    this.refreshMaxHeight();
    window.addEventListener('resize', this.refreshMaxHeight);

    page.start({
      // We don't support server-side routes so always add a hashbang
      hashbang: true
    });
  },

  componentWillUnmount: function() {
    page.stop();
    window.removeEventListener('resize', this.refreshMaxHeight);
  },

  reloadData: function() {
    var data = WebApiUtils.getAllFounders();
    this.setState({ data: data, isLoading: false });
  },

  refreshMaxHeight: function() {
    var maxHeight = document.documentElement.clientHeight - 60; // 10 margin top, 10 margin bottom, 40 navbar
    var views = document.querySelectorAll('.view');

    [].forEach.call(views, function(view) {
      view.style.maxHeight = maxHeight.toString() + 'px';
    });
  },

  registerRoutes: function() {
    var nullRoute = this.viewChangeRoute('');
    var searchRoute = this.viewChangeRoute('search');
    var registrationRoute = this.viewChangeRoute('registration');

    var focusFounderRoute = this.viewChangeRoute('', function(ctx) {
      this.setState({ focusedMarkerId: parseInt(ctx.params.id) });
    }.bind(this));

    var toggleFounderVisibilityRoute = function(ctx) {
      this.setState({ isLoading: true });
      WebApiUtils.showOnMapToggle(parseInt(ctx.params.id));
      this.reloadData();
      page.redirect('/search');
    }.bind(this);

    page('/', nullRoute);
    page('/search', searchRoute);
    page('/registration', registrationRoute);
    page('/founder/:id/focus', focusFounderRoute);
    page('/founder/:id/tgl-visibility', toggleFounderVisibilityRoute);
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

  handleRegistrationFinished: function() {
    this.reloadData();
  },

  render: function() {
    /*jshint ignore:start */
    return (
      <div className="app">
        <MapPane focusedMarkerId={this.state.focusedMarkerId} data={this.state.data}/>
        <NavBar activeView={this.state.activeView}/>
        <FilteredListView isVisible={this.state.activeView === 'search'} data={this.state.data} onShowOnMapToggle={this.handleShowOnMapToggle}/>
        <RegistrationView isVisible={this.state.activeView === 'registration'} onRegistrationFinished={this.handleRegistrationFinished}/>
        <Loader isVisible={this.state.isLoading}/>
      </div>
    );
    /*jshint ignore:end */
  }

});

module.exports = App;
