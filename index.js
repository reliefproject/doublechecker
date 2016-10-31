const Request = require('./lib/request')

class DoubleChecker {

  constructor(params) {
    this.dataType = ['string', 'json'].indexOf(params.dataType) !== -1
      ? params.dataType
      : 'string';
    this.ignoreJSONKeys = params.ignoreJSONKeys instanceof Array
      ? params.ignoreJSONKeys
      : [];
    this.sources = params.sources instanceof Array
      ? params.sources
      : [];
  };

  request(data, callback) {
    if (typeof callback !== 'function') {
      return console.log(
        new Error('Callback not specified')
      );
    }
    let req = new Request({
      params: {
        dataType: this.dataType,
        ignoreJSONKeys: this.ignoreJSONKeys,
        callback: callback,
      },
      sources: this.sources,
      data: data,
    });
    req.execute();
  };
};

module.exports = DoubleChecker;
