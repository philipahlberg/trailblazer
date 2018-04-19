const MATCH_ALL = '[^/?#]*';
const CATCH_ALL = '([^/?#]+)';
// optional trailing slash
// only matches the slash if nothing follows
const MATCH_TRAILING_SLASH = '(?:[/]?(?=$))?';
// implements '**' as a wildcard
const WILDCARD_PATTERN = /\*\*/g;
// matches ':param' and captures 'param'
const PARAMETER_PATTERN = /:([^\/?#]+)/g;
const parse = (path) => {
    let keys = [];
    let match;
    while ((match = PARAMETER_PATTERN.exec(path)) != null) {
        keys.push(match[1]);
    }
    return keys;
};
const compile = (path, exact = false) => (new RegExp('^' +
    path
        // Remove hash
        .split('#')[0]
        // Remove query
        .split('?')[0]
        // Replace '**' with a matching group
        .replace(WILDCARD_PATTERN, MATCH_ALL)
        // Replace ':key' with a catching group
        .replace(PARAMETER_PATTERN, CATCH_ALL)
    // Match an optional trailing slash
    + MATCH_TRAILING_SLASH
    // If exact, only match completely
    + (exact ? '$' : ''), 'i'));
/**
 * Retrieve the values embedded in a live path.
 * @param pattern The pattern returned from `compile`
 * @param path The live path
 */
const execute = (pattern, path) => ((pattern.exec(path) || []).slice(1));
const zip = (a, b) => (a.map((v, i) => [v, b[i]]));
/**
 * Convert an array of keys and an array of values into a Map.
 * @param keys The keys returned from `parse`
 * @param values The values returned from `execute`
 */
const map = (keys, values) => (new Map(zip(keys, values)));
/**
 * Convert an array of keys and an array of values into a plain object.
 * @param keys The keys returned from `parse`
 * @param values The values returned from `execute`
 */
const object = (keys, values) => (keys.reduce((acc, key, i) => {
    acc[key] = values[i];
    return acc;
}, {}));
/**
 * Parse and compile a path to a function that extracts values from a given string.
 * @param path Any path
 * @param exact Execute on complete matches
 */
const program = (path, reducer = object, exact = false) => {
    const keys = parse(path);
    const pattern = compile(path, exact);
    return (str) => reducer(keys, execute(pattern, str));
};

export default program;
export { parse, compile, execute, map, object, program };
