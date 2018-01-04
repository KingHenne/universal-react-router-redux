import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';

import config from 'hops-config';
import {combineContexts, render} from 'hops-react';

import {App} from './app';
import {ReactContext, ReduxContext} from './context';
import reducers from './reducers';

class DomReduxContext extends ReduxContext {
  createHistory() {
    return createBrowserHistory({basename: config.basePath});
  }
}

const createContext = combineContexts(ReactContext, DomReduxContext);

export default render(<App />, createContext({reducers}));
