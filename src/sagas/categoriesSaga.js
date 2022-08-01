import { put, call, takeLatest } from 'redux-saga/effects';

import { 
    CATEGORIES_REQUESTED, 
    CATEGORIES_SUCCESS, 
    CATEGORIES_ERROR,
    CREATE_CATEGORY_REQUESTED,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    DELETE_CATEGORY_REQUESTED,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    EDIT_CATEGORY_REQUESTED,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR } 
    from '../actions/index';
import apiCall from '../api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* categoriesSaga() {
    try {
        const response = yield call(apiCall, 'GET', '/api/product/categories');
        if(response){
            yield put({type: CATEGORIES_SUCCESS, response})
        }else {
            yield put({type: CATEGORIES_ERROR, response})
        }
        
    } catch(error) {

        yield put({type: CATEGORIES_ERROR, error})

    }
}

function* createCategorySaga(payload) {
    try {
        const response = yield call(apiCall, 'POST', '/api/product/categories/', payload.data);
        if(response.id_cat){
            toast.success("Categoría agregada 🍽",{position: "bottom-right"});
            yield put({ type: CREATE_CATEGORY_SUCCESS, response });
        }else{
            toast.warn('🚫 Error al crear la categoría, es posible que ya esté creada.',{position: "bottom-right"})
            yield put({ type: CREATE_CATEGORY_ERROR, response });
        }
    } catch(error) {
        toast.warn('🚫 Error al crear la categoría.',{position: "bottom-right"})
        yield put({ type: CREATE_CATEGORY_ERROR, error });
    }
};

function* deleteCategorySaga(payload){
    try{
        const response = yield call(apiCall, 'DELETE', `/api/product/categories/${payload.payload}`);
        if(response){
            toast.warn("Categoría eliminada!",{position: "bottom-right"});
            yield put({type: DELETE_CATEGORY_SUCCESS, response})
        }else{
            toast.error("Algo ocurrió, inteta de nuevo!",{position: "bottom-right"});
            yield put({type: DELETE_CATEGORY_ERROR, response})
        }
    }catch(error){
        toast.error("Algo ocurrió, inteta de nuevo!",{position: "bottom-right"});
        yield put({type: DELETE_CATEGORY_ERROR, error})
    }
};

function* editCategorySaga({payload: {formValueEdit}}){
    try{
        const response = yield call(apiCall, 'PUT', `/api/product/categories/`, formValueEdit);
        if(response){
            toast.success("Categoría editada.", {position: "bottom-right"});
            yield put({type: EDIT_CATEGORY_SUCCESS, response})
        }else{
            toast.error("Algo ocurrió, inteta de nuevo!",{position: "bottom-right"});
        yield put({type: EDIT_CATEGORY_ERROR, response})
        }
    }catch(error){
        toast.error("Algo ocurrió, inteta de nuevo!",{position: "bottom-right"});
        yield put({type: EDIT_CATEGORY_ERROR, error});
    }
};

//watcher
function* sagas()
{
    yield takeLatest(CATEGORIES_REQUESTED, categoriesSaga);
    yield takeLatest(CREATE_CATEGORY_REQUESTED, createCategorySaga);
    yield takeLatest(DELETE_CATEGORY_REQUESTED, deleteCategorySaga);
    yield takeLatest(EDIT_CATEGORY_REQUESTED, editCategorySaga);
}

export default sagas;