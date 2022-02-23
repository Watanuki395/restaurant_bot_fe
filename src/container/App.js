import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from './privateRoute';

import Footer from '../components/common/Layout/Footer';

import loginPage from '../components/loginPage';
import registerPage from '../components/registerPage';
import DashboardPage from '../components/dashboard/dashboardPage';
import ForgotPassPage from '../components/forgotpass/ForgotpassPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/' exact={true} component={loginPage} />
            <Route path='/login' component={loginPage} />
            <Route path='/register' component={registerPage} />
            <Route path='/forgotpass' component={ForgotPassPage} />
            <Route path='/dashboard' component={DashboardPage} />
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


/// <PrivateRoute path='/dashboard' component={DashboardPage} />