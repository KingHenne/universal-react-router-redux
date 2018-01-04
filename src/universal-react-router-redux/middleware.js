import {CALL_HISTORY_METHOD} from './actions';

export function routerMiddleware(history) {
  return () => next => action => {
    if (action.type !== CALL_HISTORY_METHOD) {
      return next(action);
    }

    const {method, args} = action.payload;
    history[method](...args);
  };
}
