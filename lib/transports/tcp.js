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
    let buffer = new Buffer('');
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    this.socket.write(data + '\n');
    this.socket.on('data', respData => {
      buffer = Buffer.concat(
        [buffer, new Buffer(respData)]
      );
      const str = buffer.toString();
      if (str.slice(-1) == '\n') {
        buffer = new Buffer('');
        callback(str);
        this.socket.end();
      }
    });
    this.socket.on('error', err => {
      errCallback(err);
    });
    this.socket.on('timeout', () => {
      errCallback(new Error('Request timed out'));
      this.socket.end();
    });
  };
};

module.exports = Tcp;
