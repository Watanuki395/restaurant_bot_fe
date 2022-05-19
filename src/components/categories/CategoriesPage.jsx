import React, { Fragment, useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { useTable, usePagination } from 'react-table';
import { COLUMNS } from './Columns';
import {Modal, Button} from 'react-bootstrap'

import { createCategoryAction } from '../../actions/createcategoryAction';
import { categoriesRequested } from '../../actions/categoriesAction';
import { selectComponentRequested } from '../../actions/selectcomponentAction';
import { deleteProductAction } from '../../actions/deletecategoryAction';
import { productoByCategoryRequested } from '../../actions/productbycategoryAction'

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

const Categories = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [isReseted, setReseted] = useState(false);
    const [count, setCount] = useState(0);

    useEffect( ()=> {
        

        let isSuccess = response ? response.success : false;
        //Revisar toda esta sección, la redirección cuando trae o no mensaje.
        if (isSuccess && isReseted) {
          let msg = response.response.msg ? response.response.msg : null;
          const error = response.error ? response.error : null;
          setReseted(false);
          setCount(count + 1);
          console.log(msg);
          if (msg === null) {
            toast.success("Categoría creada.", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              history.push("/dashboard");
            }, 2000);
            msg = null;
          } else {
            setReseted(false);
            if (msg !== "") {
              toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
            } else {
              toast.error("Error al crear la categoría.", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
            msg = null;
            setCount(count - 1);
          }
        }
        
        const cargarProductos = () => dispatch( categoriesRequested() );
        dispatch(selectComponentRequested("Categories"));
        cargarProductos();

    }, [response]);

    const categorias = useSelector(state => state.entries.categories.categories);
    const error = useSelector( state => state.entries.categories.error );
    const loading = useSelector( state => state.entries.categories.isFetching );

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => categorias, []);

    const redirectEdit = category => {
      history.push(`/categoryEdit/${category.id_cat}`);
    }

    const redirectProductByCategory = idCategory => {
      let id_cat = idCategory.id_cat;
      console.log(id_cat);
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
            <button className="btn btn-dark mb-1" onClick={ () => redirectProductByCategory(row.original) }>
              Ver Productos
            </button>
            <button className="btn btn-dark mr-3" onClick={ () => redirectEdit(row.original)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={()=> dispatch(deleteProductAction(row.original.id_cat))}>
              Delete
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
    let resp = dispatch(createCategoryAction(data));
    return resp;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const response = useSelector((state) => state.entries.createcategory);

    return (
      <Fragment>
        {error ? (
          <p className="font-weight-bold alert alert-danger text-center mt-4">
            Hubo un error...
          </p>
        ) : null}

        {loading ? <p className="text-center">Cargando...</p> : null}
        <button
          className="btn btn-dark mt-3 float-right"
          variant="primary"
          onClick={handleShow}
        >
          Agregar
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
      </Fragment>
    );
}
 
const mapStateToProps = (response) => ({
    response,
});
export default connect(mapStateToProps)(Categories);