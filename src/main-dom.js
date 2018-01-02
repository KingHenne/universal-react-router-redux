import createBrowserHistory from 'history/createBrowserHistory';
import mixinable from 'mixinable';
import React from 'react';

import {ReactContext as HopsReactContext, render} from 'hops-react';

import {App} from './app';
import {Context} from './context';
import reducers from './reducers';

class DomContext extends Context {
  createHistory() {
    return createBrowserHistory();
  }
}

const combineContexts = mixinable({
  bootstrap: mixinable.async.parallel,
  // for enhanceElement use 'override' instead of the default 'compose'
  enhanceElement: mixinable.async.override,
  getMountpoint: mixinable.override,
});

const createContext = combineContexts(HopsReactContext, DomContext);

export default render(<App />, createContext({reducers}));
