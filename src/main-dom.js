// @flow
import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';

import {render} from 'hops-react';

import {App} from './app';
import {Context} from './context';
import reducers from './reducers';

class DomContext extends Context {
  createHistory() {
    return createBrowserHistory();
  }
}

export default render(<App />, new DomContext({reducers}));
