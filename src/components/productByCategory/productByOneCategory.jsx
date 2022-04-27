import React from 'react'
import { useDispatch } from 'react-redux';
import { productsRequested } from '../../actions/productsAction';
import { selectComponentRequested } from '../../actions/selectcomponentAction';

const ProductByOneCategory = ({productByCategory}) => {

    const {producto, descripcion, categoria, id_prd, id_cat, id_user} = productByCategory;

    const dispatch = useDispatch();

    const selectProduct = (id_prd,id_cat) => {
        dispatch( productsRequested({id_user:68, id_prd, id_cat}) );
        dispatch(selectComponentRequested("products"));
    }

    return ( 
        <tr>
            <td >{producto}</td>
            <td ><span className='font-weight-bold'>{descripcion} </span></td>
            <td >
                <button
                    type="button"
                    onClick={() => selectProduct(productByCategory.id_prd, productByCategory.id_cat)}
                    className='btn btn-danger'
                >Ver productos</button>
            </td>
        </tr>
     );
}
 
export default ProductByOneCategory;