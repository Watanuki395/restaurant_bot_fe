import { put, takeLatest } from 'redux-saga/effects';
import {
    SELECTCOMPONENT_REQUESTED,
    SELECTCOMPONENT_SUCCESS,
    SELECTCOMPONENT_ERROR
} from '../actions/index';

function* selectComponentSaga(payload){
    try {
        //const response = yield call(payload);
        yield put({type: SELECTCOMPONENT_SUCCESS, payload})
        
    } catch(error) {

        yield put({type: SELECTCOMPONENT_ERROR, error})

    }
}

function* sagas(){
    yield takeLatest(SELECTCOMPONENT_REQUESTED, selectComponentSaga);
}

export default sagas;