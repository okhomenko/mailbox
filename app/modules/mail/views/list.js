define([

  // Libs
  'backbone',
  'dispatcher',

  // Deps
  './item'

], function (Backbone, Dispatcher, ItemView) {

  'use strict';

  return Backbone.View.extend({

    tagName: 'table',
    className: 'table table-striped',
    
    initialize: function () {
      _.bindAll(this);
      Dispatcher.on('mails:renderInbox', this.renderInbox);
      Dispatcher.on('mails:renderStarred', this.renderStarred);
      Dispatcher.on('mails:renderAll', this.renderAll);
    },
    
    render: function (done) {

      if (_.isFunction(done)) {
        done(this.el);
      }

      return this;
    },

    renderCollection: function (collection) {
      var _this = this;
      this.$el.empty();

      collection.each(function(model) {
        _this.renderModel(model);
      });
    },

    renderModel: function (model) {
      var _this = this;
      var view = new ItemView({
        model: model
      });

      view.render(function(el) {
        _this.$el.append(el);
      });
    },

    renderInbox: function () {
      var inbox = _(this.collection.getInbox());

      this.renderCollection(inbox);
    },

    renderStarred: function () {
      var starred = _(this.collection.getStarred());

      this.renderCollection(starred);
    },

    renderAll: function () {
      this.renderCollection(this.collection);
    }

  });

});

