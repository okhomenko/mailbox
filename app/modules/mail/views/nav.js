
define([
  // Libs
  'backbone',

  // Deps
  './navItem'

], function (Backbone, ItemView) {

  'use strict';

  var View = Backbone.View.extend({

    tagName: 'ul',
    className: 'nav nav-list',

    initialize: function () {
      this.collection = new Backbone.Collection([
        {name: 'Inbox', 'type': 'unread'},
        {name: 'Starred', 'type': 'starred'},
        {name: 'All Mail'}
      ]);
    },

    render: function (done) {
      var _this = this;
      this.$el.empty();

      this.collection.each(function(model) {
        _this.renderOne(model);
      });

      if (_.isFunction(done)) {
        done(this.el);
      }

      return this;
    },

    renderOne: function (model) {
      var _this = this,
          view = new ItemView({model: model});
      
      view.render(function(el){
        _this.$el.append(el);
      });

    }

  });

  return View;

});