const zip = <K, V>(
  a: K[],
  b: V[]
) => (
  a.map((v, i): [K, V] => [v, b[i]])
);

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
export const map = (
  keys: string[],
  values: string[]
): Map<string, string> => (
  new Map(zip(keys, values))
);
