import { put, call, takeLatest } from 'redux-saga/effects';
import { loginUserService } from '../services/authenticationService';

import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR} from '../actions/index'
import { apiCall } from '../api';


function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    if(response.user){
      yield [put({type: LOGIN_USER_SUCCESS, response})];
    }else{
      yield [put({type: LOGIN_USER_ERROR, response})]
    }
  } catch(error) {
    yield put({type: LOGIN_USER_ERROR})
  }
}

// watcher
function* sagas() 
{ 
  yield takeLatest(LOGIN_USER, loginSaga);
} 

export default sagas;