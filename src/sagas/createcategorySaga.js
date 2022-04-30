import { put, call, takeLatest } from 'redux-saga/effects';
import apiCall from '../api/index';

import {
    CREATECATEGORY_REQUESTED,
    CREATECATEGORY_SUCCESS,
    CREATECATEGORY_ERROR
} from '../actions/index';

function* createCategorySaga(payload) {
    try {
        const response = yield call(apiCall, 'POST', '/api/product/categories/', payload.category);
        yield [put({ type: CREATECATEGORY_SUCCESS, response })]
    } catch(error) {
        yield put({ type: CREATECATEGORY_ERROR, error });
    }
};

function* sagas(){
    yield takeLatest(CREATECATEGORY_REQUESTED, createCategorySaga);
}

export default sagas;