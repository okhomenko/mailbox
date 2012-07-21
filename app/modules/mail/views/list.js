define([

  // Libs
  'backbone',

  // Deps
  './item'

], function (Backbone, ItemView) {

  'use strict';

  var View = Backbone.View.extend({

    tagName: 'table',
    className: 'table table-striped table-bordered',
    

    renderAll: function (done) {
      var _this = this;

      this.collection.each(function(model) {
        _this.renderOne(model);
      });

      if (_.isFunction(done)) {
        done(this.el);
      }

      return this;
    },

    renderOne: function (model) {
      var _this = this;
      var view = new ItemView({
        model: model
      });

      view.render(function(el) {
        _this.$el.append(el);
      });
    }
  });

  return View;

});

