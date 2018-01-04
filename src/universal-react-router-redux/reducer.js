import {LOCATION_CHANGE} from './actions';

export function routerReducer(state = null, action) {
  if (action.type === LOCATION_CHANGE) {
    return action.payload;
  }

  return state;
}
