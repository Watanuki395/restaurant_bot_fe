import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {Container,
Col4,
Col8}
from "./style";
import Table from '../common/Table/Table';



function DashboardPage(){
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  let isMounted = true;
  const [number, setNumber] = useState(0);

  const handleSubmit = async() =>{
      //setNumber(number+1)
      //console.log(number);

      const response = await axiosPrivate.get('http://localhost:8081/api/product/product?id_prd=1&id_user=68&id_cat=1',
        {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        }
    );
    console.log(JSON.stringify(response?.data));
    }
    
    return (
      <>
        <Container>
          <Col4></Col4>
          <Col8>
            <Table data={data}/>
            <button onClick={() =>handleSubmit()}>
            refrescar
          </button>
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
const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(DashboardPage);
