import { put, call, takeLatest } from 'redux-saga/effects';
import apiCall from '../api/index';

import { 
    CREATE_PRODUCT_REQUESTED,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR
} from '../actions/index';

function* createProductSaga(payload) {
    try {
        const response = yield call(apiCall, 'POST', '/api/product/', payload.product );
        yield [put({ type: CREATE_PRODUCT_SUCCESS, response })];
    } catch(error) {
        yield put({ type: CREATE_PRODUCT_ERROR, error });
    }
};

function* sagas() {
    yield takeLatest(CREATE_PRODUCT_REQUESTED, createProductSaga);
};

export default sagas;