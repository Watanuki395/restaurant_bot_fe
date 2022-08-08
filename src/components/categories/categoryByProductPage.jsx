import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Navigate, useParams } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import { GrAdd } from "react-icons/gr";
import { IconDelete, IconEdit, IconSee, PButton, TableImgs } from "./style";

import Table from "../common/reactTable/Table";
import { PreviewImg } from "./style";
import { GrUploadOption } from "react-icons/gr";

import {
productoByCategoryRequested, 
  productsRequested,
  createProductRequested,
  deleteProductAction, 
  editProductAction
} from "../../actions/productsAction";

import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noImage from "../../imgs/no-image.jpeg";
import {Loading} from "../common/Loading";

// import {
//   addDoc,
//   collection,
//   doc,
//   serverTimestamp,
//   setDoc,
// } from "firebase/firestore";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

const CategoryByProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/dashboard";
  //#region UseSelector and states

  const {id_cat} = useParams();

  const [previewImg, setPreviewImg] = useState("");
  const [urlToDelete, setUrlToDelete] = useState({});
  const [perc, setPerc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const responseGetProduct = useSelector((state) => state.entries.products.productsByCategory);
  const userInfo = useSelector((state) => state.entries.auth.response?.user);
  const CreateProductResponse = useSelector((state) => state.entries.products ? state.entries.products.createdProduct : null);
  const DeleteProductResponse = useSelector((state) => state.entries.products.deleteProductResponse);


  useEffect(() => {
    if(userInfo?.id){
      //dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat })); //Cambiar el id_cat
    }
  }, [(userInfo !== undefined && userInfo !== null)]);
  //#endregion

  //#region Modal Edit

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const initialStateEdit = {
    producto: "",
    descripcion: "",
    price_prd: 0,
    isOnMenu: "",
    id_cat: 0,
    id_user: userInfo?.id,
    id_prd: 0,
    imgURL_prd: "",
  };
  const [formValueEdit, setFormValueEdit] = useState(initialStateEdit);


  const RedirectEditProduct = (product) => {
    setFormValueEdit(product);
    handleShowEdit();
  };

  const { producto, descripcion, imgURL_prd, price_prd, isOnMenu } = formValueEdit;

  const onHandleSubmitEdit = (e) => {
      e.preventDefault();
      console.log(formValueEdit);
      dispatch(editProductAction({ formValueEdit }));
      toast.success("Categoría actualizada satisfactoriamente.");
      setTimeout(() => dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat })), 1000);
      setTimeout(handleCloseEdit());

  };
  const onChangeFormEdit = (e) => {
    let { name, value } = e.target;
    setFormValueEdit({
      ...formValueEdit,
      [name]: value,
    });
  };

  //#endregion

  //#region UseTable

  const COLUMNS = [
    {
      Header: "Imagen",
      accessor: "imgURL_prd",
      Cell: tableProps => (
        <TableImgs src={tableProps.row.original.imgURL_prd}></TableImgs>
      )
    },
    {
      Header: "Producto",
      accessor: "producto",
    },
    {
      Header: "Descripción",
      accessor: "descripcion",
    },
    {
      Header: "Menú",
      accessor: "isOnMenu"
    },
    {
      Header: "Precio",
      accessor: "price_prd",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => [...responseGetProduct], [responseGetProduct]);

 /*  const RedirectEditProduct = (id_prd, id_cat) => {
    //dispatch( productoByCategoryRequested({id_user:userInfo.id, id_cat}) );
    navigate(from, { replace: true })
  }; */

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
              onClick={() => RedirectEditProduct(row.original)}
            >
              <IconEdit></IconEdit>
            </PButton>
            <PButton
              className="mb-1"
              //onClick={() => ConfirmDelete(row.original.id_prd, row.original.producto, row.original.imgURL_prd, )}
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

  //#region Eliminar
  /* const [idToDelete, setIdToDelete] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const ConfirmDelete = (id_prd, product, imgURI) => {
    setIdToDelete(id_prd);
    setUrlToDelete(imgURI);
    handleShowDelete();
  };

  const handleShowDelete = () => {
      setShowDelete(!showDelete);
  };

  const onHandleSubmitDelete = async () => {
    setDeleting(true);  
    if(urlToDelete){
      let pictureRef = ref(storage, urlToDelete);
      // Delete the file
      deleteObject(pictureRef)
        .then(() => {
          // File deleted successfully
          dispatch(deleteProductAction({ id_prd: idToDelete }));
          setUrlToDelete("");
        })
        .catch((error) => {
          console.log(error);
          dispatch(deleteProductAction({ id_prd: idToDelete }));
          setUrlToDelete("");
        });
    }else{
      dispatch(deleteProductAction({id_prd:idToDelete}));
    }
  }; 

  useEffect(()=>{
    if(DeleteProductResponse.mensaje){
      //dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat }))
      setShowDelete(false);
      setDeleting(false);      
      setIdToDelete();     
    }else if(DeleteProductResponse === 'ERROR'){
      /// TODO: hacer mensaje de error personalizado y cargar los que ya existen
     // navigate(`/CategoryByProduct/${Number(id_cat)}`, { replace: true });
      setShowDelete(false);
      setDeleting(false); 
      setIdToDelete();  
    }
  },[(DeleteProductResponse.mensaje !== undefined && deleting) || 
    (DeleteProductResponse === 'ERROR' && deleting)])*/
  //#endregion

  //#region Agregar

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setPreviewImg('')};
  const handleShow = () => setShow(true);

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const initialValues = {
    name_prd: "",
    description_prd: "",
    id_cat: Number(id_cat),
    id_user: userInfo?.id,
    imgURL_prd: "",
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
      imgURL_prd: Yup.mixed()
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

  useEffect(()=>{
    if(userInfo?.id){
      dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat })); //Cambiar el id_cat
    }
  }, [CreateProductResponse]);
  //#endregion

  //#region Modal Producto
  const [showProduct, setShowProduct] = useState(false);
  const handleCloseProduct = () => setShowProduct(false);
  const handleShowProduct = () => setShowProduct(true);

  const RedirectProduct = (id_cat, id_prd) => {
    dispatch(productsRequested({ id_user: userInfo.id, id_cat, id_prd }));
    handleShowProduct();
  };

function onHandleSubmit(data) {
    if (data) {
      dispatch(createProductRequested(data))
      setLoading(true)      
    }
  }

  useEffect(() => {
    if(CreateProductResponse.id_prd){
      if (previewImg) {
        const fileName = userInfo.uuid + "_" + CreateProductResponse.id_prd + "_" + previewImg.name;
        const storageRef = ref(
          storage,
          `/menu_images/${userInfo.id}/${fileName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, previewImg);

        uploadTask
          .on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " +  Math.round(progress) + "% done");
              setPerc( Math.round(progress));
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
            async () => {
              const imgURL_prd = await getDownloadURL(uploadTask.snapshot.ref);
              dispatch(
                editProductAction({
                  id_user: userInfo.id,
                  id_cat,
                  id_prd: CreateProductResponse.id_prd,
                  imgURL_prd,
                })
              );
              // dispatch(
              //   productoByCategoryRequested({ id_user: userInfo.id, id_cat })
              // );
              setShow(false);
              setPreviewImg("");
              setLoading(false);
            }
          )
      }else{
        //dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat }));
        setShow(false);
        setPreviewImg('');
        setLoading(false);      
      }
    } else if(CreateProductResponse === 'ERROR'){
      setShow(false);
      setLoading(false); 
    }

  }, [(CreateProductResponse.id_prd !== undefined && loading) || 
    (CreateProductResponse === 'ERROR' && loading)]);

    const uploadFile = (id_prd) => {
      
    };
  //#endregion
  const LoadingHandler = () => {
    return <Loading message = {perc !== null && perc < 100 ? ` Agregando... ${perc}`: ' Agregando...'} />;
  };


  /* useEffect(() => {
    const cargarProductoCat = () =>
      dispatch(productoByCategoryRequested({ id_user: 68, id_cat }));
    cargarProductoCat();


    try{
      if(createResponse && !msg){
        toast.success("Producto agregado.");
        setTimeout(() => dispatch(productoByCategoryRequested({ id_user: 68, id_cat })),1000);
        setTimeout(() => setShow(false), 1100);
        setTimeout(() => navigate(`/CategoryByProduct/${Number(id_cat)}`, { replace: true }),1000);
        setShow(false);
      }else if(createResponseError){
        toast.error("Ese producto ya existe.");
      }
    }catch(e){
      console.log(e);
    }
  }, [createResponse]); */

  return (
    <>
      <div style={{background: "black"}} className="container">
        {/* <h3>Está en: {categorias || 'Agrega un producto para descubrir la categoría'}</h3> */}
        <button
          className="btn btn-warning btn-plus mt-3"
          variant="primary"
          onClick={() => navigate(`/Product/${id_cat}`, { replace: true })}
          //onClick={handleShow}
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
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                if(values.isOnMenu === 'true'){
                  values.isOnMenu = true
                }else{
                  values.isOnMenu = false
                }
                onHandleSubmit(values);      
              }}
            >
              {({isSuccess, message}) => (
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
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isOnMenufalse"
                                  >
                                    No
                                  </label>
                                </div>
                                <div className="formInput py-3">
                                  <label htmlFor="imgURL_prd">
                                    Imagen: <GrUploadOption className="icon" />
                                  </label>
                                  <input
                                    type="file"
                                    id="imgURL_prd"
                                    onChange={(e) => setPreviewImg(e.target.files[0])}
                                    style={{ display: "none" }}
                                  />
                                </div>
                                <PreviewImg
                                  src={
                                    previewImg
                                      ? URL.createObjectURL(previewImg)
                                      : noImage
                                  }
                                  className="img-fluid img-thumbnail" alt="..."
                                />
                              </div>
                              <ErrorMessage
                                  name="imgURL_prd"
                                  component="div"
                                  className="field-error text-danger"
                                />
                              <div className="d-grid gap-2 py-3">
                                <button
                                  type="submit"
                                  disabled={loading}
                                  className="btn btn-dark btn-block mb-2"
                                >
                                  {loading ? <LoadingHandler/> : "Agregar"}
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

        <Table data = {data} columns = {columns}/>

        {/* <table {...getTableProps()} className="table">
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
        </table> */}

        {/* <div className="text-center mt-2">
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
        </div> */}
        <button className="btn btn-primary"
        onClick={() => navigate(`/dashboard`, { replace: true })}
        >Regresar..</button>
        
      </div>

      {/* <Modal show={showDelete}>
        <Modal.Body>
              <div>
                <h4>¿Está seguro de eliminar este producto?</h4>
              </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="warning" 
                disabled={deleting}
                onClick={onHandleSubmitDelete}>
            {deleting ? <LoadingHandler /> : "Eliminar"}
          </Button>
          <Button variant="secondary" onClick={handleShowDelete}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal> */}

      <div className="font-style">
        <Modal show={showProduct} onHide={handleCloseProduct}>
          <Modal.Header closeButton>
            <Modal.Title>{responseGetProduct.producto}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="img-100">
                <img
                  className="img-fluid"
                  src="https://enlacocina.b-cdn.net/wp-content/uploads/2018/07/Productos-saludables-2.jpg"
                  alt="img"
                />
              </div>
            <div className="form-product product">
                <div className="  py-3">
                  <p className="description">{responseGetProduct.descripcion}</p>
                  <p className="gray">
                    Categoría: <span>{responseGetProduct.categoria}</span>
                  </p>
                  <p>
                    Menú: <span>{responseGetProduct.isOnMenu ? "Sí" : "No"}</span>
                  </p>
                  <p>
                    Precio: <span>{responseGetProduct.price_prd}</span>
                  </p>
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

      <Modal show={showEdit} onHide={handleCloseEdit}>
          <form 
            onSubmit={onHandleSubmitEdit}
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-container mt-5">
                <div className="form-group">
                  <label> Nombre del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del producto"
                    name="producto"
                    value={producto || ""}
                    onChange={onChangeFormEdit}
                  />
                </div>
                <div className="form-group">
                  <label> Descripción del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción del producto"
                    name="descripcion"
                    value={descripcion || ""}
                    onChange={onChangeFormEdit}
                  />

                </div>

                <div className="form-group">
                  <label> Imagen del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Imagen del producto"
                    name="imgURL_prd"
                    value={imgURL_prd || ""}
                    onChange={onChangeFormEdit}
                  />
                </div>

                <div className="form-group">
                  <label> Precio del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Precio del producto"
                    name="price_prd"
                    value={price_prd || ""}
                    onChange={onChangeFormEdit}
                  />
                </div>

                <div className="mb-3">
                <label className="form-check-label">Menú</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isOnMenu"
                    value={true}
                    checked={isOnMenu === true ? true : false}
                    onChange={onChangeFormEdit}
                  />
                  <label className="form-check-label" htmlFor="isOnMenu">
                    Sí
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isOnMenu"
                    value={false}
                    checked={isOnMenu === false ? true : false}
                    onChange={onChangeFormEdit}
                  />
                  <label className="form-check-label" htmlFor="isOnMenu">
                    No
                  </label>
                </div>
              </div>
                
              </div>
            </Modal.Body>
            <Modal.Footer>
            <button
                type="submit"
                className="btn btn-dark font-weight-bold text-uppercase m-3"
                disabled={
                  producto === "" || descripcion === "" || imgURL_prd === ""
                }
              >
                Guardar Cambios
              </button>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Cerrar
              </Button>
            </Modal.Footer>
          </form>
      </Modal>
    </>
  );
};

export default CategoryByProduct;
