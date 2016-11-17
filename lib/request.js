let Response = require('./response');
let Transport = require('./transport');

class Request {

  constructor(params) {
    this.data = params.data;
    this.params = params.params;
    this.requestsToSend = [];
    for (let i in params.sources) {
      this.requestsToSend.push({
        transport: new Transport(
          params.sources[i],
          params.sourceManager
        ),
      });
    }
  };

  execute() {
    let res = new Response(this.params);
    let responses = [];
    let i = 0;
    const collectResponse = (err, data) => {
      responses.push({ err: err, data: data });
      i++;
      if (i === this.requestsToSend.length) {
        res.evaluate(responses);
      }
    };
    for (let i in this.requestsToSend) {
      const req = this.requestsToSend[i];
      req.transport.sendRequest(this.data, collectResponse);
    }
  };
};

module.exports = Request;
