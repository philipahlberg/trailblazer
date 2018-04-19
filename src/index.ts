const MATCH_ALL = '[^/?#]*';

const CATCH_ALL = '([^/?#]+)';

// optional trailing slash
// only matches the slash if nothing follows
const MATCH_TRAILING_SLASH = '(?:[/]?(?=$))?';

// implements '**' as a wildcard
const WILDCARD_PATTERN = /\*\*/g;

// matches ':param' and captures 'param'
const PARAMETER_PATTERN = /:([^\/?#]+)/g;

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

export const compile = (
  path: string,
  exact: boolean = false
): RegExp => (
  new RegExp(
    '^' +
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
    + (exact ? '$' : ''),
    'i'
  )
);

/**
 * Retrieve the values embedded in a live path.
 * @param pattern The pattern returned from `compile` 
 * @param path The live path
 */
export const execute = (
  pattern: RegExp,
  path: string
): string[] => (
  (pattern.exec(path) || []).slice(1)
);

const zip = (
  a: any[],
  b: any[]
): any[2][] => (
  a.map((v, i) => [v, b[i]])
);

/**
 * Convert an array of keys and an array of values into a Map.
 * @param keys The keys returned from `parse`
 * @param values The values returned from `execute`
 */
export const map = (
  keys: string[],
  values: string[]
): Map<string,string> => (
  new Map(zip(keys, values))
);

type Dictionary<T> = { [key: string]: T };

/**
 * Convert an array of keys and an array of values into a plain object.
 * @param keys The keys returned from `parse`
 * @param values The values returned from `execute`
 */
export const object = (
  keys: string[],
  values: string[]
): Dictionary<string> => (
  keys.reduce(
    (acc, key, i) => {
      acc[key] = values[i];
      return acc;
    },
    {} as Dictionary<string>
  )
);

type Reducer = (keys: string[], values: string[]) => any;

/**
 * Parse and compile a path to a function that extracts values from a given string.
 * @param path Any path
 * @param exact Execute on complete matches
 */
export const program = (
  path: string,
  reducer: Reducer = object,
  exact: boolean = false
) => {
  const keys = parse(path);
  const pattern = compile(path, exact);
  return (str: string) => reducer(
    keys,
    execute(pattern, str)
  );
}
