import { put, call, takeLatest } from 'redux-saga/effects';

import { REFRESH_TOKEN_REQUESTED, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../actions/index'
import apiCall from '../api';


function* refreshTokenSaga() {
    try {
        const response = yield call(apiCall,'GET', '/api/auth/refresh-token');
        if(response.user){
        yield put({type: REFRESH_TOKEN_SUCCESS, response});
        yield put({type: LOGIN_USER_SUCCESS, response});
        }else{
        yield put({type: REFRESH_TOKEN_ERROR, response})
        yield put({type: LOGIN_USER_ERROR, response})
        }
    } catch(error) {
        yield put({type: REFRESH_TOKEN_ERROR})
        yield put({type: LOGIN_USER_ERROR})
    }
}


// watcher
function* sagas() 
{ 
    yield takeLatest(REFRESH_TOKEN_REQUESTED, refreshTokenSaga);
} 

export default sagas;