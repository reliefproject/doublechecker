const Http = require('./transports/http');
const Https = require('./transports/https');
const Tcp = require('./transports/tcp');
const Tls = require('./transports/tls');

class Transport {

  constructor(params, sourceManager) {
    this.source = null;
    this.params = params;
    this.sourceManager = sourceManager;
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
      case 'tls': {
        this.source = new Tls(params);
        break;
      }
    }
  };

  sendRequest(data, callback) {
    this.source.request(data, (resp) => {
      callback(null, resp);
      this.sourceManager.updateReputation(parent.params, false);
    }, (err) => {
      callback(err);
      this.sourceManager.updateReputation(parent.params, true);
    });
  };
};

module.exports = Transport;
