import {createPath, parsePath} from 'history';

function normalizeLocation({pathname = '/', search = '', hash = ''}) {
  return {
    pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash,
  };
}

function addLeadingSlash(pathname) {
  return pathname.charAt(0) === '/' ? pathname : '/' + pathname;
}

function addBasename(basename, location) {
  if (!basename) {
    return location;
  }

  return {
    ...location,
    pathname: addLeadingSlash(basename) + location.pathname,
  };
}

function stripBasename(basename, location) {
  if (!basename) {
    return location;
  }

  const base = addLeadingSlash(basename);

  if (location.pathname.indexOf(base) !== 0) {
    return location;
  }

  return {
    ...location,
    pathname: location.pathname.substr(base.length),
  };
}

function createLocation(location) {
  return typeof location === 'string'
    ? parsePath(location)
    : normalizeLocation(location);
}

function createURL(location) {
  return typeof location === 'string' ? location : createPath(location);
}

function noop() {}

export function createStaticHistory({basename, context = {}, location}) {
  const createHref = path => addLeadingSlash(basename + createURL(path));

  const handlePush = newLocation => {
    context.action = 'PUSH';
    context.location = addBasename(basename, createLocation(newLocation));
    context.url = createURL(context.location);
  };

  const handleReplace = newLocation => {
    context.action = 'REPLACE';
    context.location = addBasename(basename, createLocation(newLocation));
    context.url = createURL(context.location);
  };

  const history = {
    createHref: createHref,
    action: 'POP',
    location: stripBasename(basename, createLocation(location)),
    push: handlePush,
    replace: handleReplace,
    go: noop,
    goBack: noop,
    goForward: noop,
    listen: () => noop,
    block: () => noop,
  };

  return history;
}
