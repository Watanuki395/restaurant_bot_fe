import React, { Fragment, useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { useTable, usePagination } from 'react-table';

import { productsRequested } from '../../actions/productsAction';
import { Products } from '../product/Products';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

const CategoryByProduct = () => {

    const COLUMNS = [
        {
            Header: '#',
            accessor: 'id_cat'
        },
        {
            Header: 'Producto',
            accessor: 'producto',
        },
        {
            Header: 'Descripción',
            accessor: 'descripcion',
        }
        ,
        {
            Header: 'Categoría',
            accessor: 'categoria',
        }
    ]

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect( () => {

    });

    const categoryByProduct = useSelector(state => state.entries.productbycategory.productByCategory);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => categoryByProduct, []);

    const RedirectProduct = (id_cat, id_prd) => {
      dispatch( productsRequested({id_user:68, id_cat, id_prd}) );
      history.push(`/Products/`);
    }

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
         ...columns,
         {
           id: "Product",
           Header: "Product",
           Cell: ({row}) => (
             <>
                <button className="btn btn-dark mb-1" onClick={ () => RedirectProduct(row.original.id_cat, row.original.id_prd) }>
                    Producto
                </button>
             </>
           )
         }
       ]) 
     }

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow
    } = useTable(
        {
            columns,
            data
        },
        usePagination,
        tableHooks
    ); 

    const {pageIndex} = state;

    return ( <>
         <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} scope="col">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, idx) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            className="btn btn-dark"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Anterior
          </button>
          <button
            className="btn btn-dark"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Siguiente
          </button>
        </div> 
    </> );
}
 
export default CategoryByProduct;