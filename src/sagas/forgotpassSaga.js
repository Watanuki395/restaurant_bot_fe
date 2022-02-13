import { put, call, takeLatest } from 'redux-saga/effects';
import { loginUserService } from '../services/authenticationService';

import {
    FORGOT_PASS,
    FORGOT_PASS_SUCCESS, 
    FORGOT_PASS_ERROR
  } from '../actions';

import apiCall from '../api';

function* forgotpassSaga(payload) {
  try {
    const response = yield call(apiCall, 'POST', '/api/auth/forgotpass', payload.data);
    if(response){
      yield [
        put({type: FORGOT_PASS_SUCCESS})
      ];
    }
  } catch(error) {
    yield put({type: FORGOT_PASS_ERROR})
  }
}

// watcher
function* sagas() 
{ 
  yield takeLatest(FORGOT_PASS, forgotpassSaga);
} 

export default sagas;