const crypto = require('crypto');

class Response {
  constructor(params) {
    this.params = params;
  };

  evaluate(responses) {
    let dataToCompare = [];
    for (let i in responses) {
      let resp = responses[i];
      if (resp.err !== null) {
        dataToCompare.push(resp.err.message);
        continue;
      }
      switch (this.params.dataType) {
        case 'string': {
          dataToCompare.push(resp.data);
          continue;
        }
        case 'json': {
          let jsonData = {};
          try {
            jsonData = JSON.parse(resp.data);
          } catch (e) {
            dataToCompare.push(e.message);
            continue;
          }
          for (let count in this.params.ignoreJSONKeys) {
            const key = this.params.ignoreJSONKeys[count];
            delete jsonData[key];
          }
          dataToCompare.push(
            JSON.stringify(jsonData)
          );
          continue;
        }
      }
    }

    let responseHashes = {};
    for (let i in dataToCompare) {
      const data = dataToCompare[i];
      const hash = crypto.createHash('md5')
                         .update(data, 'utf8')
                         .digest('hex');
      if (responseHashes[hash] && responseHashes[hash]) {
        responseHashes[hash].frequency++;
        continue;
      }
      responseHashes[hash] = {
        frequency: 1,
        data: data,
      };
    }

    let sortingArray = [];
    for (let k in responseHashes) {
      let freq = responseHashes[k].frequency;
      responseHashes[k].score = (freq / responses.length).toFixed(2)
      sortingArray.push({
        hash: k,
        freq: freq,
      });
    }
    sortingArray.sort(function(a,b) {
      return b.freq - a.freq;
    });

    const mostFrequent = sortingArray[0].hash;
    this.params.callback(null, responseHashes[mostFrequent]);
  };
};

module.exports = Response;
