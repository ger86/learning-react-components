import request from 'Services/request';

export const getUsers = async page => request.get('users', { page });
export const getUser = async userId => request.get(`users/${userId}`);
