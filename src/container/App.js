import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
//import bootstrap from 'bootstrap'

import PrivateRoute from './privateRoute';

import Navbar from '../components/common/Layout/Navbar';
import Sidebar from '../components/common/SideBar';

import LoginPage from '../components/auth/loginPage';
import RegisterPage from '../components/auth/registerPage';
import DashboardPage from '../components/dashboard/dashboardPage';
import ForgotPassPage from '../components/forgotpass/ForgotpassPage';

import CategoriesPage from '../components/categories/CategoriesPage';

const App = () =>{

  const[isOpen, setIsOpen] = useState(false)

  const toggle = () =>{
    setIsOpen(!isOpen)
  }

    return (
      <BrowserRouter>
        <div>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navbar toggle={toggle}/>
          <Switch>
            <Route path='/' exact={true} component={LoginPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/forgotpass' component={ForgotPassPage} />
            <Route path='/dashboard' component={DashboardPage} />
            {/* <Route path='/categories' component={CategoriesPage} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );

}

export default App;


/// <PrivateRoute path='/dashboard' component={DashboardPage} />