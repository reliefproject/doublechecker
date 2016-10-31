const http = require('http');
const querystring = require('querystring');

class Http {

  constructor(params) {
    this.params = params;
    this.params.protocol = 'http:';
  };

  request(data, callback, errCallback) {
    let req = http.request(this.params, function(res) {
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
