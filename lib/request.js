let Response = require('./response');
let Transport = require('./transport');

class Request {

  constructor(params) {
    this.data = params.data;
    this.params = params.params;
    this.requestsToSend = [];
    for (let i in params.sources) {
      this.requestsToSend.push({
        transport: new Transport(params.sources[i]),
      });
    }
  };

  execute() {

    const parent = this;
    let res = new Response(this.params);
    let responses = [];
    let i = 0;
    const collectResponse = function(err, data) {
      responses.push({ err: err, data: data });
      i++;
      if (i === parent.requestsToSend.length) {
        res.evaluate(responses);
      }
    };

    for (let i in this.requestsToSend) {
      const req = this.requestsToSend[i];
      req.transport.sendRequest(this.data, collectResponse);
    }

    // TODO set timeout to run callback
    // Event if not all requests have finished

  };
};

module.exports = Request;
