import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from 'Ducks/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['users']
};

const configureStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  const store = createStoreWithMiddleware(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
