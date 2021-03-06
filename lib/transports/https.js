const https = require('https');
const querystring = require('querystring');

class Https {

  constructor(params) {
    const tlsParams = params.tls;
    delete params.tls;
    this.params = params;
    this.params.protocol = 'https:';
    Object.assign(this.params, tlsParams);
    this.params.timeout = this.params.timeout
      ? this.params.timeout
      : 10000;
  };

  request(data, callback, errCallback) {

    let req = https.request(this.params, res => {
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

module.exports = Https;
