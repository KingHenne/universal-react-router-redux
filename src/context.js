import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import {Provider} from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';

import {ReduxContext as HopsReduxContext} from 'hops-redux';

export class Context extends HopsReduxContext {
  constructor(options) {
    super(options);
    this.registerReducer('router', routerReducer);
  }

  createHistory() {
    return createMemoryHistory();
  }

  getHistory() {
    return this.history || (this.history = this.createHistory());
  }

  getMiddlewares() {
    return [routerMiddleware(this.getHistory())];
  }

  enhanceElement(reactElement) {
    return (
      <Provider store={this.getStore()}>
        <ConnectedRouter history={this.getHistory()}>
          {reactElement}
        </ConnectedRouter>
      </Provider>
    );
  }
}
