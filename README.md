# trailblazer
Paths with `/:named/:parameters` in less than 600b.

## Overview
`trailblazer` is a minimalist regular expression-generator for paths with named parameters.
Turn a path such as `/:foo` into a regular expression, extract the keys, retrieve matches from a string and combine into a `Map` or a plain object.

## Installation
```console
npm install trailblazer
```

## Usage

### parse(path: string): string[]
- Extract the keys in a path declaration.

```js
import { parse } from 'trailblazer';

parse('/:foo/:bar'); // ['foo', 'bar']
```

### compile(path: string, exact?: boolean): RegExp
- Create a regular expression from a path with (optional) encoded parameters in it.
`exact` determines if the resulting expression should match
any superset of the given path or only match equal segment-length paths.

```js
import { compile } from 'trailblazer';

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
import { compile, execute } from 'trailblazer';

const pattern = compile('/:a');
execute(pattern, '/value'); // => ['value']
```

### toMap(keys: string[], values: string[]): Map<string, string>
- Convert an array of keys and an array of values into a Map.

```js
import { parse, compile, execute, toMap } from 'trailblazer';

const keys = parse('/:a/:b');
const pattern = compile('/:a/:b');
const values = execute(pattern, '/some/path');
toMap(keys, values); // => Map {'a' => 'some', 'b' => 'path'}
```

### toObject(keys: string[], values: string[]): { [key: string]: string }
- Convert an array of keys and an array of values into a plain object.

```js
import { parse, compile, execute, toObject } from 'trailblazer';

const keys = parse('/:a/:b');
const pattern = compile('/:a/:b');
const values = execute(pattern, '/some/path');
toObject(keys, values); // => { a: 'some', b: 'path' }
```

### pipeline(path: string, exact?: boolean): (str: string) => Map<string, string>
-  Parse and compile a path.
Returns a function that extracts values from a given string.

```js
import { pipeline } from 'trailblazer';

const fn = pipeline('/:a/:b');
const map = fn('/some/path');
map.get('a'); // => 'some'
map.get('b'); // => 'path'
```