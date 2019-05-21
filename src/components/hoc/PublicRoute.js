import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { usersRoute } from 'Config/routes';
import { isAuthenticated } from 'Ducks/selectors';

// eslint-disable-next-line no-shadow
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={usersRoute()} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

PrivateRoute.defaultProps = {
  isAuthenticated: false
};

export default connect(state => ({
  isAuthenticated: isAuthenticated(state)
}))(PrivateRoute);
