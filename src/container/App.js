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
import createCategoryPage from '../components/createCategory/createcategoryPage';
import createProductPage from '../components/createProduct/createproductPage';
import categoryEditPage from '../components/categories/categoryEditPage';
import CategoryByProductPage from '../components/categories/categoryByProductPage';
import Products from '../components/product/Products';

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
            <Route path='/dashboard/:id_cat' component={CategoriesPage} />
            <Route path='/createCategory' component={createCategoryPage} />
            <Route path='/createProduct' component={createProductPage} />
            <Route path='/categoryEdit/:id_cat' component={categoryEditPage} />
            <Route path='/CategoryByProduct/:id_cat' component={CategoryByProductPage} />
            <Route path='/Products' component={Products} />
          </Switch>
        </div>
      </BrowserRouter>
    );

}

export default App;


/// <PrivateRoute path='/dashboard' component={DashboardPage} />