import { combineReducers } from 'redux';
import arrayUnique from 'Utils/arrayUnique';
import { getUsers, getUser } from 'Services/api/users';

const GET_USERS_SUCCEEDED = 'GET_USERS_SUCCEEDED';
const GET_USER_SUCCEEDED = 'GET_USER_SUCCEEDED';

export function getUsersThunk(page) {
  return async dispatch => {
    const result = await getUsers(page);
    dispatch(getUsersThunkSucceeded(page, result));
    return result;
  };
}

function getUsersThunkSucceeded(page, result) {
  return {
    type: GET_USERS_SUCCEEDED,
    page,
    ...result
  };
}

export function getUserThunk(userId) {
  return async dispatch => {
    const result = await getUser(userId);
    dispatch(getUserThunkSucceeded(result.data));
    return result;
  };
}

function getUserThunkSucceeded(user) {
  return {
    type: GET_USER_SUCCEEDED,
    user
  };
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return arrayUnique([
        ...state,
        ...action.data.map(singleUser => singleUser.id)
      ]);
    case GET_USER_SUCCEEDED:
      return arrayUnique([...state, action.user.id]);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        ...state,
        ...action.data.reduce(
          (ac, singleUser) =>
            Object.assign({}, ac, { [singleUser.id]: singleUser }),
          {}
        )
      };
    case GET_USER_SUCCEEDED:
      return {
        ...state,
        [action.user.id]: action.user
      };
    default:
      return state;
  }
};

const feedPages = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        ...state,
        [action.page]: action.data.map(singleUser => singleUser.id)
      };
    default:
      return state;
  }
};

const feedSettings = (state = { totalItems: 0, resultsPerPage: 0 }, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        totalItems: action.total,
        resultsPerPage: action.per_page
      };
    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
  feed: combineReducers({ feedPages, feedSettings })
});

export const getUserById = (state, id) => state.byId[id];
export const getAllUsers = state => state.allIds.map(id => state.byId[id]);
export const getUsersForPage = (state, page) =>
  state.feed.feedPages[page]
    ? state.feed.feedPages[page].map(id => state.byId[id])
    : null;
export const getFeedSettings = state => state.feed.feedSettings;
