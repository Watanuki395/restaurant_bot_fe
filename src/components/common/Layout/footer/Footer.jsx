import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaCopyright } from 'react-icons/fa';

import { FooterAbout, 
    FooterContainer, 
    FooterSite, 
    FooterSocialMedias,
    FooterLinks, 
    FooterInfoAbout,
    FooterCopyRight,
    FooterAboutUs} from './style';

const Footer = (props) => {
    
    return(
        <>
        <FooterSite>
            <FooterContainer>
                <FooterAbout>
                    <FooterAboutUs>Sobre Nosotros</FooterAboutUs>
                    <FooterInfoAbout>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Laborum veritatis ad enim provident aperiam
                    eum aliquid quasi ducimus, similique maiores
                    </FooterInfoAbout>
                </FooterAbout>
                <FooterSocialMedias>
                    <FooterLinks href='https://www.facebook.com/galer.ia.the.company'><FaFacebookF /></FooterLinks>
                    <FooterLinks href='#'><FaInstagram /></FooterLinks>
                    <FooterLinks href='#'><FaYoutube /></FooterLinks>
                    <FooterLinks href='#'><FaWhatsapp /></FooterLinks>
                </FooterSocialMedias>
            </FooterContainer>
            <FooterCopyRight> Copyrights &copy; {new Date().getFullYear()} galerIA The Company</FooterCopyRight>
        </FooterSite>
        </>
    )
} 

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default(
    Footer
  );