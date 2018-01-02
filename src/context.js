// @flow
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

import {Context as HopsReduxContext} from 'hops-redux';

export class Context extends HopsReduxContext {
  createHistory() {
    return createMemoryHistory();
  }

  getHistory() {
    return this.history || (this.history = this.createHistory());
  }

  createStore() {
    return createStore(
      combineReducers({...this.reducers, router: routerReducer}),
      global['INITIAL_STATE'],
      (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
        applyMiddleware(routerMiddleware(this.getHistory())),
      ),
    );
  }

  enhanceElement(reactElement: Node) {
    return (
      <Provider store={this.getStore()}>
        <ConnectedRouter history={this.getHistory()}>
          {reactElement}
        </ConnectedRouter>
      </Provider>
    );
  }
}
