import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'Components/common/Loading';
import Alert from 'Components/styled/Alert';
import UserFull from 'Components/users/UserTeaser';
import { usersRoute } from 'Config/routes';
import { getUserThunk } from 'Ducks/users';
import { getUserById } from 'Ducks/selectors';
import userPropType from 'PropTypes/userPropType';

class UsersListContainer extends PureComponent {
  static propTypes = {
    getUserThunkConnect: PropTypes.func.isRequired,
    user: userPropType,
    userId: PropTypes.string.isRequired
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
    const { userId } = this.props;
    if (prevProps.userId !== userId) {
      this.requestUser();
    }
  }

  requestUser = async () => {
    const { userId } = this.props;
    try {
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getUserThunkConnect(userId);
      this.setState({ error: null });
    } catch (error) {
      this.setState({ error });
    }
  };

  generateLinkForPage = page => usersRoute(page);

  render() {
    const { error } = this.state;
    const { user } = this.props;
    if (error) {
      return (
        <Alert error>
          {error.code === 404 ? 'No se encontró el usuario' : error.message}
        </Alert>
      );
    } else if (user === null) {
      return <Loading>Cargando usuario</Loading>;
    }
    return <UserFull user={user} />;
  }
}

export default connect(
  (state, ownProps) => ({
    user: getUserById(state, ownProps.userId)
  }),
  { getUserThunkConnect: getUserThunk }
)(UsersListContainer);
