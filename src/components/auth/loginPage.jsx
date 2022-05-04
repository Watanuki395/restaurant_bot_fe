import React, { useRef, useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Footer from "../common/Layout/footer/Footer"
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { loginUser } from "../../actions/loginActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

import useAuth from '../../hooks/useAuth';

function LoginPage(props) {
  const { setAuth, persist, setPersist } = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

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

  useEffect(() => {
    setErrMsg('');
}, [email, password])

const onHandleSubmit = (e) => {
  try {
    let resp = dispatch(loginUser(e));
    //console.log(JSON.stringify(resp?.data));
    const accessToken = resp?.data?.tokenSession;
    const roles = 2001;
    //setAuth({ email, password, roles, accessToken });
    setUser('');
    setPwd('');
    navigate(from, { replace: true });
    return resp;

  } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg('Login Failed');
    }
      //errRef.current.focus();
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev);
}

useEffect(() => {
    localStorage.setItem("persist", persist);
}, [persist])

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onHandleSubmit(values)}
      >
        {({ isSuccess, message }) => (
          <Form>
            <section className="container-fluid bg vh100">
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
                            //value={email}
                            //ref={userRef.current}
                            //onChange={(e) => setUser(e.target.value)}
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
                            //value={password}
                            //ref={userRef}
                            //onChange={(e) => setPwd(e.target.value)}
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
