import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

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
                    <FooterLinks>F</FooterLinks>
                    <FooterLinks>I</FooterLinks>
                    <FooterLinks>Y</FooterLinks>
                    <FooterLinks>T</FooterLinks>
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