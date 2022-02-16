import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../actions/loginActions';
//import { loginSaga } from '../sagas/loginSaga';
import { validateLogin } from '../helpers/validationLoginHelper'
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

  onHandleLogin = (event) => {
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
  }

  componentDidUpdate(){
    let response = this.props.response.entries.login;

    if(response.success !== null){
      if(response.success === true){
        console.log(response.success );
        response.success = null;
        this.props.history.push("/dashboard");
        toast.success("Bienvenido: ", { position: toast.POSITION.TOP_RIGHT })
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

  stateChange(state){

    if (this.props.response.login.hasOwnProperty('response')) {
      this.isSuccess = this.props.response.login.response.user.admin;
      this.message = this.props.response.login.response.user.business_nm;
      
      if (this.isSuccess) {
        setCookie('token', this.props.response.login.response.token, 1);
      }
    }
  }

  render() {
    
    return (
      <section className="container-fluid bg">
        <section className="row justify-content-center">
          <section className="col-12 col-sm-6 col-md-3">
            <div>
              {!this.isSuccess ? <div>{this.message}</div> : <Redirect to='dashboard' />}
              <form className="form-container" onSubmit={this.onHandleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" id="email" className="form-control"/>
                  <div id="emailHelp" className="form-text">Nunca compartiremos tu correo con nadie más.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name="password" id="password" className="form-control"/>
                </div>
                <span id="forgotPass" className="form-text"><Link to='forgotpass' className='forgot'>Olvidé mi contraseña</Link></span>
                <div className="d-grid gap-2 py-3">
                  <button className="btn btn-dark" type="sumit">Entrar</button>
                </div>
                <div>
                  <p id="register" className="form-text text-center">No tengo una cuenta?    
                    <Link to='register' className="register"> Registrarme</Link>
                  </p>
                </div>
              </form>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginPage);