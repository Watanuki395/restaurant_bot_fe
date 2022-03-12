import React from 'react'
import { 
    SidebarContainer,
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
    } from './style'
    import { connect, useDispatch } from 'react-redux';
    import { logoutUser } from '../../../actions/loginActions';

const Sidebar = (props) => {

if(!props.logged){
            return (
                <SidebarContainer isOpen={props.isOpen} onClick={props.toggle}>
                    <Icon onClick={props.toggle}>
                        <CloseIcon />
                    </Icon>
                    <SidebarWrapper>
                        <SidebarMenu>
                            <SidebarLink to="/info">
                                Información
                            </SidebarLink>
                            <SidebarLink to="/contact-us">
                                Contactanos
                            </SidebarLink>
                            <SidebarLink to="/register">
                                Registrarme
                            </SidebarLink>
                        </SidebarMenu>
                        <SideBtnWrap>
                            <SidebarRoute to="/login">
                                Iniciar Sesion
                            </SidebarRoute>
                        </SideBtnWrap>
                    </SidebarWrapper>
                </SidebarContainer>
            )
        }
if(props.logged){
    return (
        <SidebarContainer isOpen={props.isOpen} onClick={props.toggle}>
            <Icon onClick={props.toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/user">
                        Usuario
                    </SidebarLink>
                    <SidebarLink to="/product">
                        Productos
                    </SidebarLink>
                    <SidebarLink to="/reports">
                        Reportes
                    </SidebarLink>
                    <SidebarLink to="/support">
                        Soporte
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to="/login">
                        Salir
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}
    
}


const mapStateToProps = (state, ownProps) => { 
    const IsLogged = state.entries.auth
    ? state.entries.auth.logged
    : false;
    const isToggle = ownProps.toggle ? ownProps.toggle : false
    const isOpen = ownProps.isOpen ? ownProps.isOpen : false
    return {
        logged: IsLogged,
        toggle: isToggle,
        isOpen: isOpen
        }
    };


export default connect(mapStateToProps, { logoutUser })(
    Sidebar
);

