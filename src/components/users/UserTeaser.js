import React from 'react';
import { Link } from 'react-router-dom';
import ShadowBox from 'Components/styled/ShadowBox';
import userPropType from 'PropTypes/userPropType';
import { userDetailRoute } from 'Config/routes';

const UserDetail = ({ user }) => (
  <ShadowBox>
    <h3>{`${user.first_name} ${user.last_name}`}</h3>
    <p>
      <strong>email: </strong>
      {user.email}
    </p>
    <div>
      <Link className="btn btn-outline-primary" to={userDetailRoute(user.id)}>
        Ver más
      </Link>
    </div>
  </ShadowBox>
);

UserDetail.propTypes = {
  user: userPropType.isRequired
};

export default UserDetail;
