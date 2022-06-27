import { put, call, takeLatest, take } from 'redux-saga/effects';
import {
    DELETE_PRODUCT_REQUESTED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR
} from '../actions/index';
import apiCall from '../api';

function* deleteProductSaga(payload){
    try{
        const response = yield call(apiCall, 'DELETE', `/api/product/${payload.payload.id_prd}`);
        yield put({type: DELETE_PRODUCT_SUCCESS, response})
        
    }catch(error){
        yield put({type: DELETE_PRODUCT_ERROR, error})
    }
};

function* sagas()
{
    yield takeLatest(DELETE_PRODUCT_REQUESTED, deleteProductSaga);
}

export default sagas;