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
export declare const map: (keys: string[], values: string[]) => Map<string, string>;
