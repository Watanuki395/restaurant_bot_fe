import { put, call, takeLatest, take } from 'redux-saga/effects';
import {
    DELETE_PRODUCT_REQUESTED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR
} from '../actions/index';
import apiCall from '../api';

function* deleteProductSaga(id){
    try{
        const response = yield call(apiCall, 'DELETE', `/api/product/${id}`);
        yield put({type: DELETE_PRODUCT_SUCCESS, response})
        
    }catch(error){
        yield put({type: DELETE_PRODUCT_ERROR, error})
    }
};

function* sagas()
{
    while(true){
        const {payload: id_prd} = yield take(DELETE_PRODUCT_REQUESTED);
        yield call(deleteProductSaga, id_prd)
    }
}

export default sagas;