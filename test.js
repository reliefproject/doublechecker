const DoubleChecker = require('./index');

let dc = new DoubleChecker({
  dataType: 'json',
  ignoreJSONKeys: ['requestProcessingTime'],
  sources: [
    {
      transport: 'http',
      host: '23.94.134.161',
      port: 7876,
      path: '/nxt',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    {
      transport: 'http',
      host: 'nrs.scripterron.org',
      port: 7876,
      path: '/nxt',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    {
      transport: 'http',
      host: 'nxt.notbot.me',
      port: 7876,
      path: '/nxt',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    {
      transport: 'http',
      host: 'nxt1.scriba.io',
      port: 7876,
      path: '/nxt',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  ],
});

dc.request({ requestType: 'getAccount', account: 'NXT-8SWM-2224-YKWW-22222' }, function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data)
  console.log('Freq ', data.frequency);
  console.log('Score ', data.score);
});
