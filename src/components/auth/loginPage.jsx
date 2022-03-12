import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Footer from "../common/Layout/footer/Footer"
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { loginUser } from "../../actions/loginActions";

import { setCookie } from "../../utils/cookies";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

function LoginPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLogged, setLogged] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Campo Requerido")
      .email("Correo Electrónico Inválido")
      .max(255, `Máximo 255 caracteres`),
    password: Yup.string().required("Campo Requerido"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  function onHandleSubmit(data) {
    let resp = dispatch(loginUser(data));
    return resp;
  }

  useEffect(() => {
    let isSuccess = props.response.entries.auth
      ? props.response.entries.auth.success
      : null;

    if (isSuccess) {
      setCookie("tokenSession", props.response.entries.auth.tokenSession, 1);
      setLogged(true);
      toast.success(
        "Bienvenido: " + props.response.entries.auth.response.user.name,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      history.push("/dashboard");
    }else if(isSuccess == false){
      setLogged(false);
      toast.error("Error: Usuario o Contrasenna invalida." , {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [props.response.entries.auth.success]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onHandleSubmit(values)}
      >
        {({ errors, touched, isSuccess, message }) => (
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
                        <span id="forgotPass" className="haveAccount">
                          <Link to="forgotpass" className="forgot">
                            Olvidé mi contraseña
                          </Link>
                        </span>
                        <div className="d-grid gap-2 py-3">
                          <button
                            className="btn btn-dark btn-block mb-2"
                            type="sumit"
                          >
                            Entrar
                          </button>
                        </div>
                        <div>
                          <span className="haveAccount">
                            ¿No tengo una cuenta?
                            <Link to="register">Registrarme</Link>
                          </span>
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
      <Footer></Footer>
    </>
  );
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(LoginPage);
