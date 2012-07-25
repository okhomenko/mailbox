(function() {

  'use strict';

  requirejs.config({

    deps: ['backbone.localstorage', 'bootstrap', 'main'],

    urlArgs: "bust=" +  (new Date()).getTime(),

    paths: {
      // Paths
      'libs': '../assets/js/libs',
      'plugs': '../assets/js/plugins',

      // Libs
      'jquery': '../assets/js/libs/jquery',
      'underscore': '../assets/js/libs/lodash',
      'backbone': '../assets/js/libs/backbone',
      'moment': '../assets/js/libs/moment',
      'bootstrap': '../assets/js/libs/bootstrap',

      // Plugins
      'backbone.localstorage': '../assets/js/plugins/backbone.localstorage',
      'text': '../assets/js/plugins/rjs.text'
    },

    shim: {
      'backbone': {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      },

      'backbone.localstorage': {
        deps: ['backbone']
      }
    }

  });

}());

