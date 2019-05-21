import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Alert from 'Components/styled/Alert';
import userPropType from 'PropTypes/userPropType';

export default class UserFormContainer extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    user: userPropType
  };

  static defaultProps = {
    user: null
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    userModel: this.props.user || { first_name: '', email: '' },
    sending: false,
    error: null
  };

  onSubmit = async event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { userModel } = this.state;
    this.setState({ sending: true });
    await onSubmit(userModel);
    this.setState({ sending: false, error: null, success: true });
  };

  renderError = () => {
    const { error } = this.state;
    return error ? (
      <Alert error>
        {error.code === 404 ? 'No se encontró el usuario' : error.message}
      </Alert>
    ) : null;
  };

  renderSuccess = () => {
    const { success } = this.state;
    return success ? <Alert success>Formulario enviado con éxito</Alert> : null;
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
    const { sending, userModel } = this.state;
    return (
      <>
        {this.renderError()}
        {this.renderSuccess()}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">Nombre</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              className="form-control"
              onChange={this.onChangeName}
              value={userModel.first_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              className="form-control"
              onChange={this.onChangeEmail}
              value={userModel.email}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
        {sending ? <div>Enviando</div> : null}
      </>
    );
  }
}
