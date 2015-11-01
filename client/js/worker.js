
/**
 * On message.
 */

self.addEventListener('message', function(e) {
  self.postMessage('submit');
  setInterval(function() { self.postMessage('submit') }, 3960000);
});
