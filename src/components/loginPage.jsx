import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { loginUser } from "../actions/loginActions";
import { setCookie } from "../utils/cookies";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/login.css";

function LoginPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isReseted, setReseted] = useState(false);
  const [count, setCount] = useState(0);

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Campo Requerido")
      .email("Correo Electrónico Inválido")
      .max(255, `Máximo 255 caracteres`),
    password: Yup.string().required("Campo Requerido"),
  });

  async function onHandleSubmit(data) {
    await sleep(1000);
    setReseted(true);
    let resp = dispatch(loginUser(data));
    return resp;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    let isSuccess = props.response.entries.login.success
      ? props.response.entries.login.response
      : false;
    if (isReseted && props.response.entries.login.response) {
      const error = props.response.entries.login.response.error 
      ? props.response.entries.login.response.error 
      : false
      setReseted(false)
      setCount(count + 1)
      if(!error){
        setCookie("token", props.response.entries.login.response.token, 1);
        toast.success("Bienvenido: " + props.response.entries.login.response.user.name, { position: toast.POSITION.TOP_RIGHT });
        setTimeout(() => { history.push("/dashboard") }, 1000);
      }else{
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        setCount(count - 1)
      }
    } 
  }, [props.response.entries.login]);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => onHandleSubmit(values)}
      >{({ errors, touched, isSubmitting }) => (
        <Form>
          <section className="container-fluid bg">
            <section className="row justify-content-center">
              <section className="col-12 col-sm-6 col-md-3">
                <div>
                  <div className="form-container">
                    <div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <Field
                          type="text"
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
                        <div id="emailHelp" className="form-text">
                          Nunca compartiremos tu correo con nadie más.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Field
                          type="password"
                          className="form-text form-control"
                          name="password"
                          id="password"
                          placeholder=""
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                      <span id="forgotPass" className="form-text">
                        <Link to="forgotpass" className="forgot">
                          Olvidé mi contraseña
                        </Link>
                      </span>
                      <div className="d-grid gap-2 py-3">
                        <button 
                        className="btn btn-dark" 
                        type="sumit"
                        disabled={count>0?true:false || isSubmitting}
                        >
                          {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                          Entrar
                        </button>
                      </div>
                      <div>
                        <p id="register" className="form-text text-center">
                          No tengo una cuenta?
                          <Link to="register" className="register">
                            {" "}
                            Registrarme
                          </Link>
                        </p>
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
    </>
  );
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(LoginPage);
