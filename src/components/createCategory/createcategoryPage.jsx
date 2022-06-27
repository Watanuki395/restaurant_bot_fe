import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { createCategoryAction } from '../../actions/createcategoryAction';

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";


const createCategoryPage = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory();
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isReseted, setReseted] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [count, setCount] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSucceed, setIsSucceed] = useState(false);

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const response = useSelector((state) => state.entries.createcategory);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    let isSuccess = response ? response.success : false;
    //Revisar toda esta sección, la redirección cuando trae o no mensaje.
    if( isSuccess && isReseted ){
      let msg = response.response.msg ? response.response.msg : null;
      const error = response.error ? response.error : null;
      setReseted(false);
      setCount(count + 1)
      console.log(msg);    
      if(msg === null){
        toast.success('Categoría creada.', { position: toast.POSITION.TOP_RIGHT });
        setTimeout(() => { history.push("/dashboard") }, 2000);
        msg = null;
      }else{
        setReseted(false);
        if(msg !==''){
          toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
        }else{
          toast.error('Error al crear la categoría.', { position: toast.POSITION.TOP_RIGHT });
        }
        msg = null;
        setCount(count - 1);
      }
    }
  }, [response]);

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onHandleSubmit(values)}
      >
        {({ errors, touched, isSuccess, message, isSubmitting }) => (
          <Form>
            <section className="container-fluid bg vh100">
              <section className="row justify-content-center">
                <section className="col-12 col-sm-6 col-md-3">
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
                          <label htmlFor="name_cat" className="form-label">
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
                            disabled={count>0?true:false || isSubmitting}
                            className="btn btn-dark btn-block mb-2"
                          >
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
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
 
export default createCategoryPage;