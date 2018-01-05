import PropTypes from 'prop-types';
import React from 'react';
import {Router} from 'react-router';
import {matchRoutes} from 'react-router-config';

import {locationChange} from './actions';

export class ConnectedRouter extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object),
    static: PropTypes.bool,
  };

  static contextTypes = {store: PropTypes.object};

  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentWillMount() {
    const {history} = this.props;
    if (!this.props.static) {
      this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    }
    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) {
      this.unsubscribeFromHistory();
    }
  }

  render() {
    const {children, history} = this.props;
    return <Router history={history}>{children}</Router>;
  }

  handleLocationChange(location) {
    const match = this.findMatch(location);
    this.context.store.dispatch(locationChange(location, match));
  }

  findMatch(location) {
    if (!this.props.routes) {
      return undefined;
    }

    const matchedRoutes = matchRoutes(this.props.routes, location.pathname);
    const matchedRoute = matchedRoutes.find(route => route.match.isExact);

    return matchedRoute && matchedRoute.match;
  }
}
