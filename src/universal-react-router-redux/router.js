import * as PropTypes from 'prop-types';
import React from 'react';
import {Router} from 'react-router';
import {matchRoutes} from 'react-router-config';

import {locationChange} from './actions';

export class ConnectedRouter extends React.Component {
  static contextTypes = {store: PropTypes.object};

  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentWillMount() {
    const {history} = this.props;
    this.handleLocationChange(history.location);
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) {
      this.unsubscribeFromHistory();
    }
  }

  render() {
    const {routes, ...routerProps} = this.props;
    return <Router {...routerProps} />;
  }

  handleLocationChange(location) {
    const matchedRoutes = matchRoutes(this.props.routes, location.pathname);
    const matchedRoute = matchedRoutes.find(route => route.match.isExact);
    const match = matchedRoute && matchedRoute.match;

    this.context.store.dispatch(locationChange(location, match));
  }
}
