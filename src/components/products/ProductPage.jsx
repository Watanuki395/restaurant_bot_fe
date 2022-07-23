import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Navigate, useParams } from "react-router-dom";
import { createProductAction } from "../../actions/createproductAction";
import { productoByCategoryRequested } from "../../actions/productbycategoryAction";
import { editProductAction } from "../../actions/editproductAction";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

const Product = () => {

    const dispatch = useDispatch();

    const { id_cat } = useParams();
    const { id_prd } = useParams();
    const [isReseted, setReseted] = useState(false);
    const [count, setCount] = useState(0);

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
          
        }
      }
    
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    
      const createResponse = useSelector((state) => state.entries.createproduct ? state.entries.createproduct.success : null);
      const createResponseError = useSelector((state) => state.entries.createproduct ? state.entries.createproduct.error : null);
      const msg = useSelector((state) => state.entries.createproduct ? state.entries.createproduct.msg : null);


      const initialStateEdit = {
          producto: "",
          descripcion: "",
          price_prd: 0,
          isOnMenu: "",
          id_cat: 0,
          id_user: 68,
          id_prd: 0,
          imgURL_prd: "",
      };
        const [formValueEdit, setFormValueEdit] = useState(initialStateEdit);

        /* const RedirectEditProduct = (product) => {
            setFormValueEdit(product);
            handleShowEdit();
          }; */ //Pasarle el objeto para modificar

          const { producto, descripcion, imgURL_prd, price_prd, isOnMenu } = formValueEdit;
        
        
          const onHandleSubmitEdit = (e) => {
              e.preventDefault();
              console.log(formValueEdit);
              dispatch(editProductAction({ formValueEdit }));
              toast.success("Categoría actualizada satisfactoriamente.");
              setTimeout(() => dispatch(productoByCategoryRequested({ id_user: 68, id_cat })), 1000);
        
          };
          const onChangeFormEdit = (e) => {
            let { name, value } = e.target;
            setFormValueEdit({
              ...formValueEdit,
              [name]: value,
            });
          };


      useEffect(() => {
        /* const cargarProductoCat = () =>
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
        } */
      }, [createResponse]);

    return ( 
        <>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
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
                                    value={"true"}
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
                                    value={"false"}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isOnMenufalse"
                                  >
                                    No
                                  </label>
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

        {id_prd ?
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
        : null}

        </>
     );
}
 
export default Product;