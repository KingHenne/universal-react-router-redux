import {History} from 'history';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {RouteConfig} from 'react-router-config';

import {ConnectedRouter} from './connectedRouter';

export interface StaticRouterProps {
  children?: React.ReactNode;
  history: History;
  context: any; // tslint:disable-line no-any
  routes?: RouteConfig[];
}

export interface StaticRouterChildContext {
  router: {
    staticContext: any; // tslint:disable-line no-any
  };
}

export class StaticRouter extends React.Component<StaticRouterProps> {
  public static childContextTypes = {
    router: PropTypes.object.isRequired,
  };

  public getChildContext(): StaticRouterChildContext {
    return {
      router: {
        staticContext: this.props.context,
      },
    };
  }

  public render(): React.ReactNode {
    const {children, history, routes} = this.props;

    return (
      <ConnectedRouter history={history} routes={routes} static>
        {children}
      </ConnectedRouter>
    );
  }
}
