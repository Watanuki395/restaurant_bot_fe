import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../actions/loginActions';
//import { loginSaga } from '../sagas/loginSaga';
import { setCookie } from '../utils/cookies';
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

    this.props.dispatch(loginUser(data));
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