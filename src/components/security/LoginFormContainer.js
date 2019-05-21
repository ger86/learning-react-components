import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { facebookLoginThunk } from 'Ducks/security';
import LoginForm from 'Components/security/LoginForm';

const LoginFormContainer = ({ facebookLoginThunkConnect }) => {
  const onFacebookClick = () => {
    // eslint-disable-next-line react/destructuring-assignment
    facebookLoginThunkConnect();
  };
  return <LoginForm onFacebookClick={onFacebookClick} />;
};

LoginFormContainer.propTypes = {
  facebookLoginThunkConnect: PropTypes.func.isRequired
};

export default connect(
  null,
  { facebookLoginThunkConnect: facebookLoginThunk }
)(LoginFormContainer);
