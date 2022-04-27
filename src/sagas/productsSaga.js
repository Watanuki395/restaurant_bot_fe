import { put, call, takeLatest } from 'redux-saga/effects';

import { 
    PRODUCTS_REQUESTED,
    PRODUCTS_SUCCESS,
    PRODUCTS_ERROR } 
    from '../actions/index';
import apiCall from '../api';

function* productstSaga(payload){
    try {
        const response = yield call(apiCall, 'GET', `/api/product/product?id_prd=${payload.data.id_prd}&id_user=${payload.data.id_user}&id_cat=${payload.data.id_cat}`);
        yield put({type: PRODUCTS_SUCCESS, response});
        console.log(response);
    } catch(error) {
        yield put({type: PRODUCTS_ERROR, error});
    }
}

//watcher
function* sagas(){
    yield takeLatest(PRODUCTS_REQUESTED, productstSaga)
}

export default sagas;