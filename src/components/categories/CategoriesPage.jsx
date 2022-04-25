import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';

import { categoriesRequested } from '../../actions/categoriesAction';

import Category from './Category';
import {
    Tables, TableTh, TableTd,
    IconDelete, IconEdit, LinkIcon
  } from './style';

const Categories = (props) => {

    const dispatch = useDispatch();

     useEffect( ()=> {
            const cargarProductos = () => dispatch( categoriesRequested() );
            cargarProductos();
    }, []);

    const categorias = useSelector(state => state.entries.categories.categories);
    const error = useSelector( state => state.entries.categories.error );
    const loading = useSelector( state => state.entries.categories.isFetching );

    return ( 
        <Fragment>
            { error ? <p 
                className='font-weight-bold alert alert-danger text-center mt-4'
            >Hubo un error</p> : null }

            { loading ? <p className='text-center'>Cargando...</p> : null}
            <button className='btn btn-primary mt-3 float-right'>Agregar</button>
            <Tables className='table'>
                <thead className='table-dark'>
                    <tr>
                        <TableTh scope='col'>Nombre</TableTh>
                        <TableTh scope='col'>Descripción</TableTh>
                        <TableTh scope='col'>Acciones</TableTh>
                    </tr>
                </thead>
                <tbody>

                    { categorias.length === 0 ? 'No hay productos!' : (
                        categorias.map(categoria => (
                            <Category
                                key={categoria.id_cat}
                                categoria={categoria}
                            /> 
                        ))
                    )}
                </tbody>
            </Tables>
        </Fragment>
    );
}
 
const mapStateToProps = (response) => ({
    response,
});
export default connect(mapStateToProps)(Categories);