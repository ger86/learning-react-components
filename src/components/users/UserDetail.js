import React from 'react';
import { Link } from 'react-router-dom';
import Loading from 'Components/common/Loading';
import Alert from 'Components/styled/Alert';
import ShadowBox from 'Components/styled/ShadowBox';
import userPropType from 'PropTypes/userPropType';
import PropTypes from 'prop-types';
import { userEditRoute } from 'Config/routes';

const UserDetail = ({ user, state }) => (
  <>
    {state.error && (
      <Alert error>
        {state.error.code === 404
          ? 'No se encontró el usuario'
          : state.error.message}
      </Alert>
    )}
    {state.loading && <Loading>Cargando usuario</Loading>}
    {user && (
      <ShadowBox>
        <h3>{`${user.first_name} ${user.last_name}`}</h3>
        <p>
          <strong>email: </strong>
          {user.email}
        </p>
        <div>
          <Link className="btn btn-outline-primary" to={userEditRoute(user.id)}>
            Editar
          </Link>
        </div>
      </ShadowBox>
    )}
  </>
);

UserDetail.propTypes = {
  state: PropTypes.object.isRequired,
  user: userPropType
};

UserDetail.defaultProps = {
  user: null
};

export default UserDetail;
