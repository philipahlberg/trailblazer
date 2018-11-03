import { parse } from './parse';
import { compile } from './compile';
import { execute } from './execute';
import { toMap } from './toMap';

/**
 * Parse and compile a path.
 * Returns a function that extracts values from a given string.
 * 
 * @example
 * const fn = pipeline('/:a/:b');
 * const map = fn('/some/path');
 * map.get('a'); // => 'some'
 * map.get('b'); // => 'path'
 * 
 * @param path A path declaration
 * @param exact Execute on complete matches
 */
export const pipeline = (
  path: string,
  exact: boolean = false
) => {
  const keys = parse(path);
  const pattern = compile(path, exact);
  return (string: string) => toMap(
    keys,
    execute(pattern, string)
  );
}