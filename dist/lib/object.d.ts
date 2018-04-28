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
