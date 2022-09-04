import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { forgotPassRequest } from "../../actions/forgotpassAction";
import '../../index.css';

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../common/footer/Footer";



function ForgotPassPage (props){
  
  const dispatch = useDispatch();
  const history = useNavigate();
  

  const [isReseted, setReseted] = useState(false);
  const [count, setCount] = useState(0);

  const initialValues = {
    email: ''
    };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Digite un e-mail válido')
    .required('El correo es requerido'),
  });

  async function onHandleSubmit(data){
    await sleep(1000)
    setReseted(true)
    let resp = dispatch(forgotPassRequest(data))
    return resp
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(()=>{
    let isSuccess = props.response.entries.forgotpass.success ? props.response.entries.forgotpass.success : false
    if(isSuccess && isReseted){
      const msg = props.response.entries.forgotpass.response.msg ? props.response.entries.forgotpass.response.msg : ''
      const error = props.response.entries.forgotpass.response.error ? props.response.entries.forgotpass.response.error : ''
      setReseted(false)
      setCount(count + 1)
      if(msg !== ''){
        toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
        setTimeout(() => { history("/login") }, 2000);
      }else{
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        setCount(count - 1)
      }
      
    }
  },[props.response.entries.forgotpass])



    return (
      <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onHandleSubmit(values)}
      >{({ errors, touched, isSubmitting }) => (
        <Form >
          <div className="container-fluid bg vh100">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-6 col-md-5">
                  <div className="form-container">
                    <h3 className="text-center mb-5">Recuperar Contraseña</h3>
                    <  >
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Correo Electrónico
                        </label>
                        <Field
                          type="email"
                          className="form-text form-control"
                          name="email"
                          id="email"
                          placeholder=""
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="field-error text-danger"
                        />
                        <span className="littleSpan">
                          Nunca compartiremos tu correo con nadie más.
                        </span>
                      </div>
                      <div>
                        <button
                          type="submit"
                          disabled={count>0?true:false || isSubmitting}
                          className="btn btn-dark btn-block mb-2"
                        >
                          {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                          Recuperar!
                        </button>
                      </div>
                    </>
                    <span className="haveAccount">
                      ¿Ya tienes una cuenta?
                      <Link to="login">Ingresa aquí</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        )}
      </Formik>
      <Footer></Footer>
    </>
    );
  }

const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(ForgotPassPage);
