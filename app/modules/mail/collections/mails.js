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

    localStorage: new Backbone.LocalStorage('Mails'),
    model: Model,

    comparator: function(model) {
      return model.get('timestamp');
    },

    initialize: function () {
      this.on('reset', this.triggerGlobally);
    },

    triggerGlobally: function () {
      Dispatcher.trigger('mails:change', this);
    }


  });

  return Collection;

});
