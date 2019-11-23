import { expect } from 'chai';
import compile from '../dist/index.js';

const tests = [
  ['/', {
    sensitive: false,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         ['']],
    ['/',        ['/']],
    ['/foo',     ['/']],
    ['/foo/',    ['/']],
    ['/foo/bar', ['/']],
    ['/bar',     ['/']],
    ['/bar/',    ['/']],
    ['/bar/foo', ['/']],
    ['/FOO',     ['/']],
    ['/FOO/',    ['/']],
    ['/FOO/BAR', ['/']],
    ['/BAR',     ['/']],
    ['/BAR/',    ['/']],
    ['/BAR/FOO', ['/']],
  ]],
  ['/', {
    sensitive: true,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         ['']],
    ['/',        ['/']],
    ['/foo',     ['/']],
    ['/foo/',    ['/']],
    ['/foo/bar', ['/']],
    ['/bar',     ['/']],
    ['/bar/',    ['/']],
    ['/bar/foo', ['/']],
    ['/FOO',     ['/']],
    ['/FOO/',    ['/']],
    ['/FOO/BAR', ['/']],
    ['/BAR',     ['/']],
    ['/BAR/',    ['/']],
    ['/BAR/FOO', ['/']],
  ]],
  ['/', {
    sensitive: false,
    strict: true,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        ['/']],
    ['/foo',     ['/']],
    ['/foo/',    ['/']],
    ['/foo/bar', ['/']],
    ['/bar',     ['/']],
    ['/bar/',    ['/']],
    ['/bar/foo', ['/']],
    ['/FOO',     ['/']],
    ['/FOO/',    ['/']],
    ['/FOO/BAR', ['/']],
    ['/BAR',     ['/']],
    ['/BAR/',    ['/']],
    ['/BAR/FOO', ['/']],
  ]],
  ['/', {
    sensitive: false,
    strict: false,
    start: true,
    end: false
  }, [
    ['',         ['']],
    ['/',        ['/']],
    ['/foo',     ['/']],
    ['/foo/',    ['/']],
    ['/foo/bar', ['/']],
    ['/bar',     ['/']],
    ['/bar/',    ['/']],
    ['/bar/foo', ['/']],
    ['/FOO',     ['/']],
    ['/FOO/',    ['/']],
    ['/FOO/BAR', ['/']],
    ['/BAR',     ['/']],
    ['/BAR/',    ['/']],
    ['/BAR/FOO', ['/']],
  ]],
  ['/', {
    sensitive: false,
    strict: false,
    start: false,
    end: true
  }, [
    ['',         ['']],
    ['/',        ['/']],
    ['/foo',     ['']],
    ['/foo/',    ['/']],
    ['/foo/bar', ['']],
    ['/bar',     ['']],
    ['/bar/',    ['/']],
    ['/bar/foo', ['']],
    ['/FOO',     ['']],
    ['/FOO/',    ['/']],
    ['/FOO/BAR', ['']],
    ['/BAR',     ['']],
    ['/BAR/',    ['/']],
    ['/BAR/FOO', ['']],
  ]],
  ['/', {
    sensitive: false,
    strict: true,
    start: true,
    end: false
  }, [
    ['',         []],
    ['/',        ['/']],
    ['/foo',     ['/']],
    ['/foo/',    ['/']],
    ['/foo/bar', ['/']],
    ['/bar',     ['/']],
    ['/bar/',    ['/']],
    ['/bar/foo', ['/']],
    ['/FOO',     ['/']],
    ['/FOO/',    ['/']],
    ['/FOO/BAR', ['/']],
    ['/BAR',     ['/']],
    ['/BAR/',    ['/']],
    ['/BAR/FOO', ['/']],
  ]],
  ['/', {
    sensitive: false,
    strict: true,
    start: false,
    end: true
  }, [
    ['',         []],
    ['/',        ['/']],
    ['/foo',     []],
    ['/foo/',    ['/']],
    ['/foo/bar', []],
    ['/bar',     []],
    ['/bar/',    ['/']],
    ['/bar/foo', []],
    ['/FOO',     []],
    ['/FOO/',    ['/']],
    ['/FOO/BAR', []],
    ['/BAR',     []],
    ['/BAR/',    ['/']],
    ['/BAR/FOO', []],
  ]],
  ['/', {
    sensitive: false,
    strict: true,
    start: true,
    end: true
  }, [
    ['',         []],
    ['/',        ['/']],
    ['/foo',     []],
    ['/foo/',    []],
    ['/foo/bar', []],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     []],
    ['/FOO/',    []],
    ['/FOO/BAR', []],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []],
  ]],
  ['/foo', {
    sensitive: false,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo/']],
    ['/foo/bar', ['/foo/']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', ['/foo']],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    ['/FOO/']],
    ['/FOO/BAR', ['/FOO/']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', ['/FOO']],
  ]],
  ['/foo', {
    sensitive: true,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo/']],
    ['/foo/bar', ['/foo/']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', ['/foo']],
    ['/FOO',     []],
    ['/FOO/',    []],
    ['/FOO/BAR', []],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []],
  ]],
  ['/FOO', {
    sensitive: true,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     []],
    ['/foo/',    []],
    ['/foo/bar', []],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    ['/FOO/']],
    ['/FOO/BAR', ['/FOO/']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', ['/FOO']],
  ]],
  ['/foo', {
    sensitive: false,
    strict: true,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo']],
    ['/foo/bar', ['/foo']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', ['/foo']],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    ['/FOO']],
    ['/FOO/BAR', ['/FOO']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', ['/FOO']],
  ]],
  ['/foo', {
    sensitive: false,
    strict: false,
    start: true,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo/']],
    ['/foo/bar', ['/foo/']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    ['/FOO/']],
    ['/FOO/BAR', ['/FOO/']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []],
  ]],
  ['/foo', {
    sensitive: false,
    strict: false,
    start: false,
    end: true
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo/']],
    ['/foo/bar', []],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', ['/foo']],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    ['/FOO/']],
    ['/FOO/BAR', []],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', ['/FOO']],
  ]],
  ['/foo', {
    sensitive: true,
    strict: true,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo']],
    ['/foo/bar', ['/foo']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', ['/foo']],
    ['/FOO',     []],
    ['/FOO/',    []],
    ['/FOO/BAR', []],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []],
  ]],
  ['/foo', {
    sensitive: false,
    strict: true,
    start: true,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo']],
    ['/foo/bar', ['/foo']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    ['/FOO']],
    ['/FOO/BAR', ['/FOO']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []],
  ]],
  ['/foo', {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo/']],
    ['/foo/bar', []],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    ['/FOO/']],
    ['/FOO/BAR', []],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []],
  ]],
  ['/foo', {
    sensitive: false,
    strict: true,
    start: true,
    end: true
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    []],
    ['/foo/bar', []],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    []],
    ['/FOO/BAR', []],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []],
  ]],
  ['/foo/', {
    sensitive: false,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo']],
    ['/foo/',    ['/foo/']],
    ['/foo/bar', ['/foo/']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', ['/foo']],
    ['/FOO',     ['/FOO']],
    ['/FOO/',    ['/FOO/']],
    ['/FOO/BAR', ['/FOO/']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', ['/FOO']],
  ]],
  ['/foo/', {
    sensitive: false,
    strict: true,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     []],
    ['/foo/',    ['/foo/']],
    ['/foo/bar', ['/foo/']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     []],
    ['/FOO/',    ['/FOO/']],
    ['/FOO/BAR', ['/FOO/']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []],
  ]],
  ['/:foo', {
    sensitive: false,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo', 'foo']],
    ['/foo/',    ['/foo/', 'foo']],
    ['/foo/bar', ['/foo/', 'foo']],
    ['/bar',     ['/bar', 'bar']],
    ['/bar/',    ['/bar/', 'bar']],
    ['/bar/foo', ['/bar/', 'bar']],
    ['/FOO',     ['/FOO', 'FOO']],
    ['/FOO/',    ['/FOO/', 'FOO']],
    ['/FOO/BAR', ['/FOO/', 'FOO']],
    ['/BAR',     ['/BAR', 'BAR']],
    ['/BAR/',    ['/BAR/', 'BAR']],
    ['/BAR/FOO', ['/BAR/', 'BAR']],
  ]],
  ['/:foo', {
    sensitive: false,
    strict: true,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo', 'foo']],
    ['/foo/',    ['/foo', 'foo']],
    ['/foo/bar', ['/foo', 'foo']],
    ['/bar',     ['/bar', 'bar']],
    ['/bar/',    ['/bar', 'bar']],
    ['/bar/foo', ['/bar', 'bar']],
    ['/FOO',     ['/FOO', 'FOO']],
    ['/FOO/',    ['/FOO', 'FOO']],
    ['/FOO/BAR', ['/FOO', 'FOO']],
    ['/BAR',     ['/BAR', 'BAR']],
    ['/BAR/',    ['/BAR', 'BAR']],
    ['/BAR/FOO', ['/BAR', 'BAR']],
  ]],
  ['/:foo', {
    sensitive: false,
    strict: false,
    start: true,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo', 'foo']],
    ['/foo/',    ['/foo/', 'foo']],
    ['/foo/bar', ['/foo/', 'foo']],
    ['/bar',     ['/bar', 'bar']],
    ['/bar/',    ['/bar/', 'bar']],
    ['/bar/foo', ['/bar/', 'bar']],
    ['/FOO',     ['/FOO', 'FOO']],
    ['/FOO/',    ['/FOO/', 'FOO']],
    ['/FOO/BAR', ['/FOO/', 'FOO']],
    ['/BAR',     ['/BAR', 'BAR']],
    ['/BAR/',    ['/BAR/', 'BAR']],
    ['/BAR/FOO', ['/BAR/', 'BAR']],
  ]],
  ['/:foo', {
    sensitive: false,
    strict: false,
    start: false,
    end: true
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     ['/foo', 'foo']],
    ['/foo/',    ['/foo/', 'foo']],
    ['/foo/bar', ['/bar', 'bar']],
    ['/bar',     ['/bar', 'bar']],
    ['/bar/',    ['/bar/', 'bar']],
    ['/bar/foo', ['/foo', 'foo']],
    ['/FOO',     ['/FOO', 'FOO']],
    ['/FOO/',    ['/FOO/', 'FOO']],
    ['/FOO/BAR', ['/BAR', 'BAR']],
    ['/BAR',     ['/BAR', 'BAR']],
    ['/BAR/',    ['/BAR/', 'BAR']],
    ['/BAR/FOO', ['/FOO', 'FOO']],
  ]],  
  ['/:foo?', {
    sensitive: false,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         ['', undefined]],
    ['/',        ['/', '']],
    ['/foo',     ['/foo', 'foo']],
    ['/foo/',    ['/foo/', 'foo']],
    ['/foo/bar', ['/foo/', 'foo']],
    ['/bar',     ['/bar', 'bar']],
    ['/bar/',    ['/bar/', 'bar']],
    ['/bar/foo', ['/bar/', 'bar']],
    ['/FOO',     ['/FOO', 'FOO']],
    ['/FOO/',    ['/FOO/', 'FOO']],
    ['/FOO/BAR', ['/FOO/', 'FOO']],
    ['/BAR',     ['/BAR', 'BAR']],
    ['/BAR/',    ['/BAR/', 'BAR']],
    ['/BAR/FOO', ['/BAR/', 'BAR']],
  ]],
  ['/:foo?', {
    sensitive: false,
    strict: true,
    start: false,
    end: false
  }, [
    ['',         ['', undefined]],
    ['/',        ['/', '']],
    ['/foo',     ['/foo', 'foo']],
    ['/foo/',    ['/foo', 'foo']],
    ['/foo/bar', ['/foo', 'foo']],
    ['/bar',     ['/bar', 'bar']],
    ['/bar/',    ['/bar', 'bar']],
    ['/bar/foo', ['/bar', 'bar']],
    ['/FOO',     ['/FOO', 'FOO']],
    ['/FOO/',    ['/FOO', 'FOO']],
    ['/FOO/BAR', ['/FOO', 'FOO']],
    ['/BAR',     ['/BAR', 'BAR']],
    ['/BAR/',    ['/BAR', 'BAR']],
    ['/BAR/FOO', ['/BAR', 'BAR']],
  ]],
  ['/:foo?', {
    sensitive: false,
    strict: false,
    start: true,
    end: false
  }, [
    ['',         ['', undefined]],
    ['/',        ['/', '']],
    ['/foo',     ['/foo', 'foo']],
    ['/foo/',    ['/foo/', 'foo']],
    ['/foo/bar', ['/foo/', 'foo']],
    ['/bar',     ['/bar', 'bar']],
    ['/bar/',    ['/bar/', 'bar']],
    ['/bar/foo', ['/bar/', 'bar']],
    ['/FOO',     ['/FOO', 'FOO']],
    ['/FOO/',    ['/FOO/', 'FOO']],
    ['/FOO/BAR', ['/FOO/', 'FOO']],
    ['/BAR',     ['/BAR', 'BAR']],
    ['/BAR/',    ['/BAR/', 'BAR']],
    ['/BAR/FOO', ['/BAR/', 'BAR']],
  ]],
  ['/:foo?', {
    sensitive: false,
    strict: false,
    start: false,
    end: true
  }, [
    ['',         ['', undefined]],
    ['/',        ['/', '']],
    ['/foo',     ['/foo', 'foo']],
    ['/foo/',    ['/foo/', 'foo']],
    ['/foo/bar', ['/bar', 'bar']],
    ['/bar',     ['/bar', 'bar']],
    ['/bar/',    ['/bar/', 'bar']],
    ['/bar/foo', ['/foo', 'foo']],
    ['/FOO',     ['/FOO', 'FOO']],
    ['/FOO/',    ['/FOO/', 'FOO']],
    ['/FOO/BAR', ['/BAR', 'BAR']],
    ['/BAR',     ['/BAR', 'BAR']],
    ['/BAR/',    ['/BAR/', 'BAR']],
    ['/BAR/FOO', ['/FOO', 'FOO']],
  ]],
  ['/foo/:bar', {
    sensitive: false,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     []],
    ['/foo/',    []],
    ['/foo/bar', ['/foo/bar', 'bar']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     []],
    ['/FOO/',    []],
    ['/FOO/BAR', ['/FOO/BAR', 'BAR']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []]
  ]],
  ['/:foo/bar', {
    sensitive: false,
    strict: false,
    start: false,
    end: false
  }, [
    ['',         []],
    ['/',        []],
    ['/foo',     []],
    ['/foo/',    []],
    ['/foo/bar', ['/foo/bar', 'foo']],
    ['/bar',     []],
    ['/bar/',    []],
    ['/bar/foo', []],
    ['/FOO',     []],
    ['/FOO/',    []],
    ['/FOO/BAR', ['/FOO/BAR', 'FOO']],
    ['/BAR',     []],
    ['/BAR/',    []],
    ['/BAR/FOO', []]
  ]]
];

describe('pattern', () => {
  for (const [path, options, cases] of tests) {
    const conf = Object.entries(options)
      .filter(([_, on]) => on)
      .map(([name, _]) => name)
      .join(', ');

    const name = `${path} { ${conf} }`;

    describe(name, () => {
      const { pattern } = compile(path, options);
      for (const [input, output] of cases) {
        it(input, () => {
          expect((pattern.exec(input) || []).slice()).to.deep.equal(output);
        });
      }
    });
  }
});