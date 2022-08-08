import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import {
  productoByCategoryRequested,
  productsRequested,
  createProductRequested,
  deleteProductAction,
  editProductAction,
} from "../../actions/productsAction";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";
import { PreviewImg } from "../categories/style";
import { GrUploadOption } from "react-icons/gr";
import storage from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import noImage from "../../imgs/no-image.jpeg";
import { Loading } from "../common/Loading";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isReseted, setReseted] = useState(false);
  const [count, setCount] = useState(0);

  const id_cat = useParams();
  console.log(id_cat.id_cat);
  //#region Agregar
  const [previewImg, setPreviewImg] = useState("");
  const [urlToDelete, setUrlToDelete] = useState({});
  const [perc, setPerc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isCreated, setIsCreated ] = useState(false);

  const responseGetProduct = useSelector(
    (state) => state.entries.products.productsByCategory
  );
  const userInfo = useSelector((state) => state.entries.auth.response?.user);
  const CreateProductResponse = useSelector((state) =>
    state.entries.products ? state.entries.products.createdProduct : null
  );
  const CreateProductResp = useSelector((state) =>
    state.entries.products ? state.entries.products.created : null
  );

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setPreviewImg("");
  };
  const handleShow = () => setShow(true);

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const initialValues = {
    name_prd: "",
    description_prd: "",
    id_cat: Number(id_cat.id_cat),
    id_user: userInfo?.id,
    imgURL_prd: "",
    price_prd: 0,
    isOnMenu: "",
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
        (value) => !value || (value && value.size <= 1024 * 1024)
      )
      .test(
        "FILE_FORMAT",
        "El archivo no esta en un formato permitido para una imagen.",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      ),
    price_prd: Yup.number().required("Campo Requerido"),
  });

  useEffect(() => {
    if (CreateProductResp && isCreated) {
      setIsCreated(false);
      //navigate(-1);
      //dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat: id_cat.id_cat })); //Cambiar el id_cat
      navigate(`/CategoryByProduct/${id_cat.id_cat}`, { replace: true })
    }
  }, [CreateProductResp]);
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
      dispatch(createProductRequested(data));
      setLoading(true);
      setIsCreated(true);
    }
  }

  useEffect(() => {
    setIsCreated(false)
    if (CreateProductResponse.id_prd) {
      if (previewImg) {
        const fileName =
          userInfo.uuid +
          "_" +
          CreateProductResponse.id_prd +
          "_" +
          previewImg.name;
        const storageRef = ref(
          storage,
          `/menu_images/${userInfo.id}/${fileName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, previewImg);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + Math.round(progress) + "% done");
            setPerc(Math.round(progress));
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
        );
      } else {
        //dispatch(productoByCategoryRequested({ id_user: userInfo.id, id_cat }));
        setShow(false);
        setPreviewImg("");
        setLoading(false);
      }
    } else if (CreateProductResponse === "ERROR") {
      setShow(false);
      setLoading(false);
    }
  }, [
    (CreateProductResponse.id_prd !== undefined && loading) ||
      (CreateProductResponse === "ERROR" && loading),
  ]);

  const uploadFile = (id_prd) => {};
  //#endregion
  const LoadingHandler = () => {
    return (
      <Loading
        message={
          perc !== null && perc < 100
            ? ` Agregando... ${perc}`
            : " Agregando..."
        }
      />
    );
  };
  //#endregion

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (values.isOnMenu === "true") {
            values.isOnMenu = true;
          } else {
            values.isOnMenu = false;
          }
          onHandleSubmit(values);
          //console.log(values);
        }}
      >
        <Form>
          <section className="">
            <section className="">
              <section className="">
                <div>
                  <div className="form-container">
                    <div className="mb-3">
                      <label htmlFor="name_prd" className="form-label">
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
                      <label htmlFor="description_prd" className="form-label">
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
                      <label htmlFor="price_prd" className="form-label">
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
                    <label className="form-check-label">Agregar al Menú</label>
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
                          previewImg ? URL.createObjectURL(previewImg) : noImage
                        }
                        className="img-fluid img-thumbnail"
                        alt="..."
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
                        {loading ? <LoadingHandler /> : "Agregar"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </section>
        </Form>
      </Formik>
    </>
  );
};
export default Product;

/* {id_prd ?
        <form 
        onSubmit={onHandleSubmitEdit}
      >
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
        <button
            type="submit"
            className="btn btn-dark font-weight-bold text-uppercase m-3"
            disabled={
              producto === "" || descripcion === "" || imgURL_prd === ""
            }
          >
            Guardar Cambios
          </button>
          <button variant="secondary" >
            Volver
          </button>

    </form>
        : null} */
