import styled from "styled-components";

export const FooterSite = styled.footer`
  background-color: #000;
  padding-top: 40px;
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
  margin: 0 15px;
  @media (min-width: 768px) {
    margin: 0;
  }
`;

export const FooterInfoAbout = styled.p`
  color: white;
  margin: 10px 15px;
  @media (min-width: 768px) {
    margin: 0;
  }
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
display: inline-block;
  @media (min-width: 768px){
      display: inline-block;
  }
`;

export const FooterCopyRight = styled.p`
  background-color: #202020;
  margin-top: 50px 0 0 0;
  padding: 20px;
  margin-bottom: 0;
`;
