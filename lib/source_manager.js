const crypto = require('crypto');

function getKey(source) {
  // TODO
  if (!source) { return; }
  return source.transport + source.host + source.port;
};

class SourceManager {

  constructor(params) {
    this.sources = {};
    for (let i in params) {
      const key = getKey(params[i]);
      this.sources[key] = params[i];
      this.sources[key].requestsMade = 0;
      this.sources[key].failures = 0;
      this.sources[key].failRate = 0;
    }
  };

  selectSources(numSources) {
    let sortingArray = [];
    for (let k in this.sources) {
      let failRate = this.sources[k].failRate;
      sortingArray.push({
        key: k,
        failRate: failRate,
      });
    }
    sortingArray.sort((a, b) => {
      return a.failRate - b.failRate;
    });
    let selectedSources = [];
    for (let i = 0; i < numSources; i++) {
      const key = sortingArray[i].key;
      selectedSources.push(this.sources[key]);
    }
    return selectedSources;
  };

  updateReputation(source, failure) {
    if (!source) { return; }
    const key = getKey(source);
    this.sources[key].requestsMade++;
    if (failure) {
      this.sources[key].failures++;
      this.sources[key].failRate =
        (this.sources[key].failures / this.sources[key].requestsMade);
    }
  };
};

module.exports = SourceManager;
