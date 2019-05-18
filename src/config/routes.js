import queryString from 'query-string';

// eslint-disable-next-line import/prefer-default-export
export const usersRoute = page => {
  const basePath = '/users';
  if (!page) {
    return basePath;
  }
  return `${basePath}?${queryString.stringify({ page })}`;
};

export const loginRoute = () => '/login';

export const userDetailRoute = (userId = ':id') => `/user/${userId}`;
export const userEditRoute = (userId = ':id') => `/user/${userId}/edit`;
