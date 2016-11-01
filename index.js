const SourceManager = require('./lib/source_manager')
const Request = require('./lib/request')

let self;

class DoubleChecker {

  constructor(params) {
    this.numUseSources = params.numUseSources
      ? params.numUseSources
      : 3;
    this.dataType = ['string', 'json'].indexOf(params.dataType) !== -1
      ? params.dataType
      : 'string';
    this.ignoreJSONKeys = params.ignoreJSONKeys instanceof Array
      ? params.ignoreJSONKeys
      : [];
    this.sources = params.sources instanceof Array
      ? params.sources
      : [];
    this.sourceManager = new SourceManager(this.sources);
    self = this;
  };

  request(data, callback) {
    if (typeof callback !== 'function') {
      return console.log(
        new Error('Callback not specified')
      );
    }
    const now = new Date();
    const startTime = now.getTime();
    let req = new Request({
      params: {
        dataType: self.dataType,
        ignoreJSONKeys: self.ignoreJSONKeys,
        callback: callback,
        startTime: startTime,
      },
      sources: self.sourceManager.selectSources(self.numUseSources),
      sourceManager: self.sourceManager,
      data: data,
    });
    req.execute();
  };
};

module.exports = DoubleChecker;
