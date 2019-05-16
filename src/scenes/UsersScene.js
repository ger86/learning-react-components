import React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import FluidContainer from 'Components/styled/FluidContainer';
import UsersListContainer from 'Components/users/UsersListContainer';

export default withRouter(({ location }) => {
  const values = queryString.parse(location.search);
  return (
    <FluidContainer>
      <UsersListContainer page={values.page || '1'} />
    </FluidContainer>
  );
});
