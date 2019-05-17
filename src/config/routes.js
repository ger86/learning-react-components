import queryString from 'query-string';

const USERS_ROUTE = '/users';
// eslint-disable-next-line import/prefer-default-export
export const usersRoute = page => {
  if (!page) {
    return USERS_ROUTE;
  }
  return `${USERS_ROUTE}?${queryString.stringify({ page })}`;
};
