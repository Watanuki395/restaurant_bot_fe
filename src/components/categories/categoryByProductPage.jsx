import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import { GrAdd } from "react-icons/gr";
import { IconDelete, IconEdit, IconSee, IconPlus, PButton } from "./style";

import { createProductAction } from "../../actions/createproductAction";
import { productsRequested } from "../../actions/productsAction";
import { Products } from "../product/Products";
import { deleteProductAction } from "../../actions/deleteproductAction";
import { productoByCategoryRequested } from "../../actions/productbycategoryAction";
import { editProductAction } from "../../actions/editproductAction";

import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

const CategoryByProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const cargarProductoCat = () =>
      dispatch(productoByCategoryRequested({ id_user: 68, id_cat }));
    cargarProductoCat();
  }, []);

  //#region UseSelector and states

  const [isReseted, setReseted] = useState(false);
  const [count, setCount] = useState(0);

  const categoryByProduct = useSelector(
    (state) => state.entries.productbycategory.productByCategory
  );

  //#endregion

  //#region UseTable

  const COLUMNS = [
    /* {
      Header: "#",
      accessor: "id_prd",
    }, */
    {
      Header: "Producto",
      accessor: "producto",
    },
    {
      Header: "Descripción",
      accessor: "descripcion",
    },
    {
      Header: "Categoría",
      accessor: "categoria",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => [...categoryByProduct], [categoryByProduct]);

  const RedirectEditProduct = (id_prd, id_cat) => {
    //dispatch( productoByCategoryRequested({id_user:68, id_cat}) );
    history.push(`/editProduct/${id_prd}`);
  };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Product",
        Header: "Product",
        Cell: ({ row }) => (
          <>
            <PButton
              className="mb-1"
              onClick={() =>
                RedirectProduct(row.original.id_cat, row.original.id_prd)
              }
            >
              <IconSee></IconSee>
            </PButton>
            <PButton
              className="mb-1"
              onClick={() => RedirectEditProduct(row.original.id_prd, row.original.id_cat)}
            >
              <IconEdit></IconEdit>
            </PButton>
            <PButton
              className="mb-1"
              onClick={() => ConfirmDelete(row.original.id_prd)}
            >
              <IconDelete></IconDelete>
            </PButton>
          </>
        ),
      },
    ]);
  };

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
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    tableHooks
  );

  const { pageIndex } = state;

  //#endregion

  const { id_cat } = useParams();

  //#region Eliminar
  let initialValuesDelete = {
    id_cat: null,
  };

  const ConfirmDelete = (id_prd) => {
    setFormValue({ id_prd });
    handleShowDelete();
  };
  const [formValue, setFormValue] = useState(initialValuesDelete);
  const { id_prd } = formValue;

  const onChangeForm = (e) => {
    let { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const onHandleSubmitDelete = (e) => {
    e.preventDefault();

    dispatch(deleteProductAction(formValue));
    toast.success("Producto elimnado!");
    setTimeout(
      () => dispatch(productoByCategoryRequested({ id_user: 68, id_cat })),
      1000
    );
    setTimeout(() => setShowDelete(false), 1100);
  };

  //#endregion

  //#region Agregar

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //const [ select, setSelect ] = useState();
  //const changeRadioButton = (e) => setSelect(e.target.value)
  //Revisar bien

  const initialValues = {
    name_prd: "",
    description_prd: "",
    id_cat: Number(id_cat),
    id_user: 68,
    imgURL_prd: "",
    price_prd: 0,
    isOnMenu: ''
    //isOnMenu: select
  };

  const validationSchema = Yup.object().shape({
    name_prd: Yup.string()
      .required("Campo Requerido")
      .min(2, `Mínimo 2 caracteres`)
      .max(255, `Máximo 255 caracteres`),
    description_prd: Yup.string()
      .required("Campo Requerido")
      .min(2, `Mínimo 5 caracteres`)
      .max(255, `Máximo 255 caracteres`),
    imgURL_prd: Yup.string()
      .required("Campo Requerido")
      .min(2, `Mínimo 2 caracteres`)
      .max(255, `Máximo 255 caracteres`),
    price_prd: Yup.number()
      .required("Campo Requerido")
  });

  async function onHandleSubmit(data) {
    await sleep(1000);
    setReseted(true);
    if (data) {
      dispatch(createProductAction(data));
      toast.success("Producto agregado.");
      setTimeout(
        () => dispatch(productoByCategoryRequested({ id_user: 68, id_cat })),
        1000
      );
      setTimeout(() => setShow(false), 1100);
      setTimeout(
        () => history.push(`/CategoryByProduct/${Number(id_cat)}`),
        1000
      );
      setShow(false);
    }
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  //#endregion

  //#region Modal Producto
  const [showProduct, setShowProduct] = useState(false);
  const handleCloseProduct = () => setShowProduct(false);
  const handleShowProduct = () => setShowProduct(true);

  const RedirectProduct = (id_cat, id_prd) => {
    dispatch(productsRequested({ id_user: 68, id_cat, id_prd }));
    handleShowProduct();
  };
  let responseProduct = useSelector((state) => state.entries.products.products);

  //#endregion

  return (
    <>
      <div className="container">
        <button
          className="btn btn-warning btn-plus mt-3"
          variant="primary"
          onClick={handleShow}
        >
          <GrAdd />
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar una producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              //onSubmit={(values) => console.log(values)}
              onSubmit={async (values) => {
                if(values.isOnMenu === 'true'){
                  values.isOnMenu = true
                }else{
                  values.isOnMenu = false
                }
                await new Promise(onHandleSubmit(values));
              }}
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
                                  type="text"
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
                              <div className="mb-3">
                                <label
                                  htmlFor="imgURL_prd"
                                  className="form-label"
                                >
                                  Imagen
                                </label>
                                <Field
                                  type="text"
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
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="price_prd"
                                  className="form-label"
                                >
                                  Precio
                                </label>
                                <Field
                                  type="number"
                                  className="form-text form-control"
                                  name="price_prd"
                                  id="price_prd"
                                  placeholder="Precio del producto"
                                />
                                <ErrorMessage
                                  name="price_prd"
                                  component="div"
                                  className="field-error text-danger"
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  className="form-check-label"
                                >
                                  Menú
                                </label>
                                <div className="form-check">
                                  <Field
                                    className="form-check-input"
                                    type="radio"
                                    name="isOnMenu"
                                    //id="isOnMenutrue"
                                    value={"true"}
                                    //onClick={changeRadioButton}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isOnMenutrue"
                                  >
                                    Sí
                                  </label>
                                </div>
                                
                                <div className="form-check">
                                  <Field
                                    className="form-check-input"
                                    type="radio"
                                    name="isOnMenu"
                                    //id="isOnMenufalse"
                                    value={"false"}
                                    //onClick={changeRadioButton}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isOnMenufalse"
                                  >
                                    No
                                  </label>
                                  {/* <p>{select}</p> */}
                                </div>
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
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-center mt-2">
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

      <Modal show={showDelete} onHide={handleCloseProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onHandleSubmitDelete}>
            <div className="form-container">
              <div>
                <input
                  type="number"
                  id="id_prd"
                  name="id_prd"
                  value={id_prd}
                  onChange={onChangeForm}
                  hidden
                />
                <h4>¿Está seguro que quiere eliminar ese producto?</h4>
                <div className="  py-3">
                  <button type="submit" className="btn btn-dark m-3">
                    Eliminar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary mr-3"
                    onClick={handleCloseDelete}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="font-style">
        <Modal show={showProduct} onHide={handleCloseProduct}>
          <Modal.Header closeButton>
            <Modal.Title>{responseProduct.producto}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-product">
              <div>
                <img
                  className="w-100"
                  src="https://enlacocina.b-cdn.net/wp-content/uploads/2018/07/Productos-saludables-2.jpg"
                  alt="img"
                />
                <div className="  py-3">
                  <p className="description">{responseProduct.descripcion}</p>
                  <p className="gray">
                    Categoría: <span>{responseProduct.categoria}</span>
                  </p>
                  <p>
                    Menú: <span>{responseProduct.isOnMenu ? "Sí" : "No"}</span>
                  </p>
                  <p>
                    Precio: <span>{responseProduct.price_prd}</span>
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProduct}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CategoryByProduct;
