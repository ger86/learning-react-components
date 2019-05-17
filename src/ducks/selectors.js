import * as fromUsers from './users';
import * as fromSecurity from './security';

export const getAllUsers = state => fromUsers.getAllUsers(state.users);
export const getSingleUser = (state, id) =>
  fromUsers.getSingleUserById(state.users, id);
export const getUsersForPage = (state, page) =>
  fromUsers.getUsersForPage(state.users, page);
export const getFeedSettings = state => fromUsers.getFeedSettings(state.users);

export const getCurrentUser = state =>
  fromSecurity.getCurrentUser(state.security);
export const isAuthenticated = state =>
  fromSecurity.isAuthenticated(state.security);
