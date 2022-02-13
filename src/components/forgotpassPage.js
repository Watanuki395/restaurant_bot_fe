import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { forgotPassRequest } from "../actions/forgotpassAction";
import './styles/forgotpass.css'

class ForgotPassPage extends Component {

  onHandleSubmit = (event) => {
    event.preventDefault();
    let email = event.target.email.value;

    const data = {
      email,
    };

    this.props.dispatch(forgotPassRequest(data));
  };

  componentDidMount() {
    //document.title = "Olvide mi contraseña";
  }

  render() {

    return (
      <div className="container-fluid bg">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 col-md-5">
            <div>
              <form
                className="form-container"
                onSubmit={this.onHandleSubmit}
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
