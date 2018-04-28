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
export declare const program: <T>(path: string, reducer: (keys: string[], values: string[]) => T, exact?: boolean) => (string: string) => T;
