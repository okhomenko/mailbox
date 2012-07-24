requirejs([
  // Libs
  'dispatcher',

  // Mock
  '../data/mockData',

  // Deps
  'modules/mail/collections/mails',
  'modules/mail/views/list',
  'modules/mail/views/nav',

], function (Dispatcher, Data, Collection, ListView, NavView) {

  'use strict';

  var collection = window.collection = new Collection(Data);

  var view = window.view = new ListView({
    collection: collection
  });

  view.render(function (el) {
    $('#content').html(el);
  });

  var side = new NavView();

  side.render(function(el){
    $('#side').html(el);
    Dispatcher.trigger('mails:reset', collection);
    Dispatcher.trigger('mails:renderInbox', collection);
  });

});
