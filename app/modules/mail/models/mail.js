define([
  // Libs
  'backbone',
  'moment',
  'dispatcher'

], function (Backbone, Moment, Dispatcher) {

  'use strict';

  var Model = Backbone.Model.extend({

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
    },

    updateStarred: function () {
      this.set({'starred': !this.get('starred')});
    },

    updateSelected: function () {
      this.save({'selected': true});
    },

    updateArchived: function () {
      this.save({'archived': true});
    },

    triggerGlobally: function () {
      Dispatcher.trigger('mail:change', this.collection);
    }

  });

  return Model;

});
