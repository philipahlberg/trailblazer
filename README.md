# trailblazer
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
parse('/:foo/:bar'); // ['foo', 'bar']
```

### compile(path: string, exact: boolean): RegExp
- Create a regular expression from `path`.
`exact` determines if the resulting expression should match
any superset of the given path or only match equal segment-length paths.

```js
// not exact
compile('/:foo', false).test('/bar'); // => true
compile('/:foo', false).test('/bar/baz'); // => true
// exact
compile('/:foo', true).test('/bar'); // => true
compile('/:foo', true).test('/bar/baz'); // => false
```

### execute(pattern: RegExp, path: string): string[]
-  Retrieve the values embedded in a string using a
regular expression obtained from `compile`.

```js
const pattern = compile('/:foo');
execute(pattern, '/value'); // => ['value']
```

### toMap(keys: string[], values: string[]): Map<string, string>
- Convert an array of keys and an array of values into a Map.

```js
const keys = parse('/:foo/:bar');
const pattern = compile('/:foo/:bar');
const values = execute(pattern, '/some/path');
toMap(keys, values); // => Map {'foo' => 'some', 'bar' => 'path'}
```

### toObject(keys: string[], values: string[]): { [key: string]: string }
- Convert an array of keys and an array of values into a plain object.

```js
const keys = parse('/:foo/:bar');
const pattern = compile('/:foo/:bar');
const values = execute(pattern, '/some/path');
toObject(keys, values); // => { foo: 'some', bar: 'path' }
```

### pipeline(path: string, exact: boolean): (str: string) => Map<string, string>
-  Parse and compile a path.
Returns a function that extracts values from a given string.

```js
const fn = pipeline('/:a/:b');
const map = fn('/some/path');
map.get('a'); // => 'some'
map.get('b'); // => 'path'
```