import {Location} from 'history';
import {match as Match} from 'react-router';
import {Action} from 'redux';

import {LOCATION_CHANGE, LocationChangeAction} from './actions';

export interface RouterState<Params = Record<string, string>> {
  location: Location;
  match?: Match<Params>;
}

export function routerReducer(
  state: RouterState | null = null,
  action: Action | LocationChangeAction,
): RouterState | null {
  if (action.type === LOCATION_CHANGE) {
    return (action as LocationChangeAction).payload;
  }

  return state;
}
