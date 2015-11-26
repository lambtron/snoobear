
/**
 * On message.
 */

self.addEventListener('message', function(e) {
  self.postMessage('submit');
  setInterval(function() { self.postMessage('submit') }, 610000);
  // setInterval(function() { self.postMessage('submit') }, 5000);
});
