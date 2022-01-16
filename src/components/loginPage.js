import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';
import style from './styles/login.css'

class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };

    this.props.dispatch(loginUserAction(data));
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

    return (
      <section className="container-fluid bg">
        <section className="row justify-content-center">
          <section className="col-12 col-sm-6 col-md-3">
            <div>
              {!isSuccess ? <div>{message}</div> : <Redirect to='dashboard' />}
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
                <a id="forgotPass" class="form-text"><Link to='forgotpass'>Olvide mi contraseña</Link></a>
                <div class="d-grid gap-2 py-3">
                  <button className="btn btn-primary" type="sumit">Entrar</button>
                </div>
                <div>
                  <p id="register" classNames="form-text">No tengo una cuenta, 
                    <Link to='register'> Registrarme</Link>
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