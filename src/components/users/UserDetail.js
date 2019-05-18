import React from 'react';
import { Link } from 'react-router-dom';
import ShadowBox from 'Components/styled/ShadowBox';
import userPropType from 'PropTypes/userPropType';
import { userEditRoute } from 'Config/routes';

const UserTeaser = ({ user }) => (
  <ShadowBox>
    <h3>{`${user.first_name} ${user.last_name}`}</h3>
    <div>
      <strong>email: </strong>
      {user.email}
    </div>
    <div>
      <Link className="btn btn-primary" to={userEditRoute(user.id)}>
        Editar
      </Link>
    </div>
  </ShadowBox>
);

UserTeaser.propTypes = {
  user: userPropType.isRequired
};

export default UserTeaser;
