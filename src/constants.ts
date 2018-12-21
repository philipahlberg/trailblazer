/**
 * Matches '**'.
 * Determines where to swap in a match-all pattern.
 */
export const FIND_WILDCARD = /\*\*/g;

/**
 * Matches ':param' and captures 'param'.
 * Determines where to swap in a catch-all pattern, or
 * extracts parameter names from a path.
 */
export const FIND_PARAMETER = /:([^\/?#]+)/g;

/**
 * Matches anything until the next '/', '?' or '#'.
 * Replacement for wildcards in path declarations when building a RegExp.
 */
export const REPLACE_WILDCARD = '[^/?#]*';

/**
 * Captures anything until the next '/', '?' or '#'.
 * Replacement for parameters in path declarations when building a RegExp.
 */
export const REPLACE_PARAMETER = '([^/?#]+)';

/**
 * Matches an optional trailing '/', if it is not followed by anything.
 * Appended to the end of path declarations when building a RegExp.
 */
export const MATCH_TRAILING_SLASH = '(?:[/]?(?=$))?';

/**
 * Matches an optional query string.
 */
export const MATCH_TRAILING_QUERY = '(?:\\?.*)?';

/**
 * Matches an optional hash string.
 */
export const MATCH_TRAILING_HASH = '(?:#.*)?';