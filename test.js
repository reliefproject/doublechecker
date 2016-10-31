const DoubleChecker = require('./index');

let dc = new DoubleChecker({
  numUseSources: 2,
  dataType: 'json',
  ignoreJSONKeys: ['requestProcessingTime', 'confirmations'],
  //IgnoreJSONKeys: ['id'],
  sources: [
    /*{
      transport: 'tls',
      host: 'electrum.mindspot.org',
      port: 50002,
      tls: {
        rejectUnauthorized: false,
      },
      timeout: 1000,
    },
    {
      transport: 'tcp',
      host: 'electrum.online',
      port: 50001,
      timeout: 2000,
      tls: {},
    },
    {
      transport: 'tcp',
      host: 'electrum.jdubya.info',
      port: 50001,
      timeout: 2000,
    },
    {
      transport: 'tcp',
      host: 'vps.hsmiths.com',
      port: 8080,
    },*/
    {
      transport: 'http',
      host: '23.94.134.161',
      port: 7876,
      path: '/nxt',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 1000,
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
    {
      transport: 'https',
      host: 'nxt01.lndyn.com',
      port: 7876,
      path: '/nxt',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      tls: {
        rejectUnauthorized: false,
      },
      timeout: 1000,
    },
  ],
});

//Dc.request({ requestType: 'getAccount', account: 'NXT-8SWM-2224-YKWW-22222' }, function(err, data) {
//dc.request({ requestType: 'getBlocks', firstIndex: 0, lastIndex: 10, includeTransactions: false }, function(err, data) {
dc.request({ requestType: 'getDGSGoods', firstIndex: 100, lastIndex: 125 }, function(err, data) {
  //Dc.request('{"id": 1, "method":"blockchain.address.get_history", "params":["1XPTgDRhN8RFnzniWCddobD9iKZatrvH4"] }', function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data)
  console.log('Freq ', data.frequency);
  console.log('Score ', data.score);
  console.log('Duration ms ', data.duration);
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
