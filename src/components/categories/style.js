import styled from "styled-components";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";


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
  border: 1px solid #fff;
  color: #000;
`;

export const SButton = styled.button`
  border: none;
  background-color: rgba(212, 255, 241, 0.76);
`;

export const PButton = styled.button`
  border: none;
  background-color: #fff;
`;

export const IconDelete = styled(FaTrash)`
  color: #BA1C1C;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
  `;

export const IconEdit = styled(FaEdit)`
  color: #5BC1F5;
  font-size: 20px;
  cursor: pointer;
  `;

export const IconSee = styled(FaEye)`
  color: gray;
  font-size: 20px;
  cursor: pointer;
`;

export const IconDeletecon = styled(FaTrash)`
  color: #BA1C1C;
  font-size: 20px;
  margin-right: 10px;
  `;

  export const ModalDelete = styled.div`
    background: rgba(204, 198, 198, 0.884)
    padding: 30px;
    margin: 50px 0 50px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #0000
    position: relative;
    `;