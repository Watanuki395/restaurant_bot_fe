import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';

import Categories from '../categories/CategoriesPage'
import ProductByCategory from '../productByCategory/productByCategory';


import {Container,
Col4,
Col8}
from "./style";


function DashboardPage(props){

  const categorias = useSelector(state => state.entries.categories.categories);
  const productosPorCategorias = useSelector(state => state.entries.productbycategory.productByCategory);
  const componentSelected = useSelector(state => state.entries.selectcomponent.component.payload);
  
/* renderSwitch(componentSelected){
  switch(componentSelected) {
    case 'Categories':
      return <Categories />;
    case 'ProductByCategory':
      return <ProductByCategory />;
    default:
      return null; //Componente error
  }
} */

const renderContent = React.useCallback(() => {
  switch(componentSelected) {
    case 'Categories': 
      return <Categories />;
    
    case 'productByCategory': 
      return <ProductByCategory />;

    default: 
      return <Categories />;
    
  }
}, [componentSelected]);

      
  console.log(componentSelected);
    return (
      <>
        <Container>
          <Col4></Col4>
          <Col8>

          {/* {this.renderSwitch(componentSelected)} */}
          {renderContent()}

          </Col8>
        </Container>
      </>
    );
}



const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(DashboardPage)
