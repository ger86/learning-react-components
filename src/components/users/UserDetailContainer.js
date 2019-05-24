import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDetail from 'Components/users/UserDetail';
import { getUserThunk } from 'Ducks/users';
import { getUserById } from 'Ducks/selectors';
import userPropType from 'PropTypes/userPropType';

class UserDetailContainer extends PureComponent {
  static propTypes = {
    getUserThunkConnect: PropTypes.func.isRequired,
    user: userPropType,
    userId: PropTypes.string.isRequired
  };

  static defaultProps = {
    user: null
  };

  state = {
    loading: false,
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
      this.setState({ loading: true, error: null });
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getUserThunkConnect(userId);
      this.setState({ loading: false, error: null });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { user } = this.props;
    const { loading, error } = this.state;
    return <UserDetail user={user} state={{ loading, error }} />;
  }
}

export default connect(
  (state, ownProps) => ({
    user: getUserById(state, ownProps.userId)
  }),
  { getUserThunkConnect: getUserThunk }
)(UserDetailContainer);
