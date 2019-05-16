import { combineReducers } from 'redux';
import arrayUnique from 'Utils/arrayUnique';
import { getUsers } from 'Services/api/users';

const GET_USERS_SUCCEEDED = 'GET_USERS_SUCCEEDED';

export function getUsersThunk(page) {
  return async dispatch => {
    try {
      const data = await getUsers(page);
      dispatch(getUsersThunkSucceeded(page, data));
      return data;
    } catch (error) {
      throw error;
    }
  };
}

function getUsersThunkSucceeded(page, users) {
  return {
    type: GET_USERS_SUCCEEDED,
    page,
    users
  };
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return arrayUnique([
        ...state,
        ...action.users.map(singleUser => singleUser.id)
      ]);
    default:
      return state;
  }
};

const byPage = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        ...state,
        [action.page]: action.users.map(singleUser => singleUser.id)
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        ...state,
        ...action.users.reduce(
          (ac, singleUser) =>
            Object.assign({}, ac, { [singleUser.id]: singleUser }),
          {}
        )
      };
    default:
      return state;
  }
};

export default combineReducers({ allIds, byId, byPage });

export const getSingleUserById = (state, id) => state.byId[id];
export const getAllUsers = state => state.allIds.map(id => state.byId[id]);
export const getUsersForPage = (state, page) =>
  state.byPage[page] ? state.byPage[page].map(id => state.byId[id]) : null;
