
define([

  // Libs
  'backbone',
  'dispatcher',

  // Deps
  'text!../templates/navItem.html'
], function (Backbone, Dispatcher, Template) {

  var View = Backbone.View.extend({

    template: _.template(Template),

    initialize: function () {
      _.bindAll(this);
      Dispatcher.on('mail:change', this.update);
      Dispatcher.on('mails:change', this.update);
    },

    render: function (done) {
      var content = this.template(this.model.toJSON());
      this.$el.html(content);

      this.$count = this.$('.count');

      if (_.isFunction(done)) {
        done(this.el);
      }
    },

    update: function (model) {
      var collection = model.collection,
          type = this.model.get('type'),
          filtered = [];

      switch (type) {
        case 'unread':
          filtered = collection.filter(function(model){
            return !model.get('read');
          });
          break;

        case 'starred':
          filtered = collection.filter(function(model){
            return model.get('starred');
          });
          break;
      }

      this.$count.html(filtered.length ? '(' + filtered.length + ')' : '');
    }

  });

  return View;

});