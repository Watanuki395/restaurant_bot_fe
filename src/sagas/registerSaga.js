import { put, call, takeLatest } from 'redux-saga/effects';
import { registerUserService } from '../services/authenticationService';

import * as types from '../actions';

function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload);
    yield [
      put({ type: types.REGISTER_USER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.REGISTER_USER_ERROR, error })
  }
} 

function* sagas() 
{ 
  yield takeLatest(types.REGISTER_USER, registerSaga);
} 

export default sagas;