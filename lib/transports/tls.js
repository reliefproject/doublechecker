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
    const parent = this;
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    this.socket.write(data + '\n');
    this.socket.addListener('data', function(data) {
      callback(data);
      parent.socket.end();
    });
    this.socket.addListener('error', function(err) {
      errCallback(err);
    });
    this.socket.addListener('timeout', function() {
      errCallback(new Error('Request timed out'));
      parent.socket.end();
    });
  };
};

module.exports = Tls;
