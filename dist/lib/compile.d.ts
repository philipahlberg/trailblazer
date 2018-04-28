/**
 * Create a regular expression from a path with (optional) encoded parameters in it.
 * `exact` determines if the resulting expression should match
 * any superset of the given path or only match equal segment-length paths.
 *
 * @example
 * // not exact
 * compile('/:a').test('/b'); // => true
 * compile('/:a').test('/a/b'); // => true
 * // exact
 * compile('/:a', true).test('/a'); // => true
 * compile('/:a', true).test('/a/b'); // => false
 *
 * @param path A path declaration
 * @param exact If `true`, the resulting expression will only match
 * 1:1 (instead of matching any superset of the given path).
 */
export declare const compile: (path: string, exact?: boolean) => RegExp;
