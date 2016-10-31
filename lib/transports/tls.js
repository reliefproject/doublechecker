const tls = require('tls');

class Tls {

  constructor(params) {
    this.socket = tls.connect(params.port, params.host, params.tls);
  };

  request(data, callback, errCallback) {
    const parent = this;
    this.socket.write(data);
    this.socket.addListener('data', function(data) {
      callback(data);
      parent.socket.end();
    });
    this.socket.addListener('error', function(err) {
      errCallback(err);
    });
  };
};

module.exports = Tls;
