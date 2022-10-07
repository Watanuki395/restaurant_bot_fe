import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
//import bootstrap from 'bootstrap'

//import PrivateRoute from './privateRoute';

import Navbar from '../components/common/Navbar/Navbar';
import { ThemeProvider } from "styled-components";
import LayoutSB from "../components/common/Layout/Layout";
import { GlobalStyle } from "../styles/globalStyles";
import { darkTheme, lightTheme } from "../styles/theme";

import LoginPage from "../components/auth/loginPage";
import RegisterPage from "../components/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/dashboardPage";
import ForgotPassPage from "../components/forgotpass/ForgotpassPage";
import ServicesPage from "../components/services/ServicesPage";
import ContactUsPage from "../components/contact-us/ContactUsPage";
import HomePage from "../pages/home/HomePage";

import RequireAuth from "../components/requireAuth/RequireAuth";
import PersistLogin from "../components/persistlogin/PersistLogin";
import Layout from "../components/layouts/Layout";
import Missing from "../components/missing/Missing";
import Unauthorized from '../components/unauthorized/Unauthorized';
import NewCatPage from '../pages/addNew/newCat';
import MenuPage from  "../pages/menu/MenuPage";
import CategoryByProductPage from '../components/categories/categoryByProductPage';
import ProductPage from "../components/products/ProductPage";

import { productInputs, userInputs } from "./formSource";

export const ThemeContext = React.createContext(null);

const App = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [theme, setTheme] = useState("dark");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;

  const ROLES = {
    User: 2001,
    admin: true,
  };

  return (

    <ThemeContext.Provider value={{ setTheme, theme }}>
    <ThemeProvider theme={themeStyle}>
    <GlobalStyle />

      <>
      <LayoutSB toggle={toggle}>
      <Navbar toggle={toggle}/>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpass" element={<ForgotPassPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/forgotpass" element={<ForgotPassPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin]}/>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path='/new/category' element={<NewCatPage inputs={userInputs} title="Añadir Nueva Categoria"/>} />
              <Route path='/CategoryByProduct/:id_cat' element={<CategoryByProductPage/>} />
              <Route path='/Product/:id_cat' element={<ProductPage/>} />
              <Route path='/Product' element={<ProductPage/>} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      </LayoutSB>
      </>
      </ThemeProvider>
      </ThemeContext.Provider>

  );
};
/*
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
*/
export default App;