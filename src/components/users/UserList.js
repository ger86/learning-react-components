import React from 'react';
import PropTypes from 'prop-types';
import UserTeaser from 'Components/users/UserTeaser';
import Pagination from 'Components/common/Pagination';
import userPropType from 'PropTypes/userPropType';

const UserList = ({
  users,
  totalItems,
  resultsPerPage,
  page,
  generateLinkForPage
}) => (
  <>
    <h1>Lista de usuarios</h1>
    <p>Aquí puedes ver la lista de usuarios</p>
    {users.map(user => (
      <UserTeaser key={`user-${user.id}`} user={user} />
    ))}
    <Pagination
      totalItems={totalItems}
      pageSize={resultsPerPage}
      currentPage={parseInt(page, 10)}
      generateLinkForPage={generateLinkForPage}
    />
  </>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(userPropType).isRequired,
  totalItems: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  generateLinkForPage: PropTypes.func.isRequired
};

export default UserList;
