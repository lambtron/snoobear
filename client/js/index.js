(function() {

  /**
   * New `reddit`.
   */

  var reddit = new Snoocore({
    userAgent: 'Snoocore-examples@oauth-implicit',
    oauth: {
      type: 'implicit',
      key: 'ZMCcBVy-jqgrrA',
      redirectUri: 'http://www.snoobear.co/',
      scope: [ 'submit' ]
    }
  });

  /**
   * Get `authUrl`.
   */

  var authUrl = reddit.getImplicitAuthUrl();

  /**
   * Attach auth click listener.
   */

  document.getElementById('auth').addEventListener('click', function(e) {
    window.location.href = authUrl;
  });

  /**
   * If auth hash is in URL, then authenticate user.
   */

  var match = ('' + window.location.hash).match(/access_token=(.*?)&/);
  var accessToken = match ? match[1] : '';
  if (accessToken) {
    reddit.auth(accessToken)
      .then()
      .done(function() {
        document.getElementsByClassName('Oauth')[0].classList.toggle('hide');
        document.getElementsByClassName('Form')[0].classList.toggle('hide');
      });
  };

  /**
   * Grab form fields.
   */

  function fields() {
    var title = document.querySelector('.title').value;
    var subreddits = _.uniq(document.querySelector('.subreddits').value.replace(/\s+/g, '').split(','));
    var url = document.querySelector('.url').value;
    var kind = 'link';

    return {
      sr: subreddits,
      title: title,
      url: url,
      kind: kind
    };
  }

  /**
   * On submit.
   */

  document.getElementById('submit').addEventListener('click', function(e) {
    start(fields());
  });

  /**
   * Submit to reddit.
   */

  function redditSubmit(obj) {
    reddit('api/submit').post(obj);
  }

  /**
   * Background workers.
   */

  function start(fields) {
    if (window.Worker) {
      var timer = new Worker('/js/worker.js');
      timer.postMessage('start');
      timer.addEventListener('message', function(e) {
        if (fields.sr.length === 0) timer.terminate();
        redditSubmit({
          sr: fields.sr.pop(),
          title: fields.title,
          url: fields.url,
          kind: fields.kind
        });
      });
    } else {
      console.log('Web workers disabled for this browser.');
      redditSubmit({
        sr: fields.sr.pop(),
        title: fields.title,
        url: fields.url,
        kind: fields.kind
      });
      setInterval(function() {
        redditSubmit({
          sr: fields.sr.pop(),
          title: fields.title,
          url: fields.url,
          kind: fields.kind
        });
      }, 3960000)
    }
  }

})();