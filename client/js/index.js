(function() {

  /**
   * New `reddit`.
   */

  var reddit = new Snoocore({
    userAgent: 'snoobear',
    oauth: {
      type: 'implicit',
      key: 'ZMCcBVy-jqgrrA',
      redirectUri: 'http://www.snoobear.co/',
      // redirectUri: 'http://localhost:3000',
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
    document.getElementsByClassName('Form')[0].classList.toggle('hide');
    document.getElementsByClassName('Queued')[0].classList.toggle('hide');
  });

  /**
   * Submit to reddit.
   */

  function redditSubmit(obj) {
    // add <li> to class ul.Subreddits
    //
    reddit('api/submit')
      .post(obj)
      .then(function() {
        // Success!
        var li = document.querySelector('li[data-subreddit="' + obj.sr + '"]');
        li.innerText = '';
        var sr = document.createElement('span');
        sr.innerText = obj.sr;
        var icon = document.createElement('span');
        icon.className = 'glyphicon glyphicon-ok-sign pull-right';
        li.appendChild(sr);
        li.appendChild(icon);

        var message = document.createElement('div');
        message.className = 'text-success';
        message.innerText = 'Success!';
        li.appendChild(message);

      }, function(error) {
        var li = document.querySelector('li[data-subreddit="' + obj.sr + '"]');
        li.innerText = '';
        var sr = document.createElement('span');
        sr.innerText = obj.sr;
        var icon = document.createElement('span');
        icon.className = 'glyphicon glyphicon-remove-sign pull-right';
        li.appendChild(sr);
        li.appendChild(icon);

        var err = JSON.parse(error.body);
        var message = document.createElement('div');
        message.className = 'text-danger';
        message.innerText = err.json.errors.join(' ')
        li.appendChild(message);
      });
  }

  /**
   * Add subreddits in Queued.
   */

  function addSubreddits(arr) {
    var ul = document.getElementsByClassName('Queued-subreddits')[0];
    for (var i = 0; i < arr.length; i++) {
      var li = document.createElement('li');
      li.dataset.subreddit = arr[i];
      var sr = document.createElement('span');
      sr.innerText = arr[i];
      var icon = document.createElement('span');
      icon.className = 'glyphicon glyphicon-option-horizontal pull-right';
      li.appendChild(sr);
      li.appendChild(icon);
      ul.appendChild(li);
    }
  }

  /**
   * Background workers.
   */

  function start(fields) {
    addSubreddits(fields.sr);
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