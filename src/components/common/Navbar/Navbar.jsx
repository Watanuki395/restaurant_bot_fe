import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { logoutUser } from '../../../actions/loginActions';
import { MdOutlineDarkMode, MdOutlineLogout } from "react-icons/md";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtnLink,
  Bars,
  NavIcon,
  NavItem,
  NavAvatar,
  NavLinkLabel
}from './style';

import LogoImg from "../../../imgs/no-image.jpeg";
import { navItems, navItemsWithLogin } from "./NavItems.js";

const Navbar = (props) => {
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1065) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      } else {
        setMobile(false);
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
 // const isLogged = useSelector(state => state.entries.auth.logged)
  
  const dispatch = useDispatch();
  const history = useNavigate();

  function onLogoutClick() {
    dispatch(logoutUser());
    history("/login");
  }

    return (
        <Nav>
          <NavLink to="/">
            <NavIcon />
            QR Bot
          </NavLink>
          <Bars onClick={props.toggle} />
          {!props.logged ? (
            <NavMenu>
              {navItems.map((item) => {
                return (
                  <NavLink to={item.path}>
                    {item.icon}
                    <NavLinkLabel>{item.title}</NavLinkLabel>
                  </NavLink>
                );
              })}
            </NavMenu>
          ) : (
            <NavMenu>
              {navItemsWithLogin.map((item) => {
                return (
                  <NavLink to={item.path}>
                    {item.icon}
                    <NavLinkLabel onClick={item.onClick}>
                      {item.title}
                    </NavLinkLabel>
                  </NavLink>
                );
              })}
            </NavMenu>
          )}
        </Nav>
    );
  

  // <NavLink to="/info">
  //             Información
  //           </NavLink>
  //           <NavLink to="/contact-us">
  //             Contactanos
  //           </NavLink>
  //           <NavLink to="/register">
  //             Registrarme
  //           </NavLink>
  //           <NavBtnLink to="/login"> 
  //             Iniciar Sesion
  //           </NavBtnLink>

  // if(props.logged){
  //   return (
  //     <>
  //       <Nav>
  //         <Bars onClick={props.toggle} />
  //         <NavMenu>
  //           <NavItem>
  //             <MdOutlineDarkMode onClick={() => dispatch({ type: "TOGGLE" })} /> 
  //           </NavItem>
  //           <NavItem>
  //             <MdOutlineLogout onClick={() => onLogoutClick()} />
  //           </NavItem>
  //           <NavLink to="/user">
  //             <NavItem>
  //               <NavAvatar src={LogoImg}></NavAvatar>
  //             </NavItem>
  //           </NavLink>
  //         </NavMenu>
  //       </Nav>
  //     </>
  //   );
  // }
}

const mapStateToProps = (state,ownProps) => { 
  const IsLogged = state.entries.auth ? state.entries.auth.logged ? state.entries.refreshtoken : state.entries.refreshtoken.logged : false
  const isToggle = ownProps.toggle ? ownProps.toggle : false
  return {
    logged: IsLogged,
    toggle: isToggle
  }
};


export default connect(mapStateToProps, { logoutUser })(
  Navbar
);
