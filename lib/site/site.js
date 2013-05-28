
/**
 * Module dependencies.
 */

var $        = require('query')
  , animate  = require('animate')
  , Clip     = require('clipboard-dom').swf('ianstormtaylor-clipboard-dom/ZeroClipboard.swf')
  , debounce = require('debounce')
  , domify   = require('domify')
  , each     = require('each')
  , escape   = require('escape-html')
  , snippet  = require('hn-button-snippet')
  , HN       = require('hn-button')
  , on       = require('event').bind
  , prevent  = require('prevent')
  , store    = require('store')
  , value    = require('value');


/**
 * Cache DOM elements.
 */

var form   = $('#form')
  , url    = $('#url')
  , title  = $('#title')
  , count  = $('#count')
  , style  = $('#style')
  , submit = $('#submit');


/**
 * When the form submits, copy the current button code to the clipboard.
 */

form.onsubmit = prevent;

var clip = new Clip(submit, submit.parentNode);

clip.on('complete', function (text) {
  var original = submit.value;
  submit.value = 'Copied!';
  animate(submit, 'tada', function () { submit.value = original; });
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

on(url,   'keyup',  debounce(render, 200));
on(title, 'keyup',  debounce(render, 200));
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
  var old = $('header .hn-button');
  old.parentNode.replaceChild(a, old);
  HN.initialize(a);

  // code
  clip.text(full);
}