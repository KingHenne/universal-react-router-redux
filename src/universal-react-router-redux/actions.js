import {LOCATION_CHANGE} from 'react-router-redux';

export function locationChange(location, match) {
  return {
    type: LOCATION_CHANGE,
    payload: {location, match},
  };
}
