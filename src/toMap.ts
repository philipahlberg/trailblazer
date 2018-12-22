/**
 * Convert an array of keys and an array of values into a Map.
 * 
 * @example
 * const keys = parse('/:a/:b');
 * const pattern = compile('/:a/:b');
 * const values = execute(pattern, '/some/path');
 * toMap(keys, values); // => Map {'a' => 'some', 'b' => 'path'}
 * 
 * @param keys The keys returned from `parse`
 * @param values The values returned from `execute`
 */
export const toMap = (
  keys: string[],
  values: string[]
): Map<string, string> => {
  const map = new Map<string, string>();
  for (let i = 0; i < keys.length; i++) {
    map.set(keys[i], values[i]);
  }
  return map;
}
