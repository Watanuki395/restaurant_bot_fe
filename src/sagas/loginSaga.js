import { put, call, takeLatest } from 'redux-saga/effects';
import { loginUserService } from '../services/authenticationService';

import * as types from '../actions';
import loginUserAction from '../actions/loginActions'



function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    if(response){
      yield [
        put(loginUserAction(response))
      ];
    }
  } catch(error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}

function* sagas() 
{ 
  yield takeLatest(types.LOGIN_USER, loginSaga);
} 

export default sagas;