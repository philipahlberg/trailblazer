const PARAMETER = '/([^/]+)';
const OPTIONAL = '(?:/([^/]*))?';
const WILDCARD = '/[^/]*';

const SLASH = 47;
const COLON = 58;
const QUESTION_MARK = 63;

/**
 * - `sensitive`: When `true`, the `RegExp` will be case sensitive.
 *    - Default: `false`
 * 
 * - `strict`: When `true` the `RegExp` allows an optional trailing slash to match.
 *    - Default: `false`
 * 
 * - `start`: When `true` the `RegExp` will match from the beginning of the string.
 *    - Default: `true`
 * 
 * - `end`: When `true` the `RegExp` will match to the end of the string.
 *    - Default: `true`
 */
export type Options = {
  sensitive?: boolean;
  strict?: boolean;
  start?: boolean;
  end?: boolean;
};

/**
 * - `pattern` is a RegExp that can be used to test path matches.
 * - `keys` is an array of the key names in the original path.
 */
export type Compile = {
  pattern: RegExp;
  keys: string[];
};

/**
 * Create a regular expression from `path` and extract the key names.
 * 
 * @example
 * import compile from 'trailblazer';
 * 
 * const path = '/foo/:bar';
 * 
 * const options = {
 *    sensitive: false,
 *    strict: false,
 *    start: true,
 *    end: true
 * };
 * 
 * const result = compile(path, options);
 * 
 * console.log(result.keys); // ['bar']
 * console.log(result.pattern); // /^\/foo\/([^\/]+)\/?$/i
 * 
 * result.pattern.test('/foo/123'); // true
 * result.pattern.exec('/foo/123'); // ['/foo/123', '123']
 * 
 * 
 * @param path A path declaration
 * @param options An options object
 */
export default (path: string, options: Options): Compile => {
  const {
    sensitive = false,
    strict = false,
    start = true,
    end = true
  } = options;
  const keys = [];
  const segments = path.split('/').slice(1);
  let pattern = start ? '^' : '';
  for (const segment of segments) {
    if (segment.charCodeAt(0) === COLON) {
      if (segment.charCodeAt(segment.length - 1) === QUESTION_MARK) {
        keys.push(segment.substring(1, segment.length - 1));
        pattern += OPTIONAL;
      } else {
        keys.push(segment.substring(1, segment.length));
        pattern += PARAMETER;
      }
    } else if (segment === '*') {
      pattern += WILDCARD;
    } else {
      pattern += '/' + segment;
    }
  }

  if (!strict) {
    if (path.charCodeAt(path.length - 1) === SLASH) {
      pattern = pattern.substring(0, pattern.length - 1);
    }
    pattern += '/?';
  }

  if (end) {
    pattern += '$';
  }

  return {
    pattern: new RegExp(pattern, sensitive ? '' : 'i'),
    keys
  };
};
