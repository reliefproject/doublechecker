const net = require('net');

class Tcp {
  constructor(params) {
    this.socket = new net.Socket();
    this.socket.connect(params.port, params.host);
    let timeout = params.timeout
      ? params.timeout
      : 10000;
    this.socket.setTimeout(timeout);
  };

  request(data, callback, errCallback) {
    const parent = this;
    let buffer = new Buffer('');
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    this.socket.write(data + '\n');
    this.socket.on('data', function(respData) {
      buffer = Buffer.concat(
        [buffer, new Buffer(respData)]
      );
      const str = buffer.toString();
      if (str.slice(-1) == '\n') {
        buffer = new Buffer('');
        callback(str);
        parent.socket.end();
      }
    });
    this.socket.on('error', function(err) {
      errCallback(err);
    });
    this.socket.on('timeout', function() {
      errCallback(new Error('Request timed out'));
      parent.socket.end();
    });
  };
};

module.exports = Tcp;
