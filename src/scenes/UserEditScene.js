import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'Components/styled/Alert';
import Loading from 'Components/common/Loading';
import UserFormContainer from 'Components/users/UserFormContainer';
import { getUserThunk, patchUserThunk } from 'Ducks/users';
import { getUserById } from 'Ducks/selectors';
import userPropType from 'PropTypes/userPropType';

class UserEditScene extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    getUserThunkConnect: PropTypes.func.isRequired,
    patchUserThunkConnect: PropTypes.func.isRequired,
    user: userPropType
  };

  static defaultProps = {
    user: null
  };

  state = {
    error: null
  };

  async componentDidMount() {
    this.requestUser();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    if (prevProps.match.params.id !== id) {
      this.requestUser();
    }
  }

  requestUser = async () => {
    const {
      match: {
        params: { id }
      },
      getUserThunkConnect
    } = this.props;
    try {
      await getUserThunkConnect(id);
      this.setState({ error: null });
    } catch (error) {
      this.setState({ error });
    }
  };

  // eslint-disable-next-line react/destructuring-assignment
  onSubmit = async user => this.props.patchUserThunkConnect(user);

  render() {
    const { user } = this.props;
    const { error } = this.state;
    if (error) {
      return (
        <Alert error>
          {error.code === 404 ? 'No se encontró el usuario' : error.message}
        </Alert>
      );
    } else if (user === null) {
      return <Loading>Cargando usuario</Loading>;
    }
    return <UserFormContainer user={user} onSubmit={this.onSubmit} />;
  }
}

export default connect(
  (state, ownProps) => ({
    user: getUserById(state, ownProps.match.params.id)
  }),
  { getUserThunkConnect: getUserThunk, patchUserThunkConnect: patchUserThunk }
)(UserEditScene);
