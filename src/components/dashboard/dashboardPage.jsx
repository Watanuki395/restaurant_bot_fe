import React from 'react';
import { Link } from "react-router-dom";

import {Container,
Col4,
Col8}
from "./style";
import Table from '../common/Table/Table';

function DashboardPage(){
    return (
      <>
        <Container>
          <Col4></Col4>
          <Col8>
            <Table data={data}/>
          </Col8>
        </Container>
      </>
    );
}

const data = [
  {
    name: "Pan",
    amount: 1
  },
  {
    name: "Carne",
    amount: 3
  },
  {
    name: "Leche",
    amount: 6
  },
  {
    name: "Huevos",
    amount: 15
  },
  {
    name: "Fruta",
    amount: 32
  },
]

export default DashboardPage;
