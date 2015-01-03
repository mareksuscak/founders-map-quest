var keyMirror = require('keymirror');

module.exports = {

  EventTypes: keyMirror({
    CHANGE_EVENT: null
  }),

  ActionTypes: keyMirror({
    // View actions
    CLICK_FOUNDER: null,
    FILTER_FOUNDERS: null,
    PROCESS_CSV: null,
    PUBLISH_FOUNDERS: null,
    CANCEL_PUBLISHING: null,

    // Server actions
    RECEIVE_RAW_PUBLISHED_FOUNDERS: null,
    RECEIVE_RAW_FOUNDERS: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
