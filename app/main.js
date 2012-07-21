requirejs([

  // Mock
  '../data/mockData',

  // Deps
  'modules/mail/collections/mails',
  'modules/mail/views/list',
  'modules/mail/views/nav',

], function (Data, Collection, ListView, NavView) {

  'use strict';

  var collection = new Collection(Data);

  var view = new ListView({
    collection: collection
  });

  view.renderAll(function (el) {
    $('#content').html(el);
  });

  var side = new NavView();

  side.render(function(el){
    $('#side').html(el);
  });


});
