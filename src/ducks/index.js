import { combineReducers } from 'redux';
import users from './users';

const rootReducer = combineReducers({
  users
});

export default rootReducer;

export * from './selectors';
