import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';

import style from './styles/register.css'

class RegisterPage extends Component {
  onHandleRegistration = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name, email, password
    };

    this.props.dispatch(registerUserAction(data));
  }

  componentDidMount() {
    document.title = 'React Login';
  }

  render() {
    let message, isSuccess;

    if (this.props.response.register.hasOwnProperty('response')) {
      isSuccess = this.props.response.register.response.success;
      message = this.props.response.register.response.message;
    }
    
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className="col-12 col-sm-6 col-md-5">
            <div>
              <h3 className='text-center mb-5'>Registro</h3>
              {!isSuccess ? <div>{message}</div> : <Redirect to='login' />}
              <form className="" onSubmit={this.onHandleRegistration}>
                <div className='mb-3'>
                  <label htmlFor="name" className="form-label">Nombre completo</label>
                  <input type="text" className='form-text form-control' name="name" id="name" />
                  <span className='littleSpan'>Nombre y Apellidos</span>
                </div>
                <div className='mb-3'>
                  <label htmlFor='businessName' className="form-label">Nombre del negocio</label>
                  <input type="text" className='form-text form-control' name='businessName' id='businessName'/>
                  <span className='littleSpan'>Confirmaremos que seas el dueño del negocio.</span>
                </div>
                <div className='mb-3'>
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input type="email" className='form-text form-control' name="email" id="email" />
                  <span className='littleSpan'>Nunca compartiremos tu correo con nadie más.</span>
                </div>
                <div className='mb-3'>
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className='form-text form-control' name="password" id="password" />
                </div>
                <div className='mb-3'>
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input type="password" className='form-text form-control' name="confirmPassword" id="confirmPassword" />
                  <span className='littleSpan'>La contraseña debe contener al menos 8 caracteres, 
                  mayúsculas, minúsculas y algún caracter especial.</span>
                </div>
                <div>
                  <button type='submit' className="btn btn-primary btn-block">Register</button>
                </div>
              </form>
                <span className='haveAccount'>Already have account? <Link to='login'>Login here</Link></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (response) => ({
  response
});

export default connect(mapStateToProps)(RegisterPage);
