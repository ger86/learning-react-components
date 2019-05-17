import request from 'Services/request';

// eslint-disable-next-line import/prefer-default-export
export const getUsers = async page => request.get('users', { page });
