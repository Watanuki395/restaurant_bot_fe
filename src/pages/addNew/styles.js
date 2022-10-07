import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";


export const NewCatWrapper = styled.div`
    height: 700px;
    padding: 20px;
    display: flex;


    @media screen and (max-width: 568px) {
        width:100%;
        height: 500px;
    }
`;

export const NewCatTitle = styled.div`
    width: 100%;
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    display: flex;
    justify-content: space-between;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);

    @media screen and (max-width: 568px) {
        width:100%;
        font-size: 20px;
    }
`;

export const ProdLink = styled(Link)`
  text-decoration: none;
  color: green;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid green;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #1b1b1c;
    color: #d6a10d;
  }

  &.active {
    color: #d6a10d;
  }

  @media screen and (max-width: 768px) {
    //display: none;
  }
`;

export const ViewLink = styled(Link)`
      display:flex;
      padding: 2px 5px;
      border-radius: 5px;
      color: ${({ theme }) => theme.viewText};
      border: 1px dotted ${({ theme }) => theme.viewText};
      cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #d6a10d;
  }

  &.active {
    color: #d6a10d;
  }

  @media screen and (max-width: 768px) {
    //display: none;
  }
`;

export const DeleteButtom = styled.div`
      display:flex;
      padding: 2px 5px;
      border-radius: 5px;
      color: ${({ theme }) => theme.deleteText};
      border: 1px dotted ${({ theme }) => theme.deleteText};
      cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #d6a10d;
  }

  &.active {
    color: #d6a10d;
  }

  @media screen and (max-width: 768px) {
    //display: none;
  }
`;

export const TableButtomWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;


