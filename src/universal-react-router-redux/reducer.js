import {LOCATION_CHANGE} from 'react-router-redux';

export function routerReducer(state = null, action) {
  if (action.type === LOCATION_CHANGE) {
    return action.payload;
  }

  return state;
}
