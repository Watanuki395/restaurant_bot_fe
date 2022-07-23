import React from 'react';
import { connect, useSelector } from 'react-redux';

import Categories from '../categories/CategoriesPage'

import {Container,
Col4,
Col8}
from "./style";


function DashboardPage(props){
  
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

export default connect(mapStateToProps)(DashboardPage)
