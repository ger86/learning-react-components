import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsersThunk } from 'Ducks/users';
import UserList from 'Components/users/UserList';
import { getUsersForPage, getUsersFeedState } from 'Ducks/selectors';
import userPropType from 'PropTypes/userPropType';
import { usersRoute } from 'Config/routes';

class UsersListContainer extends PureComponent {
  static propTypes = {
    getUsersThunkConnect: PropTypes.func.isRequired,
    feedState: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(userPropType),
    currentPage: PropTypes.string
  };

  static defaultProps = {
    currentPage: '1',
    users: []
  };

  componentDidMount() {
    this.requestUsers();
  }

  componentDidUpdate(prevProps) {
    const { currentPage } = this.props;
    if (prevProps.currentPage !== currentPage) {
      this.requestUsers();
    }
  }

  requestUsers = async () => {
    const { currentPage } = this.props;
    try {
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getUsersThunkConnect(currentPage);
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  generateLinkForPage = page => usersRoute(page);

  render() {
    const { users, feedState, currentPage } = this.props;
    return (
      <UserList
        users={users}
        feedState={feedState}
        currentPage={parseInt(currentPage, 10)}
        generateLinkForPage={this.generateLinkForPage}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    users: getUsersForPage(state, ownProps.currentPage),
    feedState: getUsersFeedState(state)
  }),
  { getUsersThunkConnect: getUsersThunk }
)(UsersListContainer);
