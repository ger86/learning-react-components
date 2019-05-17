import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import UsersScene from 'Scenes/UsersScene';
import { usersRoute } from 'Config/routes';
import configureStore from 'Services/configureStore';
import './sass/base/base.sass';

const store = configureStore();

ReactDOM.render(
  <div className="container">
    <div className="row">
      <div className="col-8 offset-2">
        <div className="the-content">
          <Provider store={store}>
            <HashRouter>
              <Switch>
                <Route path={usersRoute()} component={UsersScene} />
              </Switch>
            </HashRouter>
          </Provider>
        </div>
      </div>
    </div>
  </div>,
  document.getElementById('cloud-district-app')
);
