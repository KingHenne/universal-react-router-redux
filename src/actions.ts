import {Location, LocationDescriptorObject, LocationState, Path} from 'history';
import {match as Match} from 'react-router';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

export interface LocationChangeAction {
  type: typeof LOCATION_CHANGE;
  payload: {
    location: Location;
    match?: Match<any>; // tslint:disable-line no-any
  };
}

export type UpdateLocationMethod =
  | 'push'
  | 'replace'
  | 'go'
  | 'goBack'
  | 'goForward';

// tslint:disable-next-line no-any
export interface RouterAction<Method = UpdateLocationMethod, Args = any[]> {
  type: typeof CALL_HISTORY_METHOD;
  payload: {
    method: Method;
    args: Args;
  };
}

export interface UpdateLocationActionCreator<
  Method extends 'push' | 'replace'
> {
  (path: Path): RouterAction<Method, [Path]>;
  (path: Path, state: LocationState): RouterAction<
    Method,
    [Path, LocationState]
  >;
  (location: LocationDescriptorObject): RouterAction<
    Method,
    [LocationDescriptorObject]
  >;
}

export function locationChange(
  location: Location,
  match?: Match<any>, // tslint:disable-line no-any
): LocationChangeAction {
  return {
    type: LOCATION_CHANGE,
    payload: {location, match},
  };
}

function updateLocation(method: 'push'): UpdateLocationActionCreator<'push'>;

function updateLocation(
  method: 'replace',
): UpdateLocationActionCreator<'replace'>;

function updateLocation(
  method: 'go',
): (n: number) => RouterAction<'go', [number]>;

function updateLocation(
  method: 'goBack',
): () => RouterAction<'goBack', undefined[]>;

function updateLocation(
  method: 'goForward',
): () => RouterAction<'goForward', undefined[]>;

function updateLocation<Method extends UpdateLocationMethod>(
  method: Method,
  // tslint:disable-next-line no-any
): (...args: any[]) => RouterAction<Method> {
  // tslint:disable-next-line no-any
  return (...args: any[]) => ({
    type: CALL_HISTORY_METHOD,
    payload: {method, args},
  });
}

export const push = updateLocation('push');
export const replace = updateLocation('replace');
export const go = updateLocation('go');
export const goBack = updateLocation('goBack');
export const goForward = updateLocation('goForward');

export const routerActions = {push, replace, go, goBack, goForward};
