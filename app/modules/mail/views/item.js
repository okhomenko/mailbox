define([
  // Libs
  'backbone',

  // Deps
  'text!../templates/item.html'

], function (Backbone, Template) {

  'use strict';

  var View = Backbone.View.extend({

    tagName: 'tr',
    className: 'mail',

    template: _.template(Template),

    events: {
      'click .starred': 'updateStarred',
      'click .sender': 'updateRead',
      'click .subject': 'updateRead',
      'click .time': 'updateRead',
    },

    initialize: function () {
      _.bindAll(this);
      this.model.on('change', this.render);
    },

    render: function (done) {
      var content = this.template(this.model.toJSON());
      this.$el.html(content);

      if (!this.model.get('read')) {
        this.$el.addClass('unread');
      } else {
        this.$el.removeClass('unread');
      }

      if (_.isFunction(done)) {
        done(this.el);
      }
    },

    updateStarred: function () {
      this.model.set('starred', !this.model.get('starred'));
    },

    updateRead: function () {
      this.model.set('read', true);
    }
    
  });

  return View;

});
