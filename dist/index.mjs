/**
 * The following three expressions are strings because they are used
 * as segments in paths, not as individual expressions.
 */
// replaces wildcards
const MATCH_ALL = '[^/?#]*';
// replaces parameters
const CATCH_ALL = '([^/?#]+)';
// only matches the slash if nothing follows
// (i. e. optional trailing slash)
// appended to the end of the expression
const MATCH_TRAILING_SLASH = '(?:[/]?(?=$))?';
/**
 * The following two expressions are RegExp instances because they are used
 * to find expressions that should be replaced.
 */
// matches '**'
const WILDCARD_PATTERN = /\*\*/g;
// matches ':param' and captures 'param'
const PARAMETER_PATTERN = /:([^\/?#]+)/g;
/**
 * Extract the keys in a path declaration.
 * @example
 * parse('/:a/:b/:c'); // => ['a', 'b', 'c']
 *
 * @param path The path declaration
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
 * Create a regular expression from a path with (optional) encoded parameter keys in it.
 * `exact` determines if the resulting expression should match
 * any superset of the given path or only match equal segment-length paths.
 *
 * @example
 * compile('/:a').test('/a'); // => true
 * compile('/:a').test('/a/b'); // => true
 * compile(':a', true).test('/a'); // => true
 * compile(':a', true).test('/a/b'); // => false
 *
 * @param path The path declaration
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
    + (exact ? '$' : ''), 'i'));
/**
 * Retrieve the values embedded in a string using a compiled regular expression.
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
 * @example
 * import { object, map } from 'expressionist';
 *
 * const toObject = program('/:a/:b', object);
 * toObject('/some/path'); // => { a: 'some', b: 'path' }
 *
 * const toMap = program('/:a/:b', map);
 * toMap('/some/path'); // => Map {'a' => 'some', 'b' => 'path'}
 *
 * @param path Any path
 * @param exact Execute on complete matches
 */
const program = (path, reducer = object, exact = false) => {
    const keys = parse(path);
    const pattern = compile(path, exact);
    return (string) => reducer(keys, execute(pattern, string));
};

export { parse, compile, execute, map, object, program };
