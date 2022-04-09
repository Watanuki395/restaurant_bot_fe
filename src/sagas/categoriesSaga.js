import { put, call, takeLatest, take,takeEvery } from 'redux-saga/effects';

import { 
    CATEGORIES_REQUESTED, 
    CATEGORIES_SUCCESS, 
    CATEGORIES_ERROR } 
    from '../actions/index';
import apiCall from '../api';

function* categoriesSaga() {
    try {
        const response = yield call(apiCall, 'GET', '/api/product/categories', {});
        console.log(response);
        yield [
            put({type: CATEGORIES_SUCCESS, categories: response})
        ];
    } catch(error) {
        yield put({type: CATEGORIES_ERROR, error})
    }
}

//watcher
function* sagas()
{
    yield takeLatest(CATEGORIES_REQUESTED, categoriesSaga);
}

export default sagas;