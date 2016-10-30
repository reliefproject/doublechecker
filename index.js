const Request = require('./lib/request')

class DoubleChecker() {

  constructor(params) {
    // Set servers
    // Set required score (3/4, 2/3 etc)
    // Simply check params for validity
    // and keep them for other objects
    /**
      params.server.transport
      params.server.host
      (params.transport.timeout)
      params.response.minScore
      params.response.ignoreKeys
    */
  };

  request(data, callback) {
    // Get requests
    // Create request instances
    let req = new Request({
      /*
      servers: params.servers,
      params: params.response
      data: data,
      callback: callback
      */
    });
    req.execute();
  };
};

module.exports = DoubleChecker;
