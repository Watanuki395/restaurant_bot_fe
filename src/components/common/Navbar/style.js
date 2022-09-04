import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import {FaBars} from 'react-icons/fa'
import {BiRestaurant} from 'react-icons/bi';

export const Nav = styled.nav`
    background:#000;
    height:80px;
    border-bottom: 0.5px solid rgb(231, 228, 228);
    display:flex;
    align-items: center;
    justify-content:space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index:10;
    position:sticky;
    top:0;
    font-size: 14px;
    color: #555;

    @media (min-width: 768px) {
    height: 50px;
    }
`;

export const NavLink = styled(Link)`
    color: whitesmoke;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    border-radius: 5px;
    justify-content: space-between;
    transition: 0.2s all ease-out;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #1b1b1c;
        color: #d6a10d;
    }

    &.active{
        color: #d6a10d;
    }

    @media screen and (max-width: 768px){
        display: none;
    }
`;
export const NavLinkLabel = styled.span`
    margin-left: 0.5rem;
    font-size: 1rem;
    justify-content: space-between;

    @media screen and (max-width: 768px){
        display: none;
    }

`;

export const Bars = styled(FaBars)`
    display:none;
    color: #fff;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    flex: 30%;
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;

    @media screen and (max-width: 768px){
        display: none;
    }
`;

export const NavItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
    font-size:25px;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: #d6a10d;
    }

`;
export const NavAvatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px){
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border:none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    margin-left: 24px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;

export const NavIcon = styled(BiRestaurant)`
margin-right: .8rem;
transition: all .5s ease;
font-weight: bold;
font-size:25px;

&:hover {
    transform: scale(1.5);
}
`;

