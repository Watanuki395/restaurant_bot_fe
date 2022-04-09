import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { categoriesRequested } from '../../actions/categoriesAction';

import Category from './Category'

const Categories = () => {

    const dispatch = useDispatch();

    useEffect( ()=> {
            //Consultar la API
            const cargarProductos = () => dispatch( categoriesRequested() );
            cargarProductos();
            
    }, []);

    return ( 
        <h1>Hola</h1>
    );
}
 
export default Categories;