import React from 'react';
import userPropType from 'PropTypes/userPropType';

const UserTeaser = ({ user }) => (
  <div>
    <h3>{user.name}</h3>
    <div>
      <strong>email: </strong>
      {user.email}
    </div>
  </div>
);

UserTeaser.propTypes = {
  user: userPropType.isRequired
};

export default UserTeaser;
