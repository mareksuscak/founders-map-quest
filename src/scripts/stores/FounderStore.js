'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes,
    EventTypes = AppConstants.EventTypes;

var _filter = {};
var _currentId = null;
var _founders = [];

var FounderStore = assign({}, EventEmitter.prototype, {

  init: function(founderList) {
    founderList.forEach(function() {
      // TODO: process
    });
  },

  emitChange: function() {
    this.emit(EventTypes.CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(EventTypes.CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(EventTypes.CHANGE_EVENT, callback);
  },

  /**
   * @param {string} id
   */
  get: function(id) {
    return _founders[id];
  },

  /**
   * Returns founders that are not hidden
   */
  getAll: function() {
    return _founders.filter(function(founder) {
      return !founder.hidden;
    });
  },

  getFiltered: function() {
    var filteredList = this.getAll();

    return filteredList;
  },

  getCurrentId: function() {
    return _currentId;
  },

  getCurrent: function() {
    return this.get(this.getCurrentId());
  },

  getFilter: function() {
    return _filter;
  }

});

FounderStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CLICK_FOUNDER:
      _currentId = action.data;
      break;

    case ActionTypes.PUBLISH_FOUNDERS:
      break;

    case ActionTypes.APPLY_FILTER:
      break;

    case ActionTypes.RECEIVE_FOUNDERS:
      FounderStore.init(action.data);
      break;

    default:
      // just prevent emitChange
      return;
  }

  FounderStore.emitChange();
});

module.exports = FounderStore;
