import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import UsersScene from 'Scenes/UsersScene';
import { usersRoute } from 'Config/routes';
import configureStore from 'Services/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={usersRoute()} component={UsersScene} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('cloud-district-app')
);
