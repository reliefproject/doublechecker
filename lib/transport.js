const Http = require('./transports/http')

class Transport {
  constructor(params) {
    this.source = null;
    switch (params.transport) {
      case 'http': {
        this.source = new Http(params);
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
