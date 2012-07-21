define([
  // Libs
  'backbone',
  'dispatcher'

], function (Backbone, Dispatcher) {

  'use strict';

  var Model = Backbone.Model.extend({

    defaults: {
      starred: false,
      label: '',
      read: false
    },

    initialize: function () {
      this.set('time', this.formatDate(this.get('timestamp')));
      this.on('change', this.triggerGlobally);
    },

    formatDate: function (date) {
      var d, currDate, currMonth, currYear;

      d = new Date(date);
      currDate = d.getDate();
      currMonth = d.getMonth() + 1; // Months start from 0
      currYear = d.getFullYear();

      return [currDate, currMonth, currYear].join('-');
    },

    triggerGlobally: function () {
      Dispatcher.trigger('mail:change', this);
    }

  });

  return Model;

});
