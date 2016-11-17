const tls = require('tls');

class Tls {

  constructor(params) {
    this.socket = tls.connect(params.port, params.host, params.tls);
    let timeout = params.timeout
      ? params.timeout
      : 10000;
    this.socket.setTimeout(timeout);
  };

  request(data, callback, errCallback) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    this.socket.write(data + '\n');
    this.socket.addListener('data', data => {
      callback(data);
      this.socket.end();
    });
    this.socket.addListener('error', err => {
      errCallback(err);
    });
    this.socket.addListener('timeout', () => {
      errCallback(new Error('Request timed out'));
      this.socket.end();
    });
  };
};

module.exports = Tls;
