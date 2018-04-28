/**
 * Matches anything until the next '/', '?' or '#'.
 * Replacement for wildcards in path declarations when building a RegExp.
 */
const MATCH_ALL = '[^/?#]*';
/**
 * Captures anything until the next '/', '?' or '#'.
 * Replacement for parameters in path declarations when building a RegExp.
 */
const CATCH_ALL = '([^/?#]+)';
/**
 * Matches an optional trailing '/', if it is not followed by anything.
 * Appended to the end of path declarations when building a RegExp.
 *
 * Notes:
 * - Does nothing on its own
 * - Does nothing without a trailing '$'
 *
 * @example
 * const pattern = new RegExp('^/abc' + MATCH_TRAILING_SLASH + '$');
 * pattern.test('/abc'); // => true
 * pattern.test('/abc/'); // => true
 * pattern.test('/abc/def'); // => false
 *
 */
const MATCH_TRAILING_SLASH = '(?:[/]?(?=$))?';
/**
 * Matches an optional query string.
 */
const MATCH_TRAILING_QUERY = '(?:\\?.*)?';
/**
 * Matches an optional hash string.
 */
const MATCH_TRAILING_HASH = '(?:#.*)?';
/**
 * Matches '**'.
 *
 * Determines where to swap in a match-all pattern.
 */
const WILDCARD_PATTERN = /\*\*/g;
/**
 * Matches ':param' and captures 'param'.
 *
 * Determines where to swap in a catch-all pattern, or
 * extracts parameter names from a path.
 */
const PARAMETER_PATTERN = /:([^\/?#]+)/g;

/**
 * Extract the keys in a path declaration.
 * @example
 * parse('/:a/:b/:c'); // => ['a', 'b', 'c']
 *
 * @param path A path declaration
 */
const parse = (path) => {
    let keys = [];
    let match;
    while ((match = PARAMETER_PATTERN.exec(path)) != null) {
        keys.push(match[1]);
    }
    return keys;
};

/**
 * Create a regular expression from a path with (optional) encoded parameters in it.
 * `exact` determines if the resulting expression should match
 * any superset of the given path or only match equal segment-length paths.
 *
 * @example
 * // not exact
 * compile('/:a').test('/b'); // => true
 * compile('/:a').test('/a/b'); // => true
 * // exact
 * compile('/:a', true).test('/a'); // => true
 * compile('/:a', true).test('/a/b'); // => false
 *
 * @param path A path declaration
 * @param exact If `true`, the resulting expression will only match
 * 1:1 (instead of matching any superset of the given path).
 */
const compile = (path, exact = false) => (new RegExp('^' +
    path
        // Replace '**' with a matching group
        .replace(WILDCARD_PATTERN, MATCH_ALL)
        // Replace ':key' with a catching group
        .replace(PARAMETER_PATTERN, CATCH_ALL)
    // Match an optional trailing slash
    + MATCH_TRAILING_SLASH
    // If exact, only match completely
    + (exact
        ? MATCH_TRAILING_QUERY + MATCH_TRAILING_HASH + '$'
        : ''), 'i'));

/**
 * Retrieve the values embedded in a string using a
 * regular expression obtained from `compile`.
 *
 * @example
 * const pattern = compile('/:a');
 * execute(pattern, '/value'); // => ['value']
 *
 * @param pattern The pattern returned from `compile`
 * @param path The live path
 */
const execute = (pattern, path) => ((pattern.exec(path) || []).slice(1));

const zip = (a, b) => (a.map((v, i) => [v, b[i]]));
/**
 * Convert an array of keys and an array of values into a Map.
 *
 * @example
 * const keys = parse('/:a/:b');
 * const pattern = compile('/:a/:b');
 * const values = execute(pattern, '/some/path');
 * map(keys, values); // => Map {'a' => 'some', 'b' => 'path'}
 *
 * @param keys The keys returned from `parse`
 * @param values The values returned from `execute`
 */
const map = (keys, values) => (new Map(zip(keys, values)));

/**
 * Convert an array of keys and an array of values into a plain object.
 * @example
 * const keys = parse('/:a/:b');
 * const pattern = compile('/:a/:b');
 * const values = execute(pattern, '/some/path');
 * object(keys, values); // => { a: 'some', b: 'path' }
 *
 * @param keys The keys returned from `parse`
 * @param values The values returned from `execute`
 */
const object = (keys, values) => (keys.reduce((acc, key, i) => {
    acc[key] = values[i];
    return acc;
}, {}));

/**
 * Parse and compile a path to a function that extracts values from a given string.
 *
 * @example
 * import { object, map } from 'expressionist';
 *
 * const toObject = program('/:a/:b', object);
 * toObject('/some/path'); // => { a: 'some', b: 'path' }
 *
 * const toMap = program('/:a/:b', map);
 * toMap('/some/path'); // => Map {'a' => 'some', 'b' => 'path'}
 *
 * @param path A path declaration
 * @param exact Execute on complete matches
 */
const program = (path, reducer, exact = false) => {
    const keys = parse(path);
    const pattern = compile(path, exact);
    return (string) => reducer(keys, execute(pattern, string));
};

export { parse, compile, execute, map, object, program };
