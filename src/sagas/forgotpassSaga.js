import { put, call, takeLatest } from 'redux-saga/effects';

import {
    FORGOT_PASS_REQUESTED,
    FORGOT_PASS_SUCCESS, 
    FORGOT_PASS_ERROR
  } from '../actions';

import apiCall from '../api';

function* forgotpassSaga(payload) {
  try {
    const response = yield call(apiCall, 'POST', '/api/auth/forgotpass', payload.data);
    yield [
      put({type: FORGOT_PASS_SUCCESS, response})
    ];
    
  } catch(error) {
    yield put({type: FORGOT_PASS_ERROR})
  }
}

// watcher
function* sagas() 
{ 
  yield takeLatest(FORGOT_PASS_REQUESTED, forgotpassSaga);
} 

export default sagas;