const assert = require('assert');
const Response = require('../lib/response');

describe('response (strings)', () => {
  it('matches all', done => {
    let res = new Response({
      dataType: 'string',
      callback: (err, data) => {
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
  it('two of three', done => {
    let res = new Response({
      dataType: 'string',
      callback: (err, data) => {
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
  it('json matches all', done => {
    let res = new Response({
      dataType: 'json',
      callback: (err, data) => {
        assert.equal(err, null);
        assert.equal(data.score, 1);
        assert.deepEqual(data.data, {hello: 'world'});
        done();
      },
    });
    res.evaluate([
      { err: null, data: '{"hello":"world"}' },
      { err: null, data: '{"hello":"world"}' },
      { err: null, data: '{"hello":"world"}' },
    ]);
  });
  it('json partially invalid', done => {
    let res = new Response({
      dataType: 'json',
      callback: (err, data) => {
        assert.equal(err, null);
        assert(data.score >= 0.66);
        assert.deepEqual(data.data, {hello: 'world'});
        done();
      },
    });
    res.evaluate([
      { err: null, data: '{"hello":"world"}' },
      { err: null, data: '{"hello_:"world"}' },
      { err: null, data: '{"hello":"world"}' },
    ]);
  });
  it('json ignore key', (done) => {
    let res = new Response({
      dataType: 'json',
      ignoreJSONKeys: ['ignoreMe'],
      callback: (err, data) => {
        assert.equal(err, null);
        assert.equal(data.score, 1);
        assert.deepEqual(data.data, {hello: 'world'});
        done();
      },
    });
    res.evaluate([
      { err: null, data: '{"hello":"world","ignoreMe":"one"}' },
      { err: null, data: '{"hello":"world","ignoreMe":"two"}' },
      { err: null, data: '{"hello":"world","ignoreMe":"three"}' },
    ]);
  });
  it('one error', done => {
    let res = new Response({
      dataType: 'json',
      callback: (err, data) => {
        assert.equal(err, null);
        assert(data.score >= 0.66);
        assert.deepEqual(data.data, {hello: 'world'});
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
