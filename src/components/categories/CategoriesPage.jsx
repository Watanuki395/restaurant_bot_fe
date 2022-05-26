import React, { Fragment, useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { useTable, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import {Modal, Button} from 'react-bootstrap';
import { GrAdd } from "react-icons/gr";

import { createCategoryAction } from '../../actions/createcategoryAction';
import { categoriesRequested } from '../../actions/categoriesAction';
import { selectComponentRequested } from '../../actions/selectcomponentAction';
import { deleteProductAction } from '../../actions/deletecategoryAction';
import { productoByCategoryRequested } from '../../actions/productbycategoryAction'

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {IconDelete, IconEdit, IconSee, IconPlus, SButton}from "./style";
import "../../index.css";

const Categories = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [isReseted, setReseted] = useState(false);
    const [count, setCount] = useState(0);
    
    useEffect( ()=> {
      
      const cargarProductos = () => dispatch( categoriesRequested() );
      cargarProductos();
      
    }, []);
    
    //#region  UseSelector
    
    let categorias = useSelector(state => state.entries.categories.categories);
    const error = useSelector( state => state.entries.categories.error );
    const loading = useSelector( state => state.entries.categories.isFetching );

    //#endregion

    //#region React-Table
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => [...categorias], [categorias]);

    const redirectEdit = category => {
      history.push(`/categoryEdit/${category.id_cat}`);
    }

    const redirectProductByCategory = idCategory => {
      let id_cat = idCategory.id_cat;
      dispatch( productoByCategoryRequested({id_user:68, id_cat}) );
      history.push(`/CategoryByProduct/${idCategory.id_cat}`);
    }

    const tableHooks = (hooks) => {
       hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "Edit",
          Header: "Edit",
          Cell: ({row}) => (
            <>
            <SButton className="mb-1" onClick={ () => redirectProductByCategory(row.original) }>
              <IconSee></IconSee>
            </SButton>
            
            <SButton className={isEvent(row.id) ? "bg-green-400" : ""} onClick={ () => redirectEdit(row.original)}>
              <IconEdit></IconEdit>
            </SButton>

            <SButton className="" onClick={()=> dispatch(deleteProductAction(row.original.id_cat))}>
              <IconDelete></IconDelete>
            </SButton>
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

    const isEvent = id => id % 2 ===0;

    const {pageIndex} = state;
    //#endregion
    
    //#region  Modal Agregar
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const initialValues = {
        name_cat: "",
        description_cat: "",
    };

    const validationSchema = Yup.object().shape({
    name_cat: Yup.string()
      .required("Campo Requerido")
      .min(2, `Mínimo 5 caracteres`)
      .max(255, `Máximo 255 caracteres`),
    description_cat: Yup.string()
      .required("Campo Requerido")
      .min(2, `Mínimo 5 caracteres`)
      .max(255, `Máximo 255 caracteres`),
    });

    async function onHandleSubmit(data) {
    await sleep(1000);
    setReseted(true);
    if(data){
      //let resp = dispatch(createCategoryAction(data));
      dispatch(createCategoryAction(data));
      toast.success("Categoría creada!");
      setTimeout(() => dispatch( categoriesRequested() ), 500);
      setShow(false);
      setTimeout(() => history.push("/dashboard"), 500);
      //return resp;
    }
    
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const response = useSelector((state) => state.entries.createcategory);
      //#endregion

    

    return (
      <Fragment>
        <div className='container'>
        {error ? (
          <p className="font-weight-bold alert alert-danger text-center mt-4">
            Hubo un error...
          </p>
        ) : null}

        {loading ? <p className="text-center">Cargando...</p> : null}
        
        <button
          className="btn btn-warning btn-plus mt-3"
          variant="primary"
          onClick={handleShow}
        >
          <GrAdd/>
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar una categoría nueva</Modal.Title>
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
                                    htmlFor="name_cat"
                                    className="form-label"
                                  >
                                    Nombre la categoría
                                  </label>
                                  <Field
                                    type="text"
                                    className="form-text form-control"
                                    name="name_cat"
                                    id="name_cat"
                                    placeholder="Categoría"
                                  />
                                  <ErrorMessage
                                    name="name_cat"
                                    component="div"
                                    className="field-error text-danger"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="description_cat"
                                    className="form-label"
                                  >
                                    Descripción
                                  </label>
                                  <Field
                                    type="description_cat"
                                    className="form-text form-control"
                                    name="description_cat"
                                    id="description_cat"
                                    placeholder="Descripción de la categoría"
                                  />
                                  <ErrorMessage
                                    name="description_cat"
                                    component="div"
                                    className="field-error text-danger"
                                  />
                                </div>
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
          <thead className='thead-dark'>
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
                <tr {...row.getRowProps()} className={isEvent(idx) ? "bg-green-400 bg-opacity-10" : ""}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='text-center mt-2'>
          <button
            className="btn btn-dark m-1"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Anterior
          </button>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            className="btn btn-dark"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Siguiente
          </button>
        </div>
        </div>
      </Fragment>
    );
}
 
const mapStateToProps = (response) => ({
    response,
});
export default connect(mapStateToProps)(Categories);