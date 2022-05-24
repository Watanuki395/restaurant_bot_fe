import React, { Fragment,useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";





const Products = () => {
  const dispatch = useDispatch();

    const products = useSelector(state => state.entries.products.products);

        return ( 
    <Fragment>
      

        <table className='table mt-5'>
                <thead className='table-dark'>
                    <tr>
                        <th scope='col'>Producto</th>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Categoría</th>
                    </tr>
                </thead>
                <tbody>

                <tr>
                    <td >{products.producto}</td>
                    <td ><span className='font-weight-bold'>{products.descripcion} </span></td>
                    <td >{products.categoria}</td>
        </tr>

                </tbody>
            </table>
    </Fragment>
    );
}
 
export default Products;