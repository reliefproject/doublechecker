const DoubleChecker = require('./index');

let dc = new DoubleChecker({
  dataType: 'json',
  ignoreJSONKeys: ['requestProcessingTime'],
  sources: [
    {
      transport: 'http',
      host: '23.94.134.161',
      port: 7876,
      pathname: '/nxt',
      method: 'POST',
    },
    {
      transport: 'http',
      host: 'nrs.scripterron.org',
      port: 7876,
      pathname: '/nxt',
      method: 'POST',
    },
    {
      transport: 'http',
      host: 'nxt.notbot.me',
      port: 7876,
      pathname: '/nxt',
      method: 'POST',
    },
    {
      transport: 'http',
      host: 'nxt1.scriba.io',
      port: 7876,
      pathname: '/nxt',
      method: 'POST',
    },
  ],
});

dc.request('test', function(err, data) {
  console.log(err);
  console.log(data);
});
