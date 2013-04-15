
/**
 * Cache some elements.
 */

var button = document.getElementById('hn-button')
  , count = document.getElementById('hn-count');


/**
 * Emit an event on load. Include our width, so the parent can resize us.
 */

window.onload = function (event) {
  var orientation = document.body.getAttribute('data-count');
  var el = count;
  if (!count || orientation === 'vertical') el = button; // fallback
  emit('load', {
    width : el.getBoundingClientRect().right
  });
};


/**
 * Emit both a `click` and `submit` or `vote` on button clicks.
 */

button.onclick = function (event) {
  emit('click');
  emit(this.getAttribute('data-action'));
};


/**
 * Emits an event to the parent window.
 *
 * @param {String} event  The name of the event.
 * @param {Object} data   The data to send with the message.
 */

function emit (event, data) {
  window.parent.postMessage({
    event : event,
    id : window.name,
    data : data || {}
  }, '*');
}