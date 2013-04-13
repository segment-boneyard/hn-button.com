
/**
 * Module dependencies.
 */

var each = require('each')
  , Emitter = require('emitter')
  , on = require('event').bind
  , query = require('query');


/**
 * Origin of the server.
 */

var origin = '//localhost:8888';


/**
 * Module exports.
 */

var emitter = module.exports = new Emitter();


/**
 * Initialize all of the HN buttons on the page.
 */

each(query.all('.hn-button'), init);


/**
 * Listen for messages from the iframe.
 */

on(window, 'message', function (message) {
  if (message.origin !== origin) return;
  emitter.emit(message.data, {
    url : message.source.getAttribute('data-url'),
    title : message.source.getAttribute('data-title')
  });
});


/**
 * Initialize a button.
 *
 * @param {Element} button  The button's element in the DOM.
 */

function init (button) {
  render(button);
}


/**
 * Render a button.
 *
 * @param {Element} a  The original <a> element that was on the page.
 */

function render (a) {
  // Create the iframe element that we will replace the <a> with.
  var iframe = document.createElement('iframe');
  var title = a.getAttribute('data-title') || document.title;
  var url = a.getAttribute('data-url') || window.location.href;

  // Set the source based on data attributes, with fallbacks.
  iframe.src = src({
    title : title,
    url : url
  });

  // Add the title and url to the iframe for emitting.
  iframe.setAttribute('data-title', title);
  iframe.setAttribute('data-url', url);

  // Add our class.
  iframe.className = 'hn-iframe';

  // Give it a title for tooltips on hover.
  iframe.title = 'Hacker News Button';

  // Set the proper width and height, depending on the orientation.
  iframe.width = '100px';
  iframe.height = '100px';

  // Set other required attributes.
  iframe.scrolling = 'auto';
  iframe.frameBorder = '0'; // removes default iframe border

  // Replace the <a> with the iframe.
  a.parentNode.insertBefore(iframe, a);
  a.parentNode.removeChild(a);
}


/**
 * Render an iframe src string.
 *
 * @param {Object} params  The URL parameters to use.
 */

function src (params) {
  var title = encodeURIComponent(params.title);
  var url = encodeURIComponent(params.url);

  return origin + '/hn-button?title=' + title + '&url=' + url;
}