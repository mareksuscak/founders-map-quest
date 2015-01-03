'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var WebApiUtils = require('../utils/WebApiUtils');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receiveAll: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_FOUNDERS,
      data: data
    });
  },

  receivePublishedFounders: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_PUBLISHED_FOUNDERS,
      data: data
    });
  }

};
