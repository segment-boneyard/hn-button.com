
/**
 * Module dependencies.
 */

var $       = require('query')
  , animate = require('animate')
  , Clip    = require('clipboard-dom').swf('ianstormtaylor-clipboard-dom/ZeroClipboard.swf')
  , domify  = require('domify')
  , escape  = require('escape-html')
  , snippet = require('hn-button-snippet')
  , HN      = require('hn-button')
  , on      = require('event').bind
  , prevent = require('prevent')
  , store   = require('store')
  , value   = require('value');


/**
 * Cache DOM elements.
 */

var code   = $('#code')
  , count  = $('#count')
  , form   = $('#form')
  , style  = $('#style')
  , submit = $('#submit')
  , title  = $('#title')
  , url    = $('#url');


/**
 * When the form submits, copy the current button code to the clipboard.
 */

form.onsubmit = prevent;

var clip = new Clip(submit, submit.parentNode);

clip.on('complete', function (text) {
  animate(submit, 'tada');
  console.log(text);
});

on(window, 'resize', clip.reposition); // resposition the SWF overlay on resize


/**
 * Back the count and style inputs with local storage for convenience.
 */

value(count, store('count'));
value(style, store('style'));


/**
 * Update whenever the form elements are changed, and once at the beginning
 * based on the saved settings in local storage.
 */

on(url,   'change', render);
on(title, 'change', render);
on(count, 'change', render);
on(style, 'change', render);

render();


/**
 * Parse current settings from the form.
 */

function settings () {
  var options = {
    url   : value(url),
    title : value(title),
    count : value(count),
    style : value(style)
  };
  store(options); // store for convenience
  return options;
}


/**
 * Render the new HN button and code.
 */

function render () {
  var options = settings()
    , full    = snippet(options)
    , button  = snippet.button(options);

  // button
  var a = domify(button)[0];
  var old = $('.form-section .hn-button');
  old.parentNode.replaceChild(a, old);
  HN.initialize(a);

  // code
  code.innerHTML = escape(full);
  clip.text(full);
}