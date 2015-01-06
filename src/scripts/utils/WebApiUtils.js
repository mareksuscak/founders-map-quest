'use strict';

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

var STORAGE_KEY = 'founders';

module.exports = {

  getAllFounders: function() {
    // simulate retrieving data from a database
    var rawFounders = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(rawFounders === null) {
      return [];
    }

    return rawFounders;
  },

  publishFounders: function(founders) {
    // simulate writing to a database
    var rawFounders = JSON.parse(localStorage.getItem(STORAGE_KEY));
    var createdFounders = [];

    founders.forEach(function(founder) {
      createdFounders.push(founder);
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(rawFounders.concat(createdFounders)));
  }

};
