import { put, call, takeLatest } from 'redux-saga/effects';
import {
    EDIT_CATEGORY_REQUESTED,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR
} from '../actions/index';
import apiCall from '../api';

function* editCategorySaga({payload: {formValueEdit}}){
    try{
        const response = yield call(apiCall, 'PUT', `/api/product/categories/`, formValueEdit);
        yield put({type: EDIT_CATEGORY_SUCCESS, response})
        
    }catch(error){
        yield put({type: EDIT_CATEGORY_ERROR, error})
        console.log(error);
    }
};

function* sagas()
{
    yield takeLatest(EDIT_CATEGORY_REQUESTED, editCategorySaga);
}

export default sagas;