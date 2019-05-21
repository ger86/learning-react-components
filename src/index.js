import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from 'Components/common/Loading';
import PrivateRoute from 'Components/hoc/PrivateRoute';
import PublicRoute from 'Components/hoc/PublicRoute';
import * as appRoutes from 'Config/routes';
import Header from 'Components/common/Header';
import LoginScene from 'Scenes/LoginScene';
import LogoutScene from 'Scenes/LogoutScene';
import UsersScene from 'Scenes/UsersScene';
import configureStore from 'Services/configureStore';
import initFacebook from 'Services/initFacebook';
import './sass/base/base.sass';

const UserDetailScene = lazy(() => import('Scenes/UserDetailScene'));
const UserEditScene = lazy(() => import('Scenes/UserEditScene'));
const UserCreateScene = lazy(() => import('Scenes/UserCreateScene'));

initFacebook();
const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="the-content">
                  <Switch>
                    <PublicRoute
                      path={appRoutes.loginRoute()}
                      component={LoginScene}
                    />
                    <PrivateRoute
                      path={appRoutes.logoutRoute()}
                      component={LogoutScene}
                    />
                    <PrivateRoute
                      path={appRoutes.userCreateRoute()}
                      component={UserCreateScene}
                    />
                    <PrivateRoute
                      path={appRoutes.userEditRoute()}
                      component={UserEditScene}
                    />
                    <PrivateRoute
                      path={appRoutes.userDetailRoute()}
                      component={UserDetailScene}
                    />
                    <PrivateRoute
                      exact
                      path={appRoutes.usersRoute()}
                      component={UsersScene}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('cloud-district-app')
);
