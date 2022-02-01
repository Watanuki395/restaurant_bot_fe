import { put, call } from 'redux-saga/effects';
import { registerUserService, loginUserService } from '../services/authenticationService';

import * as types from '../actions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload);
    yield [
      put({ type: types.REGISTER_USER_SUCCESS, response }),
      toast.success('Registrado!!', { position: toast.POSITION.TOP_RIGHT })
    ];
  } catch(error) {
    yield put({ type: types.REGISTER_USER_ERROR, error });
    toast.error('Error!!', { position: toast.POSITION.TOP_RIGHT });
  }
}

export function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    yield [
      put({ type: types.LOGIN_USER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}