import React from 'react';

import {combineContexts, render} from 'hops-react';

import {App} from './app';
import {ReactContext, ReduxContext} from './context';
import reducers from './reducers';

const createContext = combineContexts(ReactContext, ReduxContext);

export default render(<App />, createContext({reducers}));
