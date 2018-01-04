import PropTypes from 'prop-types';
import React from 'react';
import {Router} from 'react-router';
import {matchRoutes} from 'react-router-config';

import {locationChange} from './actions';

export class ConnectedRouter extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    static: PropTypes.bool,
  };

  static contextTypes = {store: PropTypes.object};

  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentWillMount() {
    const {history} = this.props;
    this.handleLocationChange(history.location);
    if (!this.props.static) {
      this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    }
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
    const matchedRoutes = matchRoutes(this.props.routes, location.pathname);
    const matchedRoute = matchedRoutes.find(route => route.match.isExact);
    const match = matchedRoute && matchedRoute.match;

    this.context.store.dispatch(locationChange(location, match));
  }
}
