const DoubleChecker = require('./index');

let dc = new DoubleChecker({
  dataType: 'json',
  //IgnoreJSONKeys: ['requestProcessingTime'],
  ignoreJSONKeys: ['id'],
  sources: [
    {
      transport: 'tls',
      host: 'electrum.mindspot.org',
      port: 50002,
      tls: {
        rejectUnauthorized: false,
      },
    },
    {
      transport: 'tcp',
      host: 'electrum.online',
      port: 50001,
      tls: {},
    },
    {
      transport: 'tcp',
      host: 'electrum.jdubya.info',
      port: 50001,
    },
    {
      transport: 'tcp',
      host: 'vps.hsmiths.com',
      port: 8080,
    },
/*    {
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
    },*/
  ],
});

//Dc.request({ requestType: 'getAccount', account: 'NXT-8SWM-2224-YKWW-22222' }, function(err, data) {
dc.request('{"id": 1, "method":"blockchain.address.get_history", "params":["1NS17iag9jJgTHD1VXjvLCEnZuQ3rJDE9L"] }\n', function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data)
  console.log('Freq ', data.frequency);
  console.log('Score ', data.score);
});

/*
SetTimeout(function() {
  dc.request('{"id": 1, "method":"server.version", "params":[] }\n', function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data)
    console.log('Freq ', data.frequency);
    console.log('Score ', data.score);
  });
}, 5000);
*/
