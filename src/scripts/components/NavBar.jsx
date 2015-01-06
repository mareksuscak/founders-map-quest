'use strict';

var React = require('react'),
    cx = require('react/lib/cx'),
    page = require('page');

var NavBar = React.createClass({

  propTypes: {
    activeView: React.PropTypes.string.isRequired
  },

  handleSearchClick: function(e) {
    e.preventDefault();
    if(this.props.activeView === 'search') {
      page('/');
    } else {
      page('/search');
    }
  },

  handleRegistrationClick: function(e) {
    e.preventDefault();
    if(this.props.activeView === 'registration') {
      page('/');
    } else {
      page('/registration');
    }
  },

  render: function() {
    /*jshint ignore:start */
    var searchLinkClasses = cx({
      'nav-search': true,
      'button': true,
      'small': true,
      'strong': true,
      'unround': true,
      'active': this.props.activeView === 'search'
    });

    var registrationLinkClasses = cx({
      'nav-registration': true,
      'button': true,
      'fr': true,
      'small': true,
      'strong': true,
      'round-right': true,
      'active': this.props.activeView === 'registration'
    });

    return (
      <nav className="navbar-wrapper z10 clearfix">
        <div className="navbar-overlay fl dark fill-darken2">
          <a href="#/">
            <h1 className="fl">Founders<strong>Map</strong></h1>
          </a>
          <div className="navbar fr">
            <a href="#!/search" className={searchLinkClasses} onClick={this.handleSearchClick}>
              <i className="fa fa-search"/>
            </a>
          </div>
        </div>
        <a href="#!/registration" className={registrationLinkClasses} onClick={this.handleRegistrationClick}>
          Registration
        </a>
      </nav>
    );
    /*jshint ignore:end */
  }

});

module.exports = NavBar;
