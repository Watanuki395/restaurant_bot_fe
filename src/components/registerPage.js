import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./styles/register.css";

import { registerUserAction } from "../actions/authenticationActions";

toast.configure();
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onHandleRegistration = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let business_nm = event.target.business_nm.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name,
      business_nm,
      email,
      password,
    };

    if (
      data.name !== "" ||
      data.business_nm !== "" ||
      data.email !== "" ||
      data.password !== ""
    ) {
      this.props.dispatch(registerUserAction(data));

      let isSuccess;
      if (!this.props.response.register.hasOwnProperty("response")) {
        isSuccess = this.props.response.register.success;

        if (isSuccess !== false) {
          this.props.history.push("/login");
        } else {
          this.props.history.push("/register");
        }
      }
    } else {
      toast.warning("Campos vacíos!", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  componentDidMount() {
    document.title = "React Login";
  }

  render() {
    return (
      <div className="bg-register">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-5">
              <div className="form-container-register">
                <h3 className="text-center mb-5">Registro</h3>
                <form className="" onSubmit={this.onHandleRegistration}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      className="form-text form-control"
                      name="name"
                      id="name"
                    />
                    <span className="littleSpan">Nombre y Apellidos</span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="businessName" className="form-label">
                      Nombre del negocio
                    </label>
                    <input
                      type="text"
                      className="form-text form-control"
                      name="business_nm"
                      id="business_nm"
                    />
                    <span className="littleSpan">
                      Confirmaremos que seas el dueño del negocio.
                    </span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-text form-control"
                      name="email"
                      id="email"
                    />
                    <span className="littleSpan">
                      Nunca compartiremos tu correo con nadie más.
                    </span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-text form-control"
                      name="password"
                      id="password"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-text form-control"
                      name="confirmPassword"
                      id="confirmPassword"
                    />
                    <span className="littleSpan">
                      La contraseña debe contener al menos 8 caracteres,
                      mayúsculas, minúsculas y algún caracter especial.
                    </span>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-dark btn-block">
                      Register
                    </button>
                  </div>
                </form>
                <span className="haveAccount">
                  Already have account? <Link to="login">Login here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(RegisterPage);
