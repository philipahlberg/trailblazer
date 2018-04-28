/**
 * Extract the keys in a path declaration.
 * @example
 * parse('/:a/:b/:c'); // => ['a', 'b', 'c']
 *
 * @param path A path declaration
 */
export declare const parse: (path: string) => string[];
