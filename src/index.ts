const MATCH_ALL = '[^/]*';

const CATCH_ALL = '([^/]+)';

// matches ':param' and captures 'param'
const PARAMETER_PATTERN = /:([^\/]+)/;

// optional trailing slash
// only matches the slash if nothing follows
const MATCH_TRAILING_SLASH = '(?:[\/]?(?=$))?';

// implements '**' as a wildcard
const WILDCARD_PATTERN = /\*\*/g;

export interface Compiled {
  pattern: RegExp;
  keys: string[];
}

export function compile (
  path: string,
  exact: boolean = false
): Compiled {
  path = (path.split('#')[0] || '').split('?')[0];
  path = path.replace(WILDCARD_PATTERN, MATCH_ALL);
  let keys: string[] = [];

  // convert :param to a catch-all group
  // and save the keys
  while (PARAMETER_PATTERN.test(path)) {
    const match = PARAMETER_PATTERN.exec(path);
    // match[0] is the entire declaration, e. g. ':param'
    path = path.replace(match![0], CATCH_ALL);
    // match[1] is the name of the parameter, e. g. 'param'
    keys.push(match![1]);
  }

  if (!/\/?/.test(path)) {
    path += MATCH_TRAILING_SLASH;
  }

  path = '^' + path;
  if (exact) {
    path += '$';
  }

  const pattern = new RegExp(path, 'i');
  return {
    pattern,
    keys
  }
}

export interface Executed {
  [key: string]: string;
}

export function execute (
  compiled: Compiled,
  path: string
): Executed {
  const pattern = compiled.pattern;
  const keys = compiled.keys;
  const values = (pattern.exec(path) || []).slice(1);
  return keys.reduce((acc: { [key: string]: string }, key, i) => {
    acc[key] = values[i];
    return acc;
  }, {});
}