import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
//import bootstrap from 'bootstrap'

import PrivateRoute from './privateRoute';

import Navbar from '../components/common/Layout/Navbar';
import Sidebar from '../components/common/SideBar/SideBar';

import LoginPage from '../components/auth/loginPage';
import RegisterPage from '../components/auth/registerPage';
import DashboardPage from '../components/dashboard/dashboardPage';
import ForgotPassPage from '../components/forgotpass/ForgotpassPage';

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
          <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/forgotpass' element={<ForgotPassPage/>} />
            <Route path='/dashboard' element={<DashboardPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    );

}

export default App;


/// <PrivateRoute path='/dashboard' component={DashboardPage} />