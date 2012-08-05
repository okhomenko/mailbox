define([
  // Libs
  'backbone',
  'dispatcher',

  // Deps
  'text!../templates/nav.html'

], function (Backbone, Dispatcher, Template) {

  'use strict';

  return Backbone.View.extend({

    tagName: 'div',
    //className: 'mod modMailbox sideNav nav nav-list',
    className: 'mod modMailbox tabbable tabs-left',

    template: _.template(Template),

    events: {
      'click .inbox'   : 'triggerRenderInbox',
      'click .starred' : 'triggerRenderStarred',
      'click .all'     : 'triggerRenderAll'
    },

    initialize: function () {
      _.bindAll(this);
      Dispatcher.on('mails:reset', this.updateCount);
      Dispatcher.on('mail:change', this.updateCount);
      
      // Local triggers
      Dispatcher.on('mails:renderInbox', this.renderInbox);
      Dispatcher.on('mails:renderStarred', this.renderStarred);
      Dispatcher.on('mails:renderAll', this.renderAll);
    },

    render: function (done) {
      var content = this.template();
      this.$el.empty().html(content);

      this.$inbox = this.$('.inbox');
      this.$starred = this.$('.starred');
      this.$all = this.$('.all');

      this.$inboxCnt = this.$('.inbox .count');
      this.$starredCnt = this.$('.starred .count');

      if (_.isFunction(done)) {
        done(this.el);
      }

      return this;
    },

    updateCount: function (collection) {
      this.renderInboxCnt(collection)
          .renderStarredCnt(collection);

      return this;
    },

    renderInboxCnt: function (collection) {
      var count = collection.getUnreadCount();
      if (count) {
        this.$inboxCnt.html('(' + count + ')');
      } else {
        this.$inboxCnt.empty();
      }

      return this;
    },

    renderStarredCnt: function (collection) {
      var count = collection.getStarredCount();
      if (count) {
        this.$starredCnt.html('(' + count + ')');
      } else {
        this.$starredCnt.empty();
      }

      return this;
    },

    clearActive: function() {
      this.$('li').removeClass('active');
    },

    renderInbox: function () {
      this.clearActive();
      this.$inbox.addClass('active');
    },

    renderStarred: function () {
      this.clearActive();
      this.$starred.addClass('active');
    },

    renderAll: function () {
      this.clearActive();
      this.$all.addClass('active');
    },

    triggerRenderInbox: function () {
      Dispatcher.trigger('mails:renderInbox');
    },

    triggerRenderStarred: function () {
      Dispatcher.trigger('mails:renderStarred');
    },

    triggerRenderAll: function () {
      Dispatcher.trigger('mails:renderAll');
    }


  });

});
