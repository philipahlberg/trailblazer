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
export declare const execute: (pattern: RegExp, path: string) => string[];
