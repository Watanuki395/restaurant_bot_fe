import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, Navigate, useParams } from "react-router-dom";
import { createProductAction } from '../../actions/createproductAction';

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

const createProductPage = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isReseted, setReseted] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [count, setCount] = useState(0);
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const id_Categoria = useSelector(state => state.entries.productbycategory.productByCategory);
  console.log(id_Categoria);

  const initialValues = {
    name_prd: "",
    description_prd: "",
    id_cat: "",
    id_user: "",
    imgURL_prd: ""
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
    imgURL_prd: Yup.string().required("Campo Requerido"),
  });

  async function onHandleSubmit(data) {
    await sleep(1000);
    setReseted(true);
    let resp = dispatch(createProductAction(data));
    return resp;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onHandleSubmit(values)}
      >
        {({ isSuccess, message, isSubmitting }) => (
          <Form>
            <section className="container-fluid bg vh100">
              <section className="row justify-content-center">
                <section className="col-12 col-sm-6 col-md-3">
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
                        <div className="mb-3">
                          <label htmlFor="imgURL_prd" className="form-label">
                            Imagen
                          </label>
                          <Field
                            type="imgURL_prd"
                            className="form-text form-control"
                            name="imgURL_prd"
                            id="imgURL_prd"
                            placeholder="Url Imagen del producto"
                          />
                          <ErrorMessage
                            name="imgURL_prd"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="d-grid gap-2 py-3">
                          <button
                            type="submit"
                            disabled={count > 0 ? true : false || isSubmitting}
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
    </Fragment>
  );
}
 
export default createProductPage;