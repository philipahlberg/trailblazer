# Expressionist
`expressionist` is a minimalist implementation of a subset of `path-to-regexp` in less than 600b.

## Installation
```console
npm install @philipahlberg/expressionist
```

## Usage

### expressionist(path: string, exact?: boolean): (str: string) => Map<string, string>
-  Parse and compile a path.
Returns a function that extracts values from a given string.

```js
import expressionist from '@philipahlberg/expressionist';

const fn = expressionst('/:a/:b');
const map = fn('/some/path');
map.get('a'); // => 'some'
map.get('b'); // => 'path'
```

### parse(path: string): string[]
- Extract the keys in a path declaration.
```js
import { parse } from '@philipahlberg/expressionist';

parse('/:foo/:bar'); // ['foo', 'bar']
```

### compile(path: string, exact?: boolean): RegExp
- Create a regular expression from a path with (optional) encoded parameters in it.
`exact` determines if the resulting expression should match
any superset of the given path or only match equal segment-length paths.

```js
import { compile } from '@philipahlberg/expressionist';

// not exact
compile('/:a').test('/b'); // => true
compile('/:a').test('/a/b'); // => true
// exact
compile('/:a', true).test('/a'); // => true
compile('/:a', true).test('/a/b'); // => false
```

### execute(pattern: RegExp, path: string): string[]
-  Retrieve the values embedded in a string using a
regular expression obtained from `compile`.

```js
import { compile, execute } from '@philipahlberg/expressionist';

const pattern = compile('/:a');
execute(pattern, '/value'); // => ['value']
```

### toMap(keys: string[], values: string[]): Map<string, string>
- Convert an array of keys and an array of values into a Map.

```js
import { parse, compile, execute, toMap } from '@philipahlberg/expressionist';

const keys = parse('/:a/:b');
const pattern = compile('/:a/:b');
const values = execute(pattern, '/some/path');
toMap(keys, values); // => Map {'a' => 'some', 'b' => 'path'}
```

### toObject(keys: string[], values: string[]): { [key: string]: string }
- Convert an array of keys and an array of values into a plain object.
```js
import { parse, compile, execute, toObject } from '@philipahlberg/expressionist';

const keys = parse('/:a/:b');
const pattern = compile('/:a/:b');
const values = execute(pattern, '/some/path');
toObject(keys, values); // => { a: 'some', b: 'path' }
```