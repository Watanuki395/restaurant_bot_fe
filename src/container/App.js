import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
//import bootstrap from 'bootstrap'

import PrivateRoute from './privateRoute';

//import Navbar from '../components/common/Layout/Navbar';

import LoginPage from '../components/auth/loginPage';
import RegisterPage from '../components/auth/registerPage';
import DashboardPage from '../components/dashboard/dashboardPage';
import ForgotPassPage from '../components/forgotpass/ForgotpassPage';

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
            <Route path='/dashboard' component={DashboardPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


/// <PrivateRoute path='/dashboard' component={DashboardPage} />