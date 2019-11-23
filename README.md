# trailblazer
`trailblazer` is a minimalist regular expression-generator for paths with named parameters.
Turn a path such as `/:foo` into a regular expression and extract the keys.

## Installation
```console
npm install trailblazer
```

## API

### default(path: string, options: Options): RegExp
- Create a regular expression from `path` and extract the key names.
- Options:
  - sensitive: When `true`, the RegExp will be case sensitive. (default: `false`)
  - strict: When `true` the RegExp allows an optional trailing slash to match. (default: `false`)
  - start: When `true` the RegExp will match from the beginning of the string. (default: `true`)
  - end: When `true` the RegExp will match to the end of the string. (default: `true`)

```js
import compile from 'trailblazer';

const { keys, pattern } = compile('/foo/:bar', {
  sensitive: false,
  strict: false,
  start: true,
  end: true
});

// keys: ['bar']
// pattern: /^\/foo\/([^\/]+)\/?$/i

pattern.test('/foo/123'); // true
pattern.exec('/foo/123'); // ['/foo/123', '123']
```
