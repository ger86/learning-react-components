import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import userPropType from 'PropTypes/userPropType';
import UserForm from 'Components/users/UserForm';

export default class UserFormContainer extends PureComponent {
  static propTypes = {
    sendForm: PropTypes.func.isRequired,
    user: userPropType
  };

  static defaultProps = {
    user: null
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    userModel: this.props.user
      ? // eslint-disable-next-line react/destructuring-assignment
        { ...this.props.user }
      : { first_name: '', email: '' },
    sending: false,
    error: null,
    success: false
  };

  onSubmit = async event => {
    event.preventDefault();
    const { sendForm } = this.props;
    const { userModel } = this.state;
    this.setState({ sending: true });
    try {
      await sendForm(userModel);
      this.setState({ sending: false, error: null, success: true });
    } catch (exception) {
      this.setState({ sending: false, success: false, error: exception });
    }
  };

  onChangeName = event => {
    const { userModel } = this.state;
    this.setState({
      userModel: { ...userModel, first_name: event.target.value }
    });
  };

  onChangeEmail = event => {
    const { userModel } = this.state;
    this.setState({
      userModel: { ...userModel, email: event.target.value }
    });
  };

  render() {
    const { sending, success, error, userModel } = this.state;
    return (
      <UserForm
        success={success}
        error={error}
        sending={sending}
        userModel={userModel}
        onChangeEmail={this.onChangeEmail}
        onChangeName={this.onChangeName}
        onSubmit={this.onSubmit}
      />
    );
  }
}
