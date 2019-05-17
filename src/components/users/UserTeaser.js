import React from 'react';
import ShadowBox from 'Components/styled/ShadowBox';
import userPropType from 'PropTypes/userPropType';

const UserTeaser = ({ user }) => (
  <ShadowBox>
    <h3>{user.name}</h3>
    <div>
      <strong>email: </strong>
      {user.email}
    </div>
  </ShadowBox>
);

UserTeaser.propTypes = {
  user: userPropType.isRequired
};

export default UserTeaser;
