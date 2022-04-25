import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';

import { productoByCategoryRequested } from '../../actions/productbycategoryAction';
import ProductByOneCategory from './productByOneCategory';

const ProductByCategory = () => {

    const dispatch = useDispatch();

    useEffect( ()=> {
        const cargarProductosCategoria = () => dispatch( productoByCategoryRequested() );
        cargarProductosCategoria();
    }, []);


    const productsByCategories = useSelector(state => state.entries.response);
    console.log(productsByCategories);
    return ( 
        <Fragment>
            <table className='table'>
                <thead className='table-dark'>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    { productsByCategories.length === 0 ? 'No hay productos!' : (
                        productsByCategories.map(productByCategory => (
                            <ProductByOneCategory
                                key={productByCategory.id_prd}
                                productByCategory={productByCategory}
                            /> 
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default ProductByCategory;