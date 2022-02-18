import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/login.css'

class LoginPage extends Component {
  constructor(props) {
    super();
    this.isSuccess = ''
    this.message = ''
  }

 /*  onHandleLogin = (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };

    if(validateLogin(data.email, data.password)){
      this.props.dispatch(loginUser(data));
    }else{
      toast.warning("Debes llenar todos los campos!!", { position: toast.POSITION.TOP_RIGHT });
    }
  } */

  componentDidUpdate(){
    let response = this.props.response.entries.login;

    if(response.success !== null){
      if(response.success === true){
        toast.success("Bienvenido: "+response.response.user.name, { position: toast.POSITION.TOP_RIGHT })
        this.props.history.push("/dashboard");
        response.success = null;
      }else{
        response.success = null;
        toast.error("Error", { position: toast.POSITION.TOP_RIGHT })
        this.props.history.push("/login");
      }
    }
  }

  componentDidMount() {
    document.title = 'React Login';
  }

  render() {
    let isSuccess, message;

    if (this.props.response.login.hasOwnProperty('response')) {
      isSuccess = this.props.response.login.response.user.admin;
      message = this.props.response.login.response.user.business_nm;
      
      if (isSuccess) {
        setCookie('token', this.props.response.login.response.token, 1);
      }
    }

  formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Campo Requerido")
      .email("Correo Electrónico Inválido")
      .max(255, `Máximo 255 caracteres`),
      password: Yup.string()
      .required("Campo Requerido")
});

  render() {
    
    return (
      <>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={this.formSchema}
        onSubmit={(values) => this.props.dispatch(loginUser(values))}
        //onSubmit={(values) => console.log(values)}
      >
        <Form>
        <section className="container-fluid bg">
        <section className="row justify-content-center">
          <section className="col-12 col-sm-6 col-md-3">
            <div>
              {!this.isSuccess ? <div>{this.message}</div> : <Redirect to='dashboard' />}
              <div className="form-container">
              <div>
                    {!this.isSuccess ? (
                      <div>{this.message}</div>
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
                    <span id="forgotPass" className="form-text">
                      <Link to="forgotpass" className="forgot">
                        Olvidé mi contraseña
                      </Link>
                    </span>
                    <div className="d-grid gap-2 py-3">
                      <button className="btn btn-dark" type="sumit">
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
      </Formik>
      
      </>
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginPage);