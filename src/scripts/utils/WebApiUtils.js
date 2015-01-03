'use strict';

var FounderServerActionCreators = require('../actions/FounderServerActionCreators');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {

  getAllFounders: function() {
    // TODO: handle the case if the local storage is not initialized yet

    // simulate retrieving data from a database
    var rawFounders = JSON.parse(localStorage.getItem('founders'));

    // simulate success callback
    FounderServerActionCreators.receiveAll(rawFounders);
  },

  createFounders: function(founders) {
    // simulate writing to a database
    var rawFounders = JSON.parse(localStorage.getItem('founders'));
    var createdFounders = [];

    founders.forEach(function(founder) {
      // TODO: properly create founders

      var createdFounder = {
        id: founder.id
      };
      createdFounders.push(createdFounder);
    });

    localStorage.setItem('founders', JSON.stringify(rawFounders.concat(createdFounders)));

    // simulate success callback
    setTimeout(function() {
      FounderServerActionCreators.receiveCreatedFounders(createdFounders);
    }, 0);
  }

};
