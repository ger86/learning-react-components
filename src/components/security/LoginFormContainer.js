import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { facebookLoginThunk } from 'Ducks/security';
import LoginForm from 'Components/security/LoginForm';

class LoginFormContainer extends PureComponent {
  static propTypes = {
    facebookLoginThunkConnect: PropTypes.func.isRequired
  };

  onFacebookClick = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.facebookLoginThunkConnect();
  };

  render() {
    return <LoginForm onFacebookClick={this.onFacebookClick} />;
  }
}

export default connect(
  null,
  { facebookLoginThunkConnect: facebookLoginThunk }
)(LoginFormContainer);
