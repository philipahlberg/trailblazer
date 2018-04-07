const MATCH_ALL = '[^/?#]*';

const CATCH_ALL = '([^/?#]+)';

// optional trailing slash
// only matches the slash if nothing follows
const MATCH_TRAILING_SLASH = '(?:[/]?(?=$))?';

// implements '**' as a wildcard
const WILDCARD_PATTERN = /\*\*/g;

// matches ':param' and captures 'param'
const PARAMETER_PATTERN = /:([^\/]+)/;

export interface Compiled {
  pattern: RegExp;
  keys: string[];
}

export const compile = (
  path: string,
  exact: boolean = false
): Compiled => {
  path = (path.split("#")[0] || "").split("?")[0];
  path = path.replace(WILDCARD_PATTERN, MATCH_ALL);
  let keys: string[] = [];
  let match: RegExpExecArray | null;

  // convert :param to a catch-all group
  // and save the keys
  while ((match = PARAMETER_PATTERN.exec(path)) != null) {
    // match[0] is the entire segment, e. g. ':name'
    path = path.replace(match[0], CATCH_ALL);
    // match[1] is just the name of the parameter, e. g. 'name'
    keys.push(match[1]);
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
  };
}

export interface Executed {
  [key: string]: string;
}

type Dictionary<T> = { [key: string]: T };

export const execute = (
  compiled: Compiled,
  path: string
): Executed => {
  const values = (compiled.pattern.exec(path) || []).slice(1);
  return compiled.keys.reduce(
    (acc: Dictionary<string>, key, i) => ((acc[key] = values[i]), acc),
    {}
  );
}
