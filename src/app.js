import React from 'react';
import {renderRoutes} from 'react-router-config';
import {Link} from 'react-router-dom';

import {routes} from './routes';
import {LocationInfo} from './locationInfo';

export const App = () => (
  <div>
    <nav>
      <Link to="/home">Home</Link>&nbsp;
      <Link to="/counter">Counter</Link>
    </nav>
    <LocationInfo />
    {renderRoutes(routes)}
  </div>
);
