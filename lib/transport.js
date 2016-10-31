const Http = require('./transports/http');
const Https = require('./transports/https');
const Tcp = require('./transports/tcp');

class Transport {
  constructor(params) {
    this.source = null;
    switch (params.transport) {
      case 'http': {
        this.source = new Http(params);
        break;
      }
      case 'https': {
        this.source = new Https(params);
        break;
      }
      case 'tcp': {
        this.source = new Tcp(params);
        break;
      }
    }
  };

  sendRequest(data, callback) {
    this.source.request(data, function(resp) {
      callback(null, resp);
    }, function(err) {
      callback(err)
    });
    //Let str = Math.random().toString(36).substring(7);
    //callback(null, str);
  };
};

module.exports = Transport;
