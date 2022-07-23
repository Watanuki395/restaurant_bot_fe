import { put, call, takeLatest } from 'redux-saga/effects';
import {
    PRODUCT_BY_CATEGORY_REQUESTED,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_ERROR
} from '../actions/index';
import apiCall from '../api';

function* productByCategorySaga(payload) {
    try {
        const response = yield call(apiCall, 'GET', `/api/product/productsbycategory?id_user=${payload.data.id_user}&id_cat=${payload.data.id_cat}`);
        yield put({type: PRODUCT_BY_CATEGORY_SUCCESS, response})
        
    } catch(error) {

        yield put({type: PRODUCT_BY_CATEGORY_ERROR, error})

    }
}

//watcher
function* sagas()
{
    yield takeLatest(PRODUCT_BY_CATEGORY_REQUESTED, productByCategorySaga);
}

export default sagas;