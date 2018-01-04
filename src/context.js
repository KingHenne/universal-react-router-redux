import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import {Provider} from 'react-redux';
import {routerMiddleware} from 'react-router-redux';

import {ReactContext as HopsReactContext} from 'hops-react';
import {ReduxContext as HopsReduxContext} from 'hops-redux';

import {routes} from './routes';
import {ConnectedRouter, routerReducer} from './universal-react-router-redux';

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
        <ConnectedRouter history={this.getHistory()} routes={routes}>
          {element}
        </ConnectedRouter>
      </Provider>
    );
  }
}
