import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from 'Ducks/selectors';
import './style.sass';

class Header extends PureComponent {
  static propTypes = {
    user: PropTypes.object
  };

  static defaultProps = {
    user: null
  };

  render() {
    const { user } = this.props;
    return (
      <header className="the-header">
        <div className="container">
          <div className="row">
            <div className="col-3">Cloud District</div>
            <div className="col-3 offset-6">
              {user && (
                <div className="user">
                  <div className="user__image">
                    <img src={user.picture.data.url} alt={user.name} />
                  </div>
                  <div className="user__name">{user.name}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(state => ({
  user: getCurrentUser(state)
}))(Header);
