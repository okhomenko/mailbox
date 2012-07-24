define([
  // Libs
  'backbone',
  'backbone.localstorage',
  'dispatcher',

  // Deps
  '../models/mail'

], function (Backbone, BackboneLocalStorage, Dispatcher, Model) {

  'use strict';

  var Collection = Backbone.Collection.extend({
    model: Model,

    initialize: function () {

    },

    comparator: function(model) {
      return -model.get('timestamp');
    },

    getInbox: function () {
      return this.filter(function (model) {
        return !model.get('archived');
      });
    },

    getAll: function () {
      return this.models;
    },

    getAllCount: function () {
      return this.getAll().length;
    },

    getUnread: function () {
      return this.filter(function (model) {
        return !model.get('read');
      });
    },

    getUnreadCount: function () {
      return this.getUnread().length;
    },

    getStarred: function () {
      return this.filter(function (model) {
        return model.get('starred');
      });
    },

    getStarredCount: function () {
      return this.getStarred().length;
    }

  });

  return Collection;

});
