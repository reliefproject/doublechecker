class Transport {
  constructor(params) {
    // Select Transport Type
  };

  sendRequest(data, callback) {
    // Send to Transport type
    // Get response and relay to callback
    let str = Math.random().toString(36).substring(7);
    callback(null, str);
  };
};

module.exports = Transport;
