import React from 'react'


const ProductByOneCategory = ({productByCategory}) => {

    const {producto, descripcion, categoria} = productByCategory;


    return ( 
        <tr>
            <td >{producto}</td>
            <td ><span className='font-weight-bold'>{descripcion} </span></td>
            <td >
                <button
                    type="button"
                    className='btn btn-dark'
                >Ver más</button>
            </td>
        </tr>
     );
}
 
export default ProductByOneCategory;