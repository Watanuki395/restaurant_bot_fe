import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { categoriesRequested } from "../../../actions/categoriesAction";
import {
  deleteProductAction,
  productoByCategoryRequested,
  editProductAction,
} from "../../../actions/productsAction";
import { deleteCategoryAction } from "../../../actions/categoriesAction";
import { editCategoryAction } from "../../../actions/categoriesAction";
import Filter from "./Filter";
import { CheckBox } from "./CheckBox";

import { IconDelete, IconEdit, IconSee, SButton } from "../../categories/style";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { Loading } from "../Loading/index";
import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import storage from "../../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { GrUploadOption } from "react-icons/gr";
import { PreviewImg } from "../../categories/style";
import noImage from "../../../imgs/no-image.jpeg";

const Table = ({ data, columns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //let categorias = useSelector((state) => state.entries.categories ? state.entries.categories.categories : null);
  const userInfo = useSelector((state) => state.entries.auth.response?.user);
  const { id_cat } = useParams();

  const redirectProductByCategory = (Category) => {
    //let id_cat = idCategory.id_cat;

    dispatch(
      productoByCategoryRequested({
        id_user: userInfo.id,
        id_cat: Category.id_cat,
      })
    );
    navigate(`/CategoryByProduct/${Category.id_cat}`, { replace: true });
  };

  //#region  Modal Eliminar
  const [idToDelete, setIdToDelete] = useState();
  const [idProductToDelete, setProductIdToDelete] = useState();
  const [urlToDelete, setUrlToDelete] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const [perc, setPerc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = (id_cat, id_prd, imgURI) => {
    setIdToDelete(id_cat);
    setProductIdToDelete(id_prd);
    setUrlToDelete(imgURI);
    handleShowDelete(false);
    console.log(imgURI);
  };

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  const onHandleSubmitDelete = (e) => {
    e.preventDefault();
    if (idProductToDelete) {
      console.log(urlToDelete);
      let pictureRef = ref(storage, urlToDelete);
      // Delete the file
      deleteObject(pictureRef)
        .then(() => {
          // File deleted successfully
          dispatch(deleteProductAction({ id_prd: idProductToDelete }));
          setUrlToDelete("");
          setProductIdToDelete();
        })
        .catch((error) => {
          console.log(error);
          dispatch(deleteProductAction({ id_prd: idProductToDelete }));
          setUrlToDelete("");
          setProductIdToDelete();
        });
    } else if (urlToDelete) {
      dispatch(deleteProductAction({ id_prd: idProductToDelete }));
      setUrlToDelete("");
      setProductIdToDelete();
    } else {
      dispatch(deleteCategoryAction(idToDelete));
      setLoading(true);
    }
  };

  const LoadingHandler = () => {
    return (
      <Loading
        message={
          perc !== null && perc < 100
            ? ` Eliminando... ${perc}`
            : " Eliminando..."
        }
      />
    );
  };

  const responseDeleteCategory = useSelector((state) =>
    state.entries.categories ? state.entries.categories.deleted : null
  );
  const responseDeleteProduct = useSelector((state) =>
    state.entries.categories ? state.entries.products.deleted : null
  );

  useEffect(() => {
    if (responseDeleteProduct) {
      setTimeout(() => setShowDelete(false), 1000);
      setTimeout(
        () =>
          dispatch(
            productoByCategoryRequested({
              id_user: userInfo.id,
              id_cat: id_cat,
            })
          ),
        1000
      );
      setLoading(false);
    }
  }, [responseDeleteProduct]);

  useEffect(() => {
    if (responseDeleteCategory) {
      setTimeout(() => setShowDelete(false), 1000);
      setTimeout(() => dispatch(categoriesRequested()), 1000);
      setLoading(false);
    }
  }, [responseDeleteCategory]);
  //#endregion

  //#region Modal Editar

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const initialStateEdit = {
    name_cat: "",
    description_cat: "",
  };

  const [formValueEdit, setFormValueEdit] = useState(initialStateEdit);

  const Edit = (obj) => {
    //navigate(`/categoryEdit/${category.id_cat}`, { replace: true });
    if (obj?.id_prd) {
      setFormValueEditProduct(obj);
      console.log(formValueEditProduct);
      handleShowEditProduct();
    } else {
      setFormValueEdit(obj);
      handleShowEdit();
    }
  };
  const { name_cat, description_cat } = formValueEdit;

  const onChangeFormEdit = (e) => {
    let { name, value } = e.target;
    setFormValueEdit({
      ...formValueEdit,
      [name]: value,
    });
  };

  const onHandleSubmitEdit = (e) => {
    //e.preventDefault();
    if (name_cat && description_cat) {
      dispatch(editCategoryAction({ formValueEdit }));
    }
  };

  const responseEdit = useSelector((state) =>
    state.entries.categories ? state.entries.categories.edited : null
  );

  useEffect(() => {
    if (responseEdit) {
      setTimeout(() => dispatch(categoriesRequested()), 1000);
      setTimeout(handleCloseEdit());
    }
  }, [responseEdit]);

  //#endregion

  //#region Modal Edit Product
  const [previewImg, setPreviewImg] = useState("");

  useEffect(()=>{
    if(responseEdit){
      if (previewImg) {
        const fileName = userInfo.uuid + "_" + responseEdit.id_prd + "_" + previewImg.name;
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
                  id_prd: responseEdit.id_prd,
                  imgURL_prd,
                })
              );
              // dispatch(
              //   productoByCategoryRequested({ id_user: userInfo.id, id_cat })
              // );
              //setShow(false);
              setPreviewImg("");
              setLoading(false);
            }
          )
      }else{
        //dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat }));
        //setShow(false);
        setPreviewImg('');
        setLoading(false);      
      }
    } else if(responseEdit === 'ERROR'){
      //setShow(false);
      setLoading(false); 
    }
  }, [(responseEdit !== undefined && loading) || 
    (responseEdit === 'ERROR' && loading)]);

  const [showEditProduct, setShowEditProduct] = useState(false);
  const handleCloseEditProduct = () => setShowEditProduct(false);
  const handleShowEditProduct = () => setShowEditProduct(true);

  const initialStateEditProduct = {
    producto: "",
    descripcion: "",
    price_prd: 0,
    isOnMenu: "",
    id_cat: 0,
    id_user: userInfo?.id,
    id_prd: 0,
    imgURL_prd: "",
  };
  const [formValueEditProduct, setFormValueEditProduct] = useState(
    initialStateEditProduct
  );

  /*  const Edit = (product) => {
   setFormValueEdit(product);
   handleShowEdit();
 }; */

  const { producto, descripcion, imgURL_prd, price_prd, isOnMenu } =
    formValueEditProduct;

  const onHandleSubmitEditProduct = (e) => {
    e.preventDefault();
    console.log(formValueEditProduct);
    dispatch(editProductAction({ formValueEditProduct }));
    setTimeout(
      () =>
        dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat })),
      1000
    );
    setTimeout(handleCloseEditProduct());
  };
  const onChangeFormEditProduct = (e) => {
    let { name, value } = e.target;
    setFormValueEditProduct({
      ...formValueEditProduct,
      [name]: value,
    });
  };

  //#endregion

  //#region React Table
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <>
            <SButton
              className="mb-1"
              onClick={() => redirectProductByCategory(row.original)}
            >
              <IconSee></IconSee>
            </SButton>

            <SButton
              onClick={() => Edit(row.original)}
              //onClick={() => Edit(row.original)}
            >
              <IconEdit></IconEdit>
            </SButton>

            <SButton
              className=""
              onClick={() =>
                confirmDelete(
                  row.original.id_cat,
                  row.original.id_prd,
                  row.original.imgURL_prd
                )
              }
            >
              <IconDelete></IconDelete>
            </SButton>
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
    setGlobalFilter,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <CheckBox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
    tableHooks
  );

  const isEvent = (id) => id % 2 === 0;

  const { pageIndex, globalFilter } = state;
  //#endregion

  return (
    <>
      <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        {...getTableProps()}
        className="table table-lg table-dark striped bordered table-hover"
      >
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  scope="col"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔼"
                        : " 🔽"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, idx) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                /* className={isEvent(idx) ? "bg-green-400 bg-opacity-10" : ""} */
              >
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
        <span className="text-white">
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

      <pre>
        <code style={{ color: "white" }}>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>

      <Modal show={showDelete}>
        <Modal.Body>
          <div>
            {idProductToDelete ? (
              <h4>¿Está seguro de eliminar este producto?</h4>
            ) : (
              <h4>¿Está seguro de eliminar esta categoría?</h4>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={loading}
            onClick={onHandleSubmitDelete}
          >
            {deleting ? <LoadingHandler /> : "Eliminar"}
            {loading && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
          </Button>
          <Button variant="secondary" onClick={handleShowDelete}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Formik initialValues={initialStateEdit} onSubmit={onHandleSubmitEdit}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Editar categoría</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-container mt-5">
                <div className="form-group">
                  <label> Nombre de la categoría</label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Nombre de la categoría"
                    name="name_cat"
                    value={name_cat || ""}
                    onChange={onChangeFormEdit}
                  />
                  <ErrorMessage
                    name="name_cat"
                    component="div"
                    className="field-error text-danger"
                  />
                </div>
                <div className="form-group">
                  <label> Descripción de la categoría</label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Descripción de la categoría"
                    name="description_cat"
                    value={description_cat || ""}
                    onChange={onChangeFormEdit}
                  />
                  <ErrorMessage
                    name="description_cat"
                    component="div"
                    className="field-error text-danger"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                className="btn btn-dark font-weight-bold text-uppercase m-3"
                disabled={name_cat === "" || description_cat === ""}
              >
                Guardar Cambios
              </button>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>

      <Modal show={showEditProduct} onHide={handleCloseEditProduct}>
        <form onSubmit={onHandleSubmitEditProduct}>
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
                  onChange={onChangeFormEditProduct}
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
                  onChange={onChangeFormEditProduct}
                />
              </div>

              {/* <div className="form-group">
                  <label> Imagen del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Imagen del producto"
                    name="imgURL_prd"
                    value={imgURL_prd || ""}
                    onChange={onChangeFormEditProduct}
                  />
                </div> */}
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
                <PreviewImg
                  src={previewImg ? URL.createObjectURL(previewImg) : imgURL_prd}
                  className="img-fluid img-thumbnail"
                  alt="..."
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
                  onChange={onChangeFormEditProduct}
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
                    onChange={onChangeFormEditProduct}
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
                    onChange={onChangeFormEditProduct}
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
                producto === "" || descripcion === ""
              }
            >
              Guardar Cambios
            </button>
            <Button variant="secondary" onClick={handleCloseEditProduct}>
              Cerrar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Table;
