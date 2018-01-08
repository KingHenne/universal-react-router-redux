import {History, Location, UnregisterCallback} from 'history';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Router, match as Match} from 'react-router';
import {RouteConfig, matchRoutes} from 'react-router-config';
import {Store} from 'redux';

import {locationChange} from './actions';

export interface ConnectedRouterProps {
  children?: React.ReactNode;
  history: History;
  routes?: RouteConfig[];
  static?: boolean;
}

export class ConnectedRouter extends React.Component<ConnectedRouterProps> {
  public static contextTypes = {store: PropTypes.object};
  public context: {store: Store<any>}; // tslint:disable-line no-any

  private unsubscribeFromHistory: UnregisterCallback;

  public constructor(props: ConnectedRouterProps) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  public componentWillMount(): void {
    const {history} = this.props;
    if (!this.props.static) {
      this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    }
    this.handleLocationChange(history.location);
  }

  public componentWillUnmount(): void {
    if (this.unsubscribeFromHistory) {
      this.unsubscribeFromHistory();
    }
  }

  public render(): React.ReactNode {
    const {children, history} = this.props;

    return <Router history={history}>{children}</Router>;
  }

  private handleLocationChange(location: Location): void {
    const match = this.findMatch(location);
    this.context.store.dispatch(locationChange(location, match));
  }

  // tslint:disable-next-line no-any
  private findMatch(location: Location): Match<any> | undefined {
    if (!this.props.routes) {
      return undefined;
    }

    const matchedRoutes = matchRoutes(this.props.routes, location.pathname);
    const matchedRoute = matchedRoutes.find(route => route.match.isExact);

    return matchedRoute && matchedRoute.match;
  }
}
