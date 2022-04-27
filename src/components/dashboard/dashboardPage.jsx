import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';

import Categories from '../categories/CategoriesPage'
import ProductByCategory from '../productByCategory/productByCategory';
import Products from '../product/Products';

import {Container,
Col4,
Col8}
from "./style";


function DashboardPage(props){

  const componentSelected = useSelector(state => state.entries.selectcomponent.component.payload);

const renderContent = React.useCallback(() => {
  switch(componentSelected) {
    case 'Categories': 
      return <Categories />;
    
    case 'productByCategory': 
      return <ProductByCategory />;

      case 'products': 
      return <Products />;

    default: 
      return <Categories />;
    
  }
}, [componentSelected]);

      
    return (
      <>
        <Container>
          <Col4></Col4>
          <Col8>

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
