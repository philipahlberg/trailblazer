const WILDCARD = '/[^/]*';

const PARAMETER = '/([^/]+)';

const OPTIONAL_PARAMETER = '(?:/([^/]+?))?';

const OPTIONAL_SLASH = '(?:[/]?(?=$))?';

/**
 * Create a regular expression from `path`.
 * 
 * `exact` determines if the resulting expression should match any superset of the
 * given path or only match equal segment-length paths.
 * 
 * @example
 * // not exact
 * compile('/:foo', false).test('/bar'); // => true
 * compile('/:foo', false).test('/bar/baz'); // => true
 * // exact
 * compile('/:foo', true).test('/bar'); // => true
 * compile('/:foo', true).test('/bar/baz'); // => false
 * 
 * @param path A path declaration
 * @param exact If `true`, the resulting pattern will not match supersets.
 */
export const compile = (
  path: string,
  exact: boolean
): RegExp => {
  const segments = path.substring(1).split('/');
  let pattern = '^';
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment.startsWith(':')) {
      if (segment.endsWith('?')) {
        pattern += OPTIONAL_PARAMETER;
      } else {
        pattern += PARAMETER;
      }
    } else if (segment === '**') {
      pattern += WILDCARD;
    } else {
      pattern += '/' + segment;
    }
  }

  pattern += OPTIONAL_SLASH;

  if (exact) {
    pattern += '$';
  }

  return new RegExp(pattern, 'i');
}
