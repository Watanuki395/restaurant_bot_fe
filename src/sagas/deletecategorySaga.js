import { put, call, takeLatest } from 'redux-saga/effects';
import {
    DELETE_CATEGORY_REQUESTED,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR
} from '../actions/index';
import apiCall from '../api';

function* deleteCategorySaga(payload){
    try{
console.log(payload.payload);
        const response = yield call(apiCall, 'DELETE', `/api/product/categories/${payload.payload}`);
        yield put({type: DELETE_CATEGORY_SUCCESS, response})
        
    }catch(error){
        yield put({type: DELETE_CATEGORY_ERROR, error})
    }
};

function* sagas()
{
    yield takeLatest(DELETE_CATEGORY_REQUESTED, deleteCategorySaga);
}

export default sagas;