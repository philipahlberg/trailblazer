import { strict as assert } from 'assert';
import { compile } from '../dist/index.js';

describe('compile', () => {
  describe('loose', () => {
    it('matches a simple path', () => {
      const pattern = compile('/abc', false);
      assert.equal(pattern.test('/abc'), true);
      assert.equal(pattern.test('/def'), false);
      assert.equal(pattern.test('/abc/def'), true);
    });

    it('matches parameters', () => {
      const pattern = compile('/:a/:b/:c', false);
      assert.equal(pattern.test('/1'), false);
      assert.equal(pattern.test('/1/2'), false);
      assert.equal(pattern.test('/1/2/3'), true);
      assert.equal(pattern.test('/1/2/3/4'), true);
    });

    it('matches optional parameters', () => {
      const pattern = compile('/:a/:b?');
      assert.equal(pattern.test('/'), false);
      assert.equal(pattern.test('/1'), true);
      assert.equal(pattern.test('/1/2'), true);
    });

    it('matches a wildcard', () => {
      const pattern = compile('/abc/**', false);
      assert.equal(pattern.test('/abc'), false);
      assert.equal(pattern.test('/abc/def'), true);
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
      assert.equal(pattern.test('/1'), false);
      assert.equal(pattern.test('/1/2'), false);
      assert.equal(pattern.test('/1/2/3'), true);
      assert.equal(pattern.test('/1/2/3/4'), false);
    });

    it('matches optional parameters', () => {
      const pattern = compile('/:a/:b?', true);
      assert.equal(pattern.test('/'), false);
      assert.equal(pattern.test('/1'), true);
      assert.equal(pattern.test('/1/2'), true);
      assert.equal(pattern.test('/1/2/3'), false);
    });

    it('matches a wildcard', () => {
      const pattern = compile('/abc/**', true);
      assert.equal(pattern.test('/abc'), false);
      assert.equal(pattern.test('/abc/def'), true);
    });
  });
});