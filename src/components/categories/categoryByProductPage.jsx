import React, { Fragment, useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useTable, usePagination } from 'react-table';

import { createProductAction } from '../../actions/createproductAction';
import { productsRequested } from '../../actions/productsAction';
import { Products } from '../product/Products';
import { deleteProductAction } from '../../actions/deleteproductAction'
import { productoByCategoryRequested } from '../../actions/productbycategoryAction';
import { editProductAction } from '../../actions/editproductAction';

import {Modal, Button} from 'react-bootstrap'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
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

    const [ refresh, setRefresh ] = useState(false);

    const categoryByProduct = useSelector(state => state.entries.productbycategory.productByCategory);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => categoryByProduct, []);

    const RedirectProduct = (id_cat, id_prd) => {
      dispatch( productsRequested({id_user:68, id_cat, id_prd}) );
      history.push(`/Products/`);
    }

    const RedirectEditProduct = id_prd => {
      //dispatch( productoByCategoryRequested({id_user:68, id_cat}) );
      history.push(`/editProduct/${id_prd}`);
    }

    const RedirectDeleteProduct = id_prd => {
      if(window.confirm("¿Estás seguro?")){
        setRefresh(true);
        dispatch(deleteProductAction(id_prd));
        toast.success("Producto eliminado.");
      }
    }
    
    useEffect( () => {
      if(refresh){
        dispatch(productoByCategoryRequested()); 
        setRefresh(false); 
      }
    }, [refresh]);

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
                <button className="btn btn-primary mb-1" onClick={ () => RedirectEditProduct(row.original.id_prd) }>
                    Editar
                </button>
                <button className="btn btn-danger mb-1" onClick={ () => RedirectDeleteProduct(row.original.id_prd) }>
                    Borrar
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

    const [isReseted, setReseted] = useState(false);
    const [count, setCount] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const {id_cat} = useParams();

    const initialValues = {
        name_prd: "",
        description_prd: "",
        id_cat: Number(id_cat),
        id_user: 68,
    };

    const validationSchema = Yup.object().shape({
    name_prd: Yup.string()
      .required("Campo Requerido")
      .min(2, `Mínimo 5 caracteres`)
      .max(255, `Máximo 255 caracteres`),
    description_prd: Yup.string()
      .required("Campo Requerido")
      .min(2, `Mínimo 5 caracteres`)
      .max(255, `Máximo 255 caracteres`),
    });

    async function onHandleSubmit(data) {
    await sleep(1000);
    setReseted(true);
    let resp = dispatch(dispatch(createProductAction(data)));
    toast.success("Producto agregado.");
    setTimeout(()=> history.push(`/CategoryByProduct/${Number(id_cat)}`), 1000);
    setShow(false);
    return resp;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return ( <>

<button
          className="btn btn-dark mt-3 float-right"
          variant="primary"
          onClick={handleShow}
        >
          Agregar
        </button>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar una producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => onHandleSubmit(values)}
            >
              {({ errors, touched, isSuccess, message, isSubmitting }) => (
                <Form>
                    <section className="">
                      <section className="">
                        <section className="">
                          <div>
                            {!isSuccess ? (
                              <div>{message}</div>
                            ) : (
                              <Redirect to="dashboard" />
                            )}
                            <div className="form-container">
                              <div>
                                {!isSuccess ? (
                                  <div>{message}</div>
                                ) : (
                                  <Redirect to="dashboard" />
                                )}
                                <div className="mb-3">
                                  <label
                                    htmlFor="name_prd"
                                    className="form-label"
                                  >
                                    Nombre del producto
                                  </label>
                                  <Field
                                    type="text"
                                    className="form-text form-control"
                                    name="name_prd"
                                    id="name_prd"
                                    placeholder="Producto"
                                  />
                                  <ErrorMessage
                                    name="name_prd"
                                    component="div"
                                    className="field-error text-danger"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="description_prd"
                                    className="form-label"
                                  >
                                    Descripción
                                  </label>
                                  <Field
                                    type="description_prd"
                                    className="form-text form-control"
                                    name="description_prd"
                                    id="description_prd"
                                    placeholder="Descripción del producto"
                                  />
                                  <ErrorMessage
                                    name="description_prd"
                                    component="div"
                                    className="field-error text-danger"
                                  />
                                </div>
                                {/* <div className="mb-3">
                                  <label
                                    htmlFor="imgURL_prd"
                                    className="form-label"
                                  >
                                    Imagen
                                  </label>
                                  <Field
                                    type="imgURL_prd"
                                    className="form-text form-control"
                                    name="imgURL_prd"
                                    id="imgURL_prd"
                                    placeholder="Imagen del producto"
                                  />
                                  <ErrorMessage
                                    name="imgURL_prd"
                                    component="div"
                                    className="field-error text-danger"
                                  />
                                </div> */}
                                <div className="d-grid gap-2 py-3">
                                  <button
                                    type="submit"
                                    disabled={
                                      count > 0 ? true : false || isSubmitting
                                    }
                                    className="btn btn-dark btn-block mb-2"
                                  >
                                    {isSubmitting && (
                                      <span className="spinner-border spinner-border-sm mr-1"></span>
                                    )}
                                    Crear
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </section>
                    </section>
                </Form>
              )}
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    
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