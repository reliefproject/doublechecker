const assert = require('assert');
const Response = require('../lib/response');

describe('response (strings)', function() {
  it('matches all', function(done) {
    let res = new Response({
      dataType: 'string',
      callback: function(err, data) {
        assert.equal(err, null);
        assert.equal(data.score, 1);
        assert.equal(data.data, 'myteststring');
        done();
      },
    });
    res.evaluate([
      { err: null, data: 'myteststring' },
      { err: null, data: 'myteststring' },
      { err: null, data: 'myteststring' },
    ]);
  });
  it('two of three', function(done) {
    let res = new Response({
      dataType: 'string',
      callback: function(err, data) {
        assert.equal(err, null);
        assert(data.score >= 0.66);
        assert.equal(data.data, 'myteststring');
        done();
      },
    });
    res.evaluate([
      { err: null, data: 'myteststring' },
      { err: null, data: 'myotherstring' },
      { err: null, data: 'myteststring' },
    ]);
  });
  it('json matches all', function(done) {
    let res = new Response({
      dataType: 'json',
      callback: function(err, data) {
        assert.equal(err, null);
        assert.equal(data.score, 1);
        assert.equal(data.data, '{"hello":"world"}');
        done();
      },
    });
    res.evaluate([
      { err: null, data: '{"hello":"world"}' },
      { err: null, data: '{"hello":"world"}' },
      { err: null, data: '{"hello":"world"}' },
    ]);
  });
  it('json partially invalid', function(done) {
    let res = new Response({
      dataType: 'json',
      callback: function(err, data) {
        assert.equal(err, null);
        assert(data.score >= 0.66);
        assert.equal(data.data, '{"hello":"world"}');
        done();
      },
    });
    res.evaluate([
      { err: null, data: '{"hello":"world"}' },
      { err: null, data: '{"hello_:"world"}' },
      { err: null, data: '{"hello":"world"}' },
    ]);
  });
  it('json ignore key', function(done) {
    let res = new Response({
      dataType: 'json',
      ignoreJSONKeys: ['ignoreMe'],
      callback: function(err, data) {
        assert.equal(err, null);
        assert.equal(data.score, 1);
        assert.equal(data.data, '{"hello":"world"}');
        done();
      },
    });
    res.evaluate([
      { err: null, data: '{"hello":"world","ignoreMe":"one"}' },
      { err: null, data: '{"hello":"world","ignoreMe":"two"}' },
      { err: null, data: '{"hello":"world","ignoreMe":"three"}' },
    ]);
  });
  it('one error', function(done) {
    let res = new Response({
      dataType: 'json',
      callback: function(err, data) {
        assert.equal(err, null);
        assert(data.score >= 0.66);
        assert.equal(data.data, '{"hello":"world"}');
        done();
      },
    });
    res.evaluate([
      { err: new Error('not good'), data: null },
      { err: null, data: '{"hello":"world"}' },
      { err: null, data: '{"hello":"world"}' },
    ]);
  });

});
