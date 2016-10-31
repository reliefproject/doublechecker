const http = require('https');
const querystring = require('querystring');

class Https {

  constructor(params) {
    this.params = params;
    this.params.protocol = 'https:';
  };

  request(data, callback, errCallback) {
    let req = https.request(this.params, function(res) {
      let respData = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        respData += chunk;
      });
      res.on('end', function() {
        callback(respData);
      });
    });
    data = querystring.stringify(data);
    req.write(data);
    req.on('error', function(err) {
      errCallback(err);
    });
    req.end();
  };
};

module.exports = Http;
