import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from 'Components/hoc/PrivateRoute';
import PublicRoute from 'Components/hoc/PublicRoute';
import * as appRoutes from 'Config/routes';
import Header from 'Components/common/Header';
import LoginScene from 'Scenes/LoginScene';
import UserDetailScene from 'Scenes/UserDetailScene';
import UsersScene from 'Scenes/UsersScene';
import UserEditScene from 'Scenes/UserEditScene';
import configureStore from 'Services/configureStore';
import initFacebook from 'Services/initFacebook';
import './sass/base/base.sass';

initFacebook();
const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="the-content">
              <HashRouter>
                <Switch>
                  <PublicRoute
                    path={appRoutes.loginRoute()}
                    component={LoginScene}
                  />
                  <PrivateRoute
                    path={appRoutes.usersRoute()}
                    component={UsersScene}
                  />
                  <PrivateRoute
                    path={appRoutes.userEditRoute()}
                    component={UserEditScene}
                  />
                  <PrivateRoute
                    path={appRoutes.userDetailRoute()}
                    component={UserDetailScene}
                  />
                </Switch>
              </HashRouter>
            </div>
          </div>
        </div>
      </div>
    </PersistGate>
  </Provider>,
  document.getElementById('cloud-district-app')
);
