import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../common/Layout/footer/Footer";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { registerUserAction } from "../../actions/registerAction";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../index.css';

toast.configure();
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  componentDidMount() {
    document.title = "React Login";
  }

  componentDidUpdate() {
    let isSuccess;
    let response = this.props.response.entries.register;

    if (response.success !== null) {
      isSuccess = response.success;
      if (isSuccess === true && !response.response.error) {
        isSuccess = null;
        response.success = null;
        toast.success("Registrado!!", { position: toast.POSITION.TOP_RIGHT });
        this.props.history.push("/login");
      } else if (isSuccess === false || response.response.error !== "") {
        response.success = null;
        if (isSuccess === true && response.response.error) {
          toast.error("Ese correo electrónico ya está registrado!!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("No se pudo registrar!!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        this.props.history.push("/register");
      }
    }
  }

  formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Campo Requerido")
      .email("Correo Electrónico Inválido")
      .max(255, `Máximo 255 caracteres`),
      name: Yup.string()
      .min(5, `Mínimo 5 caracteres`)
      .max(25, `Máximo 25 caracteres`)
      .required("Campo Requerido"),
      business_nm: Yup.string()
      .min(2, `Mínimo 2 caracteres`)
      .max(25, `Máximo 25 caracteres`)
      .required("Campo Requerido"),
      password: Yup.string()
      .required("Campo Requerido")
      .min(8, `Mínimo 8 caracteres`),
      password2: Yup.string()
      .required("Campo Requerido")
      .min(8, `Mínimo  8 caracteres`)
     .oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales'),
  });

  render() {
    return (
      <>
        <Formik
          initialValues={{
            name: "",
            business_nm: "",
            email: "",
            password: "",
            password2: "",
          }}
          validationSchema={this.formSchema}
          onSubmit={(values) => this.props.dispatch(registerUserAction(values))}
        >
          <Form >
            <div className="container-fluid bg">
              <div className="container ">
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-md-5">
                    <div className="form-container">
                      <h3 className="text-center mb-5">Registro</h3>
                      <  >
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Nombre completo
                          </label>
                          <Field
                            type="text"
                            className="form-text form-control"
                            name="name"
                            id="name"
                            placeholder=""
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="field-error text-danger"
                          />
                          <span className="littleSpan">Nombre y Apellidos</span>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="businessName" className="form-label">
                            Nombre del negocio
                          </label>
                          <Field
                            type="text"
                            className="form-text form-control"
                            name="business_nm"
                            id="business_nm"
                            placeholder=""
                          />
                          <ErrorMessage
                            name="business_nm"
                            component="div"
                            className="field-error text-danger"
                          />
                          <span className="littleSpan">
                            Confirmaremos que seas el dueño del negocio.
                          </span>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Correo Electrónico
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
                          <span className="littleSpan">
                            Nunca compartiremos tu correo con nadie más.
                          </span>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Contraseña
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

                        <div className="mb-3">
                          <label htmlFor="password2" className="form-label">
                            Confirmar Contraseña
                          </label>
                          <Field
                            type="password"
                            className="form-text form-control"
                            name="password2"
                            id="password2"
                            placeholder=""
                          />
                          <ErrorMessage
                            name="password2"
                            component="div"
                            className="field-error text-danger"
                          />
                          <span className="littleSpan">
                            La contraseña debe contener al menos 8 caracteres,
                            mayúsculas, minúsculas y algún caracter especial.
                          </span>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="btn btn-dark btn-block mb-2"
                          >
                            Registrarse
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
        </Formik>
        <Footer></Footer>
      </>
    );
  }
}

const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(RegisterPage);
