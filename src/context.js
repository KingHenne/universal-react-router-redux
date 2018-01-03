import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import {Provider} from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';

import {ReactContext as HopsReactContext} from 'hops-react';
import {ReduxContext as HopsReduxContext} from 'hops-redux';

export class ReactContext extends HopsReactContext {
  enhanceElement(element) {
    return element;
  }
}

export class ReduxContext extends HopsReduxContext {
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

  enhanceElement(element) {
    return (
      <Provider store={this.getStore()}>
        <ConnectedRouter history={this.getHistory()}>{element}</ConnectedRouter>
      </Provider>
    );
  }
}
