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
      res.on('data', chunk => {
        respData += chunk;
      });
      res.on('end', () => {
        callback(respData);
      });
    });

    if (typeof window === 'undefined') {
      req.setTimeout(this.params.timeout);
    } else {
      if (typeof req.setTimeout === 'function') {
        req.setTimeout(this.params.timeout);
      } else if (req.xhr) {
        req.xhr.timeout = this.params.timeout;
      }
    }

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
