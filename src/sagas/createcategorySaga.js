import { put, call, takeLatest } from 'redux-saga/effects';
import apiCall from '../api/index';

import {
    CREATE_CATEGORY_REQUESTED,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR
} from '../actions/index';

function* createCategorySaga(payload) {
    try {
        const response = yield call(apiCall, 'POST', '/api/product/categories/', payload.data);
        console.log(response);
        if(response){
            yield put({ type: CREATE_CATEGORY_SUCCESS, response });
        }else{
            yield put({ type: CREATE_CATEGORY_ERROR, response });
        }
    } catch(error) {
        yield put({ type: CREATE_CATEGORY_ERROR, error });
    }
};

function* sagas(){
    yield takeLatest(CREATE_CATEGORY_REQUESTED, createCategorySaga);
}

export default sagas;