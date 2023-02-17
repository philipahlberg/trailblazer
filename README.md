# trailblazer
`trailblazer` is a minimalist regular expression-generator for paths with named parameters.
Turn a path such as `/:foo/:bar?` into a regular expression and extract the keys.

## Installation
```console
npm install trailblazer
```

## API
### Function `compile`
```ts
export const compile = (path: string, options: Options) => Compile;
```

- Create a regular expression from `path` and extract the key names.

```js
import { compile } from 'trailblazer';

const path = '/foo/:bar';

const options = {
   sensitive: false,
   strict: false,
   start: true,
   end: true
};

const result = compile(path, options);

console.log(result.keys); // ['bar']
console.log(result.pattern); // /^\/foo\/([^\/]+)\/?$/i

result.pattern.test('/foo/123'); // true
result.pattern.exec('/foo/123'); // ['/foo/123', '123']
```

### Type `Options`
```ts
type Options = {
    sensitive?: boolean;
    strict?: boolean;
    start?: boolean;
    end?: boolean;
}
```

- `sensitive`: When `true`, the `RegExp` will be case sensitive.
   - Default: `false`

- `strict`: When `true`, the `RegExp` allows an optional trailing slash to match.
   - Default: `false`

- `start`: When `true`, the `RegExp` will match from the beginning of the string.
   - Default: `true`

- `end`: When `true`, the `RegExp` will match to the end of the string.
   - Default: `true`

### Type `Compile`
```ts
type Compile = {
    pattern: RegExp;
    keys: string[];
}
```

- `pattern`: The `RegExp` created for the input path.
- `keys`: An array of key names extracted from the input path.
