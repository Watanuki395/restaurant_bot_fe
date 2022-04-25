import React, { useEffect } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';

import Categories from '../categories/CategoriesPage'
import ProductByCategory from '../productByCategory/productByCategory';


import {Container,
Col4,
Col8}
from "./style";


function DashboardPage(){

  useEffect(()=>{
    //jugar con el useState para cambiarlo, pasarlo por props o alguna manera
  });
  
  const categorias = useSelector(state => state.entries.categories.categories);
  const productosPorCategorias = useSelector(state => state.entries.ProductByCategory);

    return (
      <>
        <Container>
          <Col4></Col4>
          <Col8>
            {categorias ? <Categories/>  : <ProductByCategory/>}    
               
          </Col8>
        </Container>
      </>
    );
}



const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(DashboardPage)
