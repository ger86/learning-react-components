import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'Components/common/Loading';
import Alert from 'Components/styled/Alert';
import UserTeaser from 'Components/users/UserTeaser';
import Pagination from 'Components/common/Pagination';
import userPropType from 'PropTypes/userPropType';

const UserList = ({ users, feedState, currentPage, generateLinkForPage }) => (
  <>
    {feedState.error && <Alert error>{feedState.message}</Alert>}
    {feedState.loading && <Loading>Cargando usuarios</Loading>}
    {users && users.length === 0 && <Alert error>No hay resultados</Alert>}
    {users && (
      <>
        <h1>Lista de usuarios</h1>
        <p>Aquí puedes ver la lista de usuarios</p>
        {users.map(user => (
          <UserTeaser key={`user-${user.id}`} user={user} />
        ))}
        <Pagination
          totalItems={feedState.totalItems}
          pageSize={feedState.resultsPerPage}
          currentPage={currentPage}
          generateLinkForPage={generateLinkForPage}
        />
      </>
    )}
  </>
);

UserList.propTypes = {
  feedState: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(userPropType),
  currentPage: PropTypes.number.isRequired,
  generateLinkForPage: PropTypes.func.isRequired
};

UserList.defaultProps = {
  users: null
};

export default UserList;
