import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { registerUserAction } from "../actions/registerAction";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/register.css";

toast.configure();
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  /*  validar_email( email ) 
  {
      var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      return regex.test(email) ? true : false;
  }
 */
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

    //#region validación form
    if (
      data.name.trim() !== "" &&
      data.business_nm.trim() !== "" &&
      data.email.trim() !== "" &&
      data.password.trim() !== ""
    ) {
      this.isValidated = true;
    } else {
      //Crear helper para hacer la validación, llamar la función para validar los campos
      if (data.name.trim() === "") {
        document.getElementById("name").classList.add("is-invalid");
        this.isValidated = false;
      }
      document
        .getElementById("name")
        .addEventListener("click", function focus() {
          document.getElementById("name").classList.remove("is-invalid");
        });

      if (data.business_nm.trim() === "") {
        document.getElementById("business_nm").classList.add("is-invalid");
        this.isValidated = false;
      }
      document
        .getElementById("business_nm")
        .addEventListener("click", function focus() {
          document.getElementById("business_nm").classList.remove("is-invalid");
        });

      if (data.email.trim() === "") {
        document.getElementById("email").classList.add("is-invalid");
        this.isValidated = false;
      }
      document
        .getElementById("email")
        .addEventListener("click", function focus() {
          document.getElementById("email").classList.remove("is-invalid");
        });
      if (data.password.trim() === "") {
        document.getElementById("password").classList.add("is-invalid");
        this.isValidated = false;
      }
      document
        .getElementById("password")
        .addEventListener("click", function focus() {
          document.getElementById("password").classList.remove("is-invalid");
        });
      toast.warning("Debes llenar todos los campos!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    //#endregion

    if (this.isValidated === true) {
      this.props.dispatch(registerUserAction(data));
    }
  };

  componentDidMount() {
    document.title = "React Login";
  }

  componentDidUpdate() {
    let isSuccess;
    console.log(this.props.response.entries.register.success);
    if (this.props.response.entries.register.success !== null) {
      isSuccess = this.props.response.entries.register.success;
      if (isSuccess === true && this.props.response.entries.register.response.error !== 'El usuario ya existe') {
        isSuccess = null;
        this.props.response.entries.register.success = null;
        toast.success("Registrado!!", { position: toast.POSITION.TOP_RIGHT });
        this.props.history.push("/login");
      }else if(isSuccess === false || this.props.response.entries.register.response.error !== ''){
        this.props.response.entries.register.success = null;
        if(isSuccess === true && this.props.response.entries.register.response.error === 'El usuario ya existe'){
          toast.error("Ese correo electrónico ya está registrado!!", {position: toast.POSITION.TOP_RIGHT});
        }else{
          toast.error("No se pudo registrar!!", {position: toast.POSITION.TOP_RIGHT});
        }
        this.props.history.push("/register");
      }  
    }
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
                    <button
                      type="submit"
                      className="btn btn-dark btn-block mb-2"
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
                <span className="haveAccount">
                  ¿Ya tienes una cuenta? <Link to="login">Ingresa aquí</Link>
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
