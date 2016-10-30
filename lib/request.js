let Response = require('./response');
let Transport = require('./transport');

class Request {
  constructor(params) {
    // Create new Transport instances
    // For each server create new Transport
    // Define array of requests to execute
    // Keep params around for Response
    this.requestsToSend = [];
    this.requestsToSend[0].transport = new Transport({
      // Server params here
    });
  };

  execute() {
    // For each request to execute
    // Send requests to Transports
    // transport.sendRequest(data, callback)

    // Get response from Transports, save into array
    // Aggregate responses, incl errors
    // Create new Reponse instance
    let res = new Response({
      // Set filter/threshold params here
    });
    res.evaluate(data);
  };
};
