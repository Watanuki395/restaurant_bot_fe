import React from 'react';
import { useDispatch } from 'react-redux';
import { productoByCategoryRequested } from '../../actions/productbycategoryAction'
import { selectComponentRequested } from '../../actions/selectcomponentAction';
import {
    Tables, TableTh, TableTd,
    IconDelete, IconEdit, LinkIcon
  } from './style';

const Category = ({categoria}) => {

    const dispatch = useDispatch();

    const {description_cat, id_cat, name_cat} = categoria;
    
    const selectCategory = id_cat => {
        dispatch( productoByCategoryRequested({id_user:68, id_cat}) );
        dispatch(selectComponentRequested("productByCategory"));
    }

    return ( 
            <tr >
            <TableTd >{name_cat}</TableTd>
            <TableTd ><span className='font-weight-bold'>{description_cat} </span></TableTd>
            <TableTd >
                <button
                    type="button"
                    onClick={() => selectCategory(categoria.id_cat)}
                    className='btn btn-dark'
                >Ver más</button>
            </TableTd>
        </tr>
     );
}
 
export default Category;