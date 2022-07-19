import { put, call, takeLatest } from 'redux-saga/effects';
import {
    EDIT_PRODUCT_REQUESTED,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../actions/index';
import apiCall from '../api';

function* editProductSaga({payload: { formValueEdit}}){
    try{
        const response = yield call(apiCall, 'PUT', `/api/product/`, formValueEdit);
        yield put({type: EDIT_PRODUCT_SUCCESS, response})
        
    }catch(error){
        yield put({type: EDIT_PRODUCT_ERROR, error})
        console.log(error);
    }
};

function* sagas()
{
    yield takeLatest(EDIT_PRODUCT_REQUESTED, editProductSaga);
}

export default sagas;