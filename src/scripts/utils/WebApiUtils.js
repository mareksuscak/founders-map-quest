'use strict';

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

var STORAGE_KEY = 'founders';

module.exports = {

  initialize: function() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
      {
        id: 1,
        companyName: 'Google',
        founders: 'Larry Page & Sergei Brin',
        city: 'Mountain View',
        country: 'USA',
        postalCode: 'CA 94043',
        street: '1600 Amphitheatre Pkwy',
        photo: 'http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg',
        homepage: 'http://google.com',
        latitude: '37.457674',
        longitude: '-122.163452'
      },

      {
        id: 2,
        companyName: 'Apple',
        founders: 'Steve Jobs & Steve Wozniak',
        city: 'Cupertino',
        country: 'USA',
        postalCode: 'CA 95014',
        street: '1 Infinite Loop',
        photo: 'http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg',
        homepage: 'http://apple.com',
        latitude: '37.3403188',
        longitude: '-122.0581469'
      },

      {
        id: 3,
        companyName: 'Microsoft',
        founders: 'Bill Gates',
        city: 'Redmond',
        country: 'USA',
        postalCode: 'WA 98052-7329',
        street: 'One Microsoft Way',
        photo: 'http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg',
        homepage: 'http://microsoft.com',
        latitude: '37.472189',
        longitude: '-122.190191'
      }
    ]));
  },

  getAllFounders: function() {
    // simulate retrieving data from a database
    var rawFounders = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(rawFounders === null) {
      return [];
    }

    return rawFounders;
  },

  getFilteredFounders: function(filter) {
    var filtered
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
