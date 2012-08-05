define([
  // Libs
  'backbone',
  'moment',
  'dispatcher'

], function (Backbone, Moment, Dispatcher) {

  'use strict';

  return Backbone.Model.extend({

    defaults: {
      label: '',
      starred: false,
      read: false,
      selected: false,
      archived: false
    },

    initialize: function () {
      this.on('change', this.triggerGlobally);
    },

    updateRead: function () {
      this.set({'read': true});
      this.save();
    },

    updateStarred: function () {
      this.set({'starred': !this.get('starred')});
      this.save();
    },

    updateSelected: function () {
      this.set({'selected': true});
      this.save();
    },

    updateArchived: function () {
      this.set({'archived': true});
      this.save();
    },

    triggerGlobally: function () {
      Dispatcher.trigger('mail:change', this.collection);
    }

  });

});
