import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';

import {
  ReactContext as HopsReactContext,
  combineContexts,
  render,
} from 'hops-react';

import {App} from './app';
import {Context} from './context';
import reducers from './reducers';

class DomContext extends Context {
  createHistory() {
    return createBrowserHistory();
  }
}

const createContext = combineContexts(HopsReactContext, DomContext);

export default render(<App />, createContext({reducers}));
