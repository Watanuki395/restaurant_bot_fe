import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { registerUserAction } from "../actions/authenticationActions";
import style from "./styles/forgotpass.css";

class ForgotPassPage extends Component {
  onHandleRegistration = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name,
      email,
      password,
    };

    this.props.dispatch(registerUserAction(data));
  };

  componentDidMount() {
    document.title = "React Login";
  }

  render() {
    let message, isSuccess;

    if (this.props.response.register.hasOwnProperty("response")) {
      isSuccess = this.props.response.register.response.success;
      message = this.props.response.register.response.message;
    }

    return (
      <div className="container-fluid bg">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 col-md-5">
            <div>
              {!isSuccess ? <div>{message}</div> : <Redirect to="login" />}
              <form
                className="form-container"
                onSubmit={this.onHandleRegistration}
              >
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
                  <span className="tx">
                    Digita tu correo electronico, para recuperar tu contraseña
                  </span>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-dark btn-block btn-action"
                  >
                    Register
                  </button>
                </div>
                <span className="tx">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="login" className="tx">
                    Regresar al Login
                  </Link>
                </span>
              </form>
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

export default connect(mapStateToProps)(ForgotPassPage);
