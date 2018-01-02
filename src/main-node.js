// @flow
import React from 'react';

import {render} from 'hops-react';

import {App} from './app';
import {Context} from './context';
import reducers from './reducers';

export default render(<App />, new Context({reducers}));
