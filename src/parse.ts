import { PARAMETER_PATTERN } from './constants';

/**
 * Extract the keys in a path declaration.
 * 
 * @example
 * parse('/:a/:b/:c'); // => ['a', 'b', 'c']
 * 
 * @param path A path declaration
 */
export const parse = (
  path: string
): string[] => {
  let keys: string[] = [];
  let match;
  while ((match = PARAMETER_PATTERN.exec(path)) != null) {
    keys.push(match[1]);
  }
  return keys;
}
