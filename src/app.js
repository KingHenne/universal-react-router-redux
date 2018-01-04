import React from 'react';
import {Redirect} from 'react-router';
import {Route, Switch, Link} from 'react-router-dom';

import {Miss} from 'hops-react';

import {Home} from './home';
import {Counter} from './counter';
import {LocationInfo} from './locationInfo';

export const App = () => (
  <div>
    <nav>
      <Link to="/home">Home</Link>&nbsp;
      <Link to="/counter">Counter</Link>
    </nav>
    <LocationInfo />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/counter" component={Counter} />
      <Miss />
    </Switch>
  </div>
);
