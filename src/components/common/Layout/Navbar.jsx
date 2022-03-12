import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { logoutUser } from '../../../actions/loginActions';
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Bars,
  NavIcon
}from './style'

const Navbar = (props) => {
  
 // const isLogged = useSelector(state => state.entries.auth.logged)
  
  const dispatch = useDispatch();
  const history = useHistory();

  function onLogoutClick() {
    dispatch(logoutUser());
    history.push("/login");
  }

  if(!props.logged){
    return (
      <>
        <Nav>
          <NavLink to="/" >
            <NavIcon/>QR Bot
          </NavLink>
          <Bars onClick={props.toggle}/>
            <NavMenu>
            <NavLink to="/info">
              Información
            </NavLink>
            <NavLink to="/contact-us">
              Contactanos
            </NavLink>
            <NavLink to="/register">
              Registrarme
            </NavLink>
            <NavBtnLink to="/login"> 
              Iniciar Sesion
            </NavBtnLink>
          </NavMenu>
        </Nav>
      </>
    );
  }
  if(props.logged){
    return (
      <>
        <Nav>
          <NavLink to="/" >
            <NavIcon/>QR Bot
          </NavLink>
          <Bars onClick={props.toggle}/>
            <NavMenu>
            <NavLink to="/user">
              Usurio
            </NavLink>
            <NavLink to="/product">
              Producto
            </NavLink>
            <NavLink to="/reports">
              Reportes
            </NavLink>
            <NavLink to="/support"> 
              Soporte
            </NavLink>
            <button className='nav-link active' onClick={onLogoutClick}>
                      Salir
            </button>
          </NavMenu>
        </Nav>
      </>
    );
  }
    
}

const mapStateToProps = (state,ownProps) => { 
  const IsLogged = state.entries.auth
  ? state.entries.auth.logged
  : false;
  const isToggle = ownProps.toggle ? ownProps.toggle : false
  return {
    logged: IsLogged,
    toggle: isToggle
  }
};


export default connect(mapStateToProps, { logoutUser })(
  Navbar
);
