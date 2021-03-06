define([
  // Libs
  'backbone',

  // Deps
  'text!../templates/actions.html'
], function (Backbone, Template) {

  var View = Backbone.View.extend({

    template: _.template(Template),

    render: function (done) {
      var content = this.template();
      this.$el.html(content);

      if (_.isFunction(done)) {
        done(this.el);
      }

      return this;
    }
    

  });

  return View;

});
