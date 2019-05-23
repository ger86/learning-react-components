import React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import UsersListContainer from 'Components/users/UsersListContainer';

export default withRouter(({ location }) => {
  const values = queryString.parse(location.search);
  return <UsersListContainer currentPage={values.page || '1'} />;
});
