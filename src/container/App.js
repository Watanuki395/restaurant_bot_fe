import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
//import bootstrap from 'bootstrap'

import PrivateRoute from './privateRoute';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import DashboardPage from '../components/dashboardPage';
import ForgotPassPage from '../components/forgotpassPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/' exact={true} component={LoginPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/forgotpass' component={ForgotPassPage} />
            <PrivateRoute path='/dashboard' component={DashboardPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;