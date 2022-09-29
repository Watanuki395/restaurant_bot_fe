import styled from "styled-components";
//import { motion } from 'framer-motion';

export const WidgetTitle = styled.h2`
  text-align: center;
  font-size: clamp(1.3rem, 13vw, 3.1rem);
  line-height: 1.06;
  letter-spacing: 0.4rem;
  margin: auto;
`;

export const WidgetTextWrapper = styled.div`
  position: relative;
  padding: 0 0 20px;
  margin-bottom: 4rem;
`;

export const WidgetWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1.5rem;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 1rem;
  }

  @media screen and (max-width: 568px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const WidgetColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  padding: 10px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  border-radius: 10px;
`;

export const WidgetContent = styled.div`
  display: flex;
  flex-direction:column;
  flex-flow: column wrap;
  justify-content: space-between;
`;

export const WidgetIconWrapper = styled.div`
  align-self: flex-end;
  font-size: 18px;
`;
export const WidgetName = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 2px;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    font-weight: 400;
    font-size: 1rem;
    letter-spacing: 1.3px;
  }
`;
export const WidgetText = styled.p`
  margin: 1rem 0 auto;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.73;
  letter-spacing: 0.5px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const WidgetCounter = styled.span`
  font-size: 28px;
  font-weight: 300;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    font-size: 18px;
    font-weight: 200;
  }
`;

export const WidgetLink = styled.span`
  width: max-content;
  font-size: 11px;
  border-bottom: 1px solid gray;
  align-self: flex-start;
`;

export const WidgetPercentage = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  align-self: flex-end;
  color: ${({ perc }) => (perc > 0 ? 'green' : 'red')};
`;
