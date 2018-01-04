import PropTypes from 'prop-types';
import React from 'react';

import {ConnectedRouter} from './connectedRouter';

export class StaticRouter extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    basename: '',
    location: '/',
  };

  static childContextTypes = {
    router: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      router: {
        staticContext: this.props.context,
      },
    };
  }

  render() {
    const {children, history, routes} = this.props;

    return (
      <ConnectedRouter history={history} routes={routes} static>
        {children}
      </ConnectedRouter>
    );
  }
}
