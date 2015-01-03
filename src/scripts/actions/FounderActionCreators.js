'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var WebApiUtils = require('../utils/WebApiUtils');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  clickFounder: function(founderId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CLICK_FOUNDER,
      id: founderId
    });
  },

  filterFounders: function(filter) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.FILTER_FOUNDERS,
      data: filter
    });
  },

  processCsv: function(text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PROCESS_CSV,
      data: text
    });
  },

  publishFounders: function(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PUBLISH_FOUNDERS,
      data: data
    });
  },

  cancelPublishing: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CANCEL_PUBLISHING
    });
  }

};
