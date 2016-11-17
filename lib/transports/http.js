const http = require('http');
const querystring = require('querystring');

class Http {

  constructor(params) {
    this.params = params;
    this.params.protocol = 'http:';
    this.params.timeout = this.params.timeout
      ? this.params.timeout
      : 10000;
  };

  request(data, callback, errCallback) {

    let req = http.request(this.params, res => {
      let respData = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        respData += chunk;
      });
      res.on('end', () => {
        callback(respData);
      });
    });

    req.setTimeout(this.params.timeout);
    data = querystring.stringify(data);
    req.write(data);

    req.on('error', err => {
      errCallback(err);
    });
    req.on('timeout', () => {
      errCallback(new Error('Request timed out'));
      req.end();
    });

    req.end();

  };
};

module.exports = Http;
