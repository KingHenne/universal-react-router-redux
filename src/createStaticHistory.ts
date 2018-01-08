import {
  Action,
  History,
  Location,
  LocationDescriptor,
  LocationDescriptorObject,
  createLocation,
  createPath,
  parsePath,
} from 'history';

export interface StaticHistoryOptions {
  location: LocationDescriptor;
  basename?: string;
  context?: {
    action?: Action;
    location?: Location;
    url?: string;
  };
}

function normalizeLocation({
  pathname = '/',
  search = '',
  hash = '',
}: LocationDescriptorObject): LocationDescriptorObject {
  return {
    pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash,
  };
}

function addLeadingSlash(pathname: string): string {
  return pathname.charAt(0) === '/' ? pathname : '/' + pathname;
}

function addBasename(
  basename: string | undefined,
  location: Location,
): Location {
  if (!basename) {
    return location;
  }

  return {
    ...location,
    pathname: addLeadingSlash(basename) + location.pathname,
  };
}

function stripBasename(
  basename: string | undefined,
  location: Location,
): Location {
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

function createNormalizedLocation(location: LocationDescriptor): Location {
  return typeof location === 'string'
    ? parsePath(location)
    : createLocation(normalizeLocation(location));
}

function createURL(location: LocationDescriptor): string {
  return typeof location === 'string' ? location : createPath(location);
}

function noop(): void {} // tslint:disable-line no-empty

export function createStaticHistory({
  location: initialLocation,
  basename = '',
  context = {},
}: StaticHistoryOptions): History {
  const createHref = (location: LocationDescriptor) =>
    addLeadingSlash(basename + createURL(location));

  const handleNewLocation = (
    location: LocationDescriptor,
    action: 'PUSH' | 'REPLACE',
  ) => {
    context.action = action;
    context.location = addBasename(
      basename,
      createNormalizedLocation(location),
    );
    context.url = createURL(context.location);
  };

  const handlePush = (location: LocationDescriptor) => {
    handleNewLocation(location, 'PUSH');
  };

  const handleReplace = (location: LocationDescriptor) => {
    handleNewLocation(location, 'REPLACE');
  };

  return {
    createHref,
    action: 'POP',
    location: stripBasename(
      basename,
      createNormalizedLocation(initialLocation),
    ),
    push: handlePush,
    replace: handleReplace,
    go: noop,
    goBack: noop,
    goForward: noop,
    listen: () => noop,
    block: () => noop,
    length: 1,
  };
}
