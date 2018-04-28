import { parse } from './parse';
import { compile } from './compile';
import { execute } from './execute';

type Reducer<T> = (keys: string[], values: string[]) => T;
type Executable<T> = (string: string) => T;

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
export const program = <T>(
  path: string,
  reducer: Reducer<T>,
  exact: boolean = false
): Executable<T> => {
  const keys = parse(path);
  const pattern = compile(path, exact);
  return (string: string) => reducer(
    keys,
    execute(pattern, string)
  );
}
