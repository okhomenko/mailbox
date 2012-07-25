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
    url: '/data/mockData.js',
    //localStorage: new Backbone.LocalStorage('mails'),

    initialize: function () {
      var _this = this;
      this.on('reset', this.triggerGloballyReset);
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
    },

    triggerGloballyReset: function () {
      Dispatcher.trigger('mails:reset', this);
      Dispatcher.trigger('mails:renderInbox', this);
    }

  });

  return Collection;

});
