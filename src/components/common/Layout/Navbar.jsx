import React from 'react';
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
  Bars
}from './style'

const Navbar = ({toggle}) => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  function onLogoutClick(e) {
    //e.preventDefault();
    //this.props.clearCurrentProfile();
    //this.props.logoutUser();
  }


    const logged = true
    const response  = true //props.response.entries.auth;

    //this.isAuthenticated = true

 
    return (
      <>
        <Nav>
          <NavLink to="/" >
            <img src={require('../../../imgs/logo2.png')} alt=""/>
          </NavLink>
          <Bars onClick={toggle}/>
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
          {/*<NavBtn>
            <NavBtnLink to="/login"> Iniciar Sesion</NavBtnLink>
          </NavBtn>*/}
        </Nav>
      </>
    );
}

// Navbar.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  Navbar
);
