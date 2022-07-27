import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
//import bootstrap from 'bootstrap'

//import PrivateRoute from './privateRoute';

import Navbar from '../components/common/Layout/Navbar';
import Sidebar from '../components/common/SideBar/SideBar';

import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import DashboardPage from "../components/dashboard/DashboardPage";
import ForgotPassPage from "../components/forgotpass/ForgotpassPage";

import RequireAuth from "../components/requireAuth/RequireAuth";
import PersistLogin from "../components/persistlogin/PersistLogin";
import Layout from "../components/layouts/Layout";
import Missing from "../components/missing/Missing";
import Unauthorized from '../components/unauthorized/Unauthorized';
import CategoriesPage from '../components/categories/CategoriesPage';
import CreateCategoryPage from '../components/createCategory/CreatecategoryPage';
import CreateProductPage from '../components/createProduct/CreateproductPage';
import CategoryEditPage from '../components/categories/CategoryEditPage';
import CategoryByProductPage from '../components/categories/CategoryByProductPage';
import Products from '../components/product/Products';
import EditProductPage from '../components/product/EditProductPage';

const App = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const ROLES = {
    User: 2001,
    admin: true,
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpass" element={<ForgotPassPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin]}/>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path='/dashboard/:id_cat' element={<CategoriesPage/>} />
              <Route path='/createCategory' element={<CreateCategoryPage/>} />
              <Route path='/createProduct' element={<CreateProductPage/>} />
              <Route path='/categoryEdit/:id_cat' element={<CategoryEditPage/>} />
              <Route path='/CategoryByProduct/:id_cat' element={<CategoryByProductPage/>} />
              <Route path='/Products' element={<Products/>} />
              <Route path='/editProduct/:id_prd' element={<EditProductPage/>} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
};
/*
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
*/
export default App;