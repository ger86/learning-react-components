import * as fromUsers from './users';

export const getAllUsers = state => fromUsers.getAllUsers(state.users);
export const getSingleUser = (state, id) =>
  fromUsers.getSingleUserById(state.users, id);
export const getUsersForPage = (state, page) =>
  fromUsers.getUsersForPage(state.users, page);
