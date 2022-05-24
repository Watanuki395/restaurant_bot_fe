import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
//import bootstrap from 'bootstrap'

//import PrivateRoute from './privateRoute';

import Navbar from '../components/common/Layout/Navbar';
import Sidebar from '../components/common/SideBar/SideBar';

import LoginPage from "../components/auth/loginPage";
import RegisterPage from "../components/auth/registerPage";
import DashboardPage from "../components/dashboard/dashboardPage";
import ForgotPassPage from "../components/forgotpass/ForgotpassPage";

import RequireAuth from "../components/requireAuth/RequireAuth";
import PersistLogin from "../components/persistlogin/PersistLogin";
import Layout from "../components/layouts/Layout";
import Missing from "../components/missing/Missing";
import Unauthorized from '../components/unauthorized/Unauthorized';

const App = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
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
            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]}/>}>
              <Route path="/dashboard" element={<DashboardPage />} />
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