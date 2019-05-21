import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsersThunk } from 'Ducks/users';
import Loading from 'Components/common/Loading';
import Alert from 'Components/styled/Alert';
import UserList from 'Components/users/UserList';
import { getUsersForPage, getFeedSettings } from 'Ducks/selectors';
import userPropType from 'PropTypes/userPropType';
import { usersRoute } from 'Config/routes';

class UsersListContainer extends PureComponent {
  static propTypes = {
    getUsersThunkConnect: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    resultsPerPage: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(userPropType),
    page: PropTypes.string
  };

  static defaultProps = {
    page: '1',
    users: []
  };

  state = {
    error: false
  };

  componentDidMount() {
    this.requestUsers();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (prevProps.page !== page) {
      this.requestUsers();
    }
  }

  requestUsers = async () => {
    const { page } = this.props;
    try {
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getUsersThunkConnect(page);
    } catch (error) {
      this.setState({ error });
    }
  };

  generateLinkForPage = page => usersRoute(page);

  render() {
    const { error } = this.state;
    const { users, totalItems, resultsPerPage, page } = this.props;
    if (error) {
      return <Alert error>{error.message}</Alert>;
    } else if (users === null) {
      return <Loading>Cargando usuarios</Loading>;
    } else if (users.length === 0) {
      return <Alert error>No hay resultados</Alert>;
    }
    return (
      <UserList
        users={users}
        totalItems={totalItems}
        resultsPerPage={resultsPerPage}
        page={parseInt(page, 10)}
        generateLinkForPage={this.generateLinkForPage}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    users: getUsersForPage(state, ownProps.page),
    ...getFeedSettings(state)
  }),
  { getUsersThunkConnect: getUsersThunk }
)(UsersListContainer);
