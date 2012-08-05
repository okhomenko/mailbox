requirejs([
  // Libs
  'dispatcher',

  // Deps
  'modules/mail/collections/mails',
  'modules/mail/views/list',
  'modules/mail/views/nav',
  'modules/mail/views/actions'

], function (Dispatcher, Collection, ListView, NavView, ActionsView) {

  'use strict';

  var collection = window.collection = new Collection();

  var view = window.view = new ListView({
    collection: collection
  });

  view.render(function (el) {
    $('#content').html(el);
    collection.fetch();
  });

  var side = new NavView();

  side.render(function(el){
    $('#side').html(el);
    Dispatcher.trigger('mails:renderInbox', collection);
  });

  var actions = new ActionsView();

  actions.render(function (el) {
    $('#actions').html(el);
  });

});
