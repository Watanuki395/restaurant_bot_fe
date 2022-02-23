import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 780px) {
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
  display: flex;
  align-items: center;
  //margin-right: -24px;

  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  border: none;
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

//FOOTER

export const FooterSite = styled.footer`
  background-color: #000;
  padding-top: 40px;
  margin-top: 60px;
  color: #ffffff;
  text-align: center;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow: auto;
`;

export const FooterAbout = styled.section`
  @media (min-width: 768px) {
    float: left;
    width: 40%;
    text-align: left;
    margin-left: 10%;
  }
`;

export const FooterAboutUs = styled.p`
  font-size: 20px;
`;

export const FooterInfoAbout = styled.p`
  color: white;
`;

export const FooterSocialMedias = styled.section`
color: #ffffff;
font-size: 2rem;
text-align: center;
display: block;
padding: 20px 0;
@media (min-width: 768px) {
    float: right;
    width: 40%;
    text-align: right;
    margin-right: 10%;
  }
`;

export const FooterLinks = styled.a`
color: #ffffff;
cursor: pointer;
text-decoration: none; 
font-size: 22px;
display: block;            
text-align: center;
padding: 20px;
  @media (min-width: 768px){
      display: inline-block;
  }
`;

export const FooterCopyRight = styled.p`
  background-color: #202020;
  margin-top: 50px 0 0 0;
  padding: 20px;
`;
