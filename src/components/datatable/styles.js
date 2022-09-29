import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";


export const DataTableWrapper = styled.div`
    height: 700px;
    padding: 20px;


    @media screen and (max-width: 568px) {
        width:100%;
        height: 500px;
    }
`;

export const DatatableTitle = styled.div`
    width: 100%;
    font-size: 24px;
    color: gray;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 568px) {
        width:100%;
        height: 500px;
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


