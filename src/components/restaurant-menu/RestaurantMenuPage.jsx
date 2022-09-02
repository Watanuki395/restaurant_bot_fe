import React from 'react';
import { connect, useSelector } from 'react-redux';

import Categories from '../categories/CategoriesPage'

import {Container}
from "./style";


function RestaurantMenu(props){
  
    return (
      <>
        <Container>
          <Categories/>
        </Container>
      </>
    );
}

const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(RestaurantMenu)
