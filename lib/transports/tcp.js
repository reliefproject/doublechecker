const net = require('net');

class Tcp {
  constructor(params) {
    this.socket = new net.Socket();
    this.socket.connect(params.port, params.host);
  };

  request(data, callback, errCallback) {
    const parent = this;
    let buffer = new Buffer('');
    this.socket.write(data);
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
  };
};

module.exports = Tcp;
