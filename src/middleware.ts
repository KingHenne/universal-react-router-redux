import {History} from 'history';
import {Action, Middleware} from 'redux';

import {
  CALL_HISTORY_METHOD,
  RouterAction,
  UpdateLocationMethod,
} from './actions';

export type HistoryRecord = Record<
  UpdateLocationMethod,
  (...args: any[]) => void // tslint:disable-line no-any
>;

export function routerMiddleware(history: History): Middleware {
  return () => next => (action: Action | RouterAction) => {
    if (action.type !== CALL_HISTORY_METHOD) {
      return next(action);
    }

    const {method, args} = (action as RouterAction).payload;
    (history as HistoryRecord)[method](...args);

    return;
  };
}
