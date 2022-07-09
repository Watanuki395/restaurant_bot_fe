import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation, Navigate, useParams } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import { GrAdd, GrUploadOption } from "react-icons/gr";

import { IconDelete, IconEdit, IconSee, PButton, PreviewImg } from "./style";

import { createProductAction } from "../../actions/createproductAction";
import { productsRequested } from "../../actions/productsAction";
import { deleteProductAction } from "../../actions/deleteproductAction";
import { productoByCategoryRequested } from "../../actions/productbycategoryAction";

import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";
import noImage from "../../imgs/no-image.jpeg";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CategoryByProduct = ({ inputs, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    const cargarProductoCat = () =>
      dispatch(productoByCategoryRequested({ id_user: 68, id_cat }));
    cargarProductoCat();
  }, []);

  //#region UseSelector and states

  const [isReseted, setReseted] = useState(false);
  const [count, setCount] = useState(0);
  const [file, setFile] = useState("");
  const [idata, setData] = useState({});
  const [per, setPerc] = useState(null);

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
    navigate(from, { replace: true })
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
  const handleClose = () => {
    setShow(false)
    setFile('')};
  const handleShow = () => setShow(true);

  //const [ select, setSelect ] = useState();
  //const changeRadioButton = (e) => setSelect(e.target.value)
  //Revisar bien

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const initialValues = {
    name_prd: "",
    description_prd: "",
    id_cat: Number(id_cat),
    id_user: 68,
    file: "",
    price_prd: 0,
    isOnMenu: ''
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
    file: Yup.mixed()
      //.nullable()
      //.required("La imagen del producto es requerida")
      .test(
        "FILE_SIZE",
        "El tamaño del archivo es demasiado grande.",
        (value) => !value || (value && value.size <= 1024*1024)
      )
      .test(
        "FILE_FORMAT",
        "El archivo no esta en un formato permitido para una imagen.",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      ),
    price_prd: Yup.number()
      .required("Campo Requerido")
  });

  async function onHandleSubmit(data) {
    //await sleep(1000);
    setReseted(true);
    if (data) {
      dispatch(createProductAction(data))

      toast.success("Producto agregado.");
      setTimeout(
        () => dispatch(productoByCategoryRequested({ id_user: 68, id_cat })),
        1000
      );
      setTimeout(() => setShow(false), 1100);
      setTimeout(
        () => navigate(`/CategoryByProduct/${Number(id_cat)}`, { replace: true }),
        1000
      );
      setShow(false);
      setFile('')
      
    }
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  //#endregion

  //#region Modal Producto
  const [showProduct, setShowProduct] = useState(false);
  const handleCloseProduct = () => setShowProduct(false);
  const handleShowProduct = () => setShowProduct(true);

  const RedirectProduct = (id_cat, id_prd) => {
    dispatch(productsRequested({ id_user: userInfo.id, id_cat, id_prd }));
    handleShowProduct();
  };
  let responseProduct = useSelector((state) => state.entries?.products?.products);
  const userInfo = useSelector((state) => state.entries?.auth?.response?.user);


    const uploadFile = () => {
      const fileName =  userInfo.uuid + '_' + file.name;

      console.log(fileName);
      const storageRef = ref(storage, `/menu_images/${userInfo.id}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

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
            <Modal.Title>Agregar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              //validationSchema={validationSchema}
              onSubmit={(values) => {
                if (values.isOnMenu === "true") {
                  values.isOnMenu = true;
                } else {
                  values.isOnMenu = false;
                }
                console.log(values)
                onHandleSubmit(values);
              }}
            >
              {({isSuccess, message, isSubmitting, values }) => (
                <Form>
                  <section className="">
                    <section className="">
                      <section className="">
                        <div>
                          {!isSuccess ? (
                            <div>{message}</div>
                          ) : (
                            <Navigate to="dashboard" />
                          )}
                          <div className="form-container">
                            <div>
                              {!isSuccess ? (
                                <div>{message}</div>
                              ) : (
                                <Navigate to="dashboard" />
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
                              <label className="form-check-label">
                                Agregar al Menú
                              </label>
                              <div className="mb-3">
                                <div className="form-check form-check-inline">
                                  <Field
                                    className="form-check-input"
                                    type="radio"
                                    name="isOnMenu"
                                    id="isOnMenutrue"
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

                                <div className="form-check form-check-inline">
                                  <Field
                                    className="form-check-input"
                                    type="radio"
                                    name="isOnMenu"
                                    id="isOnMenufalse"
                                    value={"false"}
                                    //onClick={changeRadioButton}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isOnMenufalse"
                                  >
                                    No
                                  </label>
                                </div>
                                <div className="formInput py-3">
                                  <label htmlFor="file">
                                    Imagen: <GrUploadOption className="icon" />
                                  </label>
                                  <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                  />
                                </div>
                                <PreviewImg
                                  src={
                                    file
                                      ? URL.createObjectURL(file)
                                      : noImage
                                  }
                                  className="img-fluid img-thumbnail" alt="..."
                                />
                              </div>
                              <ErrorMessage
                                  name="file"
                                  component="div"
                                  className="field-error text-danger"
                                />
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
