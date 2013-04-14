
/**
 * Module dependencies.
 */

var each = require('each')
  , Emitter = require('emitter')
  , extend = require('extend')
  , on = require('event').bind
  , query = require('query');


/**
 * Module exports.
 */

var HN = module.exports = new Emitter();


/**
 * Origin of the server.
 */

var origin = location.procotol + '//localhost:5000';


/**
 * Initialize all of the HN buttons on the page.
 */

each(query.all('.hn-button'), function (a) {
  new Button (a);
});


/**
 * Listen for messages from the iframe.
 */

HN.on('width', function (event) {
  var iframe = event.iframe;
  iframe.width = event.width;
});


/**
 * Initialize a button.
 *
 * @param {Element} button  The button's element in the DOM.
 */

function Button (a) {
  // listen for cross-window events
  on(window, 'message', function (message) {
    if (message.origin !== origin) return;
    this.emit(message.data.event, message);
  });

  this.render(a);
}


/**
 * Render a button.
 *
 * @param {Element} a  The original <a> element that was on the page.
 */

Button.prototype.render = function (a) {
  // Grab some settings from the <a>.
  var options = {
    title : a.getAttribute('data-title') || document.title,
    url   : a.getAttribute('data-url') || window.location.href,
    style : a.getAttribute('data-style'),
    count : a.getAttribute('data-count'),
  };

  // Create the iframe element that we will replace the <a> with.
  var iframe = this.iframe = document.createElement('iframe');

  // Set the source based on data attributes, with fallbacks.
  iframe.src = src(options);

  // Add the class, title and url to the iframe for emitting, and I think it's
  // nice to see the same attributes you set on the <a> stay on the iframe.
  iframe.className = 'hn-button';
  iframe.setAttribute('data-title', options.title);
  iframe.setAttribute('data-url', options.url);
  if (options.style) iframe.setAttribute('data-style', options.style);
  if (options.count) iframe.setAttribute('data-count', options.count);

  // Give it a title for accessibility.
  iframe.title = 'Hacker News Button';

  // Set the proper width and height, depending on the orientation.
  iframe.height = '20px'; // standard
  iframe.width = '99px'; // best guess, real width calculated on load.

  // Set other required attributes.
  iframe.frameBorder = '0'; // removes default iframe border

  // Replace the <a> with the iframe.
  a.parentNode.insertBefore(iframe, a);
  a.parentNode.removeChild(a);
};


/**
 * Emit a global HN button event.
 */

Button.prototype.emit = function (event, data) {
  // add our iframe, for differentiating
  data.iframe = this.iframe;
  HN.emit(event, data);
};


/**
 * Render an iframe src href.
 *
 * @param {Object} options  The options to use.
 * @return {String}         The iframe `src` href.
 */

function src (options) {
  var query = '';
  each(options, function (key, value) {
    query += query ? '&' : '?';
    if (value) query += key + '=' + encodeURIComponent(value);
  });
  return origin + query;
}