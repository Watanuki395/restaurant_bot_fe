import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

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
                    <FooterLinks><FaFacebookF /></FooterLinks>
                    <FooterLinks><FaInstagram /></FooterLinks>
                    <FooterLinks><FaYoutube /></FooterLinks>
                    <FooterLinks><FaWhatsapp /></FooterLinks>
                </FooterSocialMedias>
            </FooterContainer>
            <FooterCopyRight>Derechos Reservados</FooterCopyRight>
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