import React from 'react';

import {
  ReactContext as HopsReactContext,
  combineContexts,
  render,
} from 'hops-react';

import {App} from './app';
import {Context} from './context';
import reducers from './reducers';

const createContext = combineContexts(HopsReactContext, Context);

export default render(<App />, createContext({reducers}));
