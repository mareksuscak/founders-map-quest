'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes,
    EventTypes = AppConstants.EventTypes;

var _columns = [];
var _rows = [];

var CsvDataStore = assign({}, EventEmitter.prototype, {

  init: function(columns, rows) {
    _columns = columns;
    _rows = rows;
  },

  clear: function() {
    _columns = [];
    _rows = [];
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

  getColumns: function() {
    return _columns;
  },

  getRows: function() {
    return _rows;
  }
});

CsvDataStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.PROCESS_CSV:
      CsvDataStore.init(payload.data.columns, payload.data.rows);
      break;

    case ActionTypes.PUBLISH_FOUNDERS:
    case ActionTypes.CANCEL_PUBLISHING:
      CsvDataStore.clear();
      break;

    default:
      // just prevent emitChange
      return;
  }

  CsvDataStore.emitChange();
});

module.exports = CsvDataStore;
