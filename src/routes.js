import React from 'react';
import {Redirect} from 'react-router';

import {Miss} from 'hops-react';

import {Home} from './home';
import {Counter} from './counter';

export const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/counter',
    component: Counter,
  },
  {
    component: Miss,
  },
];
