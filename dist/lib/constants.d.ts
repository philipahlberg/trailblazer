/**
 * Matches anything until the next '/', '?' or '#'.
 * Replacement for wildcards in path declarations when building a RegExp.
 */
export declare const MATCH_ALL = "[^/?#]*";
/**
 * Captures anything until the next '/', '?' or '#'.
 * Replacement for parameters in path declarations when building a RegExp.
 */
export declare const CATCH_ALL = "([^/?#]+)";
/**
 * Matches an optional trailing '/', if it is not followed by anything.
 * Appended to the end of path declarations when building a RegExp.
 *
 * Notes:
 * - Does nothing on its own
 * - Does nothing without a trailing '$'
 *
 * @example
 * const pattern = new RegExp('^/abc' + MATCH_TRAILING_SLASH + '$');
 * pattern.test('/abc'); // => true
 * pattern.test('/abc/'); // => true
 * pattern.test('/abc/def'); // => false
 *
 */
export declare const MATCH_TRAILING_SLASH = "(?:[/]?(?=$))?";
/**
 * Matches '**'.
 *
 * Determines where to swap in a match-all pattern.
 */
export declare const WILDCARD_PATTERN: RegExp;
/**
 * Matches ':param' and captures 'param'.
 *
 * Determines where to swap in a catch-all pattern, or
 * extracts parameter names from a path.
 */
export declare const PARAMETER_PATTERN: RegExp;
