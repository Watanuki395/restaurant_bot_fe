import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';

import { categoriesRequested } from '../../actions/categoriesAction';


import {Container,
Col4,
Col8}
from "./style";
import Table from '../common/Table/Table';

import { Formik, Field, Form, ErrorMessage } from "formik";


function DashboardPage(){

  const dispatch = useDispatch();

    /* useEffect( ()=> {
            //Consultar la API
            const cargarProductos = () => dispatch( categoriesRequested() );
            cargarProductos();
            
    }, []); */

    const onHandleSubmit = e =>{
      e.preventDefault();
      let resp = dispatch(categoriesRequested())
      return resp
    };

    return (
      <>
        <Container>
          <Col4></Col4>
          <Col8>
            {/* <Table data={data}/> */}
            <form
            onSubmit={onHandleSubmit}
            >
              <button
              type="submit"
              className="btn btn-dark btn-block mb-2"
              value="Enviar"
              >Enviar</button>
            </form>
            
          </Col8>
        </Container>
      </>
    );
}

/* const data = [
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
] */

/* export default connect(null,{
  categoriesRequested
})(DashboardPage); */
const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(DashboardPage)
