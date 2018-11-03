import { strict as assert } from 'assert';
import { compile } from '../dist/index.js';

describe('compile', () => {
  describe('loose', () => {
    it('matches a simple path', () => {
      const pattern = compile('/abc');
      assert.equal(pattern.test('/abc'), true);
      assert.equal(pattern.test('/def'), false);
      assert.equal(pattern.test('/abc/def'), true);
    });

    it('matches parameters', () => {
      const pattern = compile('/:a/:b/:c');
      assert.equal(pattern.test('/1/2/3/4'), true);
      assert.equal(pattern.test('/1/2/3'), true);
      assert.equal(pattern.test('/1/2'), false);
      assert.equal(pattern.test('/1'), false);
    });

    it('ignores query', () => {
      const pattern = compile('/abc');
      assert.equal(pattern.test('/abc?q=123'), true);
      assert.equal(pattern.test('/def?q=123'), false);
      assert.equal(pattern.test('/abc/def?q=123'), true);
    });
  
    it('ignores hash', () => {
      const pattern = compile('/abc');
      assert.equal(pattern.test('/abc#hash'), true);
      assert.equal(pattern.test('/def#hash'), false);
      assert.equal(pattern.test('/abc/def#hash'), true);
    });
  
    it('ignores query and hash', () => {
      const pattern = compile('/abc');
      assert.equal(pattern.test('/abc?q=123#hash'), true);
      assert.equal(pattern.test('/def?q=123#hash'), false);
      assert.equal(pattern.test('/abc/def?q=123#hash'), true);
    });
  });

  describe('exact', () => {
    it('matches a simple path', () => {
      const pattern = compile('/abc', true);
      assert.equal(pattern.test('/abc'), true);
      assert.equal(pattern.test('/def'), false);
      assert.equal(pattern.test('/abc/def'), false);
    });

    it('matches parameters', () => {
      const pattern = compile('/:a/:b/:c', true);
      assert.equal(pattern.test('/1/2/3/4'), false);
      assert.equal(pattern.test('/1/2/3'), true);
      assert.equal(pattern.test('/1/2'), false);
      assert.equal(pattern.test('/1'), false);
    });

    it('ignores query', () => {
      const pattern = compile('/abc', true);
      assert.equal(pattern.test('/abc?q=123'), true);
      assert.equal(pattern.test('/def?q=123'), false);
      assert.equal(pattern.test('/abc/def?q=123'), false);
    });
  
    it('ignores hash', () => {
      const pattern = compile('/abc', true);
      assert.equal(pattern.test('/abc#hash'), true);
      assert.equal(pattern.test('/def#hash'), false);
      assert.equal(pattern.test('/abc/def#hash'), false);
    });
  
    it('ignores both query and hash', () => {
      const pattern = compile('/abc', true);
      assert.equal(pattern.test('/abc?q=123#hash'), true);
      assert.equal(pattern.test('/def?q=123#hash'), false);
      assert.equal(pattern.test('/abc/def?q=123#hash'), false);
    });
  });
});