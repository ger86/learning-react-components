import queryString from 'query-string';

const USERS_ROUTE = '/users';
const USER_DETAIL = '/users/:id';
const LOGIN_ROUTE = '/login';

// eslint-disable-next-line import/prefer-default-export
export const usersRoute = page => {
  if (!page) {
    return USERS_ROUTE;
  }
  return `${USERS_ROUTE}?${queryString.stringify({ page })}`;
};

export const loginRoute = () => LOGIN_ROUTE;

export const userDetailRoute = (userId = ':id') => `${USER_DETAIL}/${userId}`;
