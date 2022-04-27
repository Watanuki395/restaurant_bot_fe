import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import ProductByOneCategory from './productByOneCategory';

const ProductByCategory = () => {

    const productsByCategories = useSelector(state => state.entries.productbycategory.productByCategory);

    return ( 
        <Fragment>
            <table className='table mt-5'>
                <thead className='table-dark'>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    { productsByCategories === 'undefined' ? 'No hay productos!' : (
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