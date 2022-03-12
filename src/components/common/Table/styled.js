import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";

export const Tables = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 25px;
`;

export const TableTh = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #5C57E6;
  color: white;
  border: 1px solid;
`;

export const TableTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  border: 1px solid;
  color: #fff;
`;

export const IconDelete = styled(FaTrash)`
  color: red;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;

`;

export const IconEdit = styled(FaEdit)`
  color: blue;
  font-size: 20px;
  cursor: pointer;
`;
