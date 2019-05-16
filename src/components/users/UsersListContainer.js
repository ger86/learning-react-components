import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsersThunk } from 'Ducks/users';
import Loading from 'Components/common/Loading';
import Alert from 'Components/styled/Alert';
import UserTeaser from 'Components/users/UserTeaser';
import { getUsersForPage } from 'Ducks/selectors';
import userPropType from 'PropTypes/userPropType';

class UsersListContainer extends PureComponent {
  static propTypes = {
    getUsersThunkConnect: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(userPropType),
    page: PropTypes.string
  };

  static defaultProps = {
    page: '1',
    users: []
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    loading: !this.props.users,
    error: false
  };

  async componentDidMount() {
    this.requestUsers();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (prevProps.page !== page) {
      this.requestUsers();
    }
  }

  requestUsers = async () => {
    const { users, page } = this.props;
    try {
      this.setState({ loading: !users });
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getUsersThunkConnect(page);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { loading, error } = this.state;
    const { users } = this.props;
    if (error) {
      return <Alert error>{error.message}</Alert>;
    }
    return (
      <>
        {loading || !users ? (
          <Loading>Cargando usuarios</Loading>
        ) : (
          <div>
            {users.map(user => (
              <UserTeaser key={`user-${user.id}`} user={user} />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default connect(
  (state, ownProps) => {
    return {
      users: getUsersForPage(state, ownProps.page)
    };
  },
  { getUsersThunkConnect: getUsersThunk }
)(UsersListContainer);
