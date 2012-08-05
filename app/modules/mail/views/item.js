define([
  // Libs
  'backbone',
  'moment',

  // Deps
  'text!../templates/item.html'

], function (Backbone, Moment, Template) {

  'use strict';

  return Backbone.View.extend({

    tagName: 'tr',
    className: 'mail',

    template: _.template(Template),

    events: {
      'click .sender, .subject, .time' : 'updateRead',
      'click .starred'                 : 'updateStarred',
      'click .select'                  : 'updateSelected'
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
      this.model.updateStarred();
    },

    updateRead: function () {
      this.model.updateRead();
    },

    updateSelected: function () {
      this.model.updateSelected();
    }
    
  });

});
