/**
 * Extract the keys in a path declaration.
 * @example
 * parse('/:a/:b/:c'); // => ['a', 'b', 'c']
 *
 * @param path A path declaration
 */
export declare const parse: (path: string) => string[];
/**
 * Create a regular expression from a path with (optional) encoded parameter keys in it.
 * `exact` determines if the resulting expression should match
 * any superset of the given path or only match equal segment-length paths.
 *
 * @example
 * compile('/:a').test('/b'); // => true
 * compile('/:a').test('/a/b'); // => true
 * compile('/:a', true).test('/a'); // => true
 * compile('/:a', true).test('/a/b'); // => false
 *
 * @param path A path declaration
 * @param exact If `true`, the resulting expression will only match
 * 1:1 (instead of matching any superset of the given path).
 */
export declare const compile: (path: string, exact?: boolean) => RegExp;
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
export declare const execute: (pattern: RegExp, path: string) => string[];
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
export declare const map: (keys: string[], values: string[]) => Map<string, string>;
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
export declare const object: (keys: string[], values: string[]) => {
    [key: string]: string;
};
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
 * @param path A path declaration
 * @param exact Execute on complete matches
 */
export declare const program: <T>(path: string, reducer: (keys: string[], values: string[]) => T, exact?: boolean) => (string: string) => T;
