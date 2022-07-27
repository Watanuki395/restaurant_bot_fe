import { put, call, takeLatest } from 'redux-saga/effects';

import { 
    PRODUCTS_REQUESTED,
    PRODUCTS_SUCCESS,
    PRODUCTS_ERROR,
    CREATE_PRODUCT_REQUESTED,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    PRODUCT_BY_CATEGORY_REQUESTED,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_ERROR,
    DELETE_PRODUCT_REQUESTED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    EDIT_PRODUCT_REQUESTED,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR } 
    from '../actions/index';
import apiCall from '../api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* getProductstSaga(payload){
    try {
        if(payload){
            const response = yield call(apiCall, 'GET', `/api/product/product?id_prd=${payload.data.id_prd}&id_user=${payload.data.id_user}&id_cat=${payload.data.id_cat}`);
            if(response){
                yield put({type: PRODUCTS_SUCCESS, response});
            }else{
                yield put({type: PRODUCTS_ERROR})
            }
            
        }
    } catch(error) {
        yield put({type: PRODUCTS_ERROR, error});
    }
};

function* createProductSaga(payload) {
    try {
        if(payload){
            const response = yield call(apiCall, 'POST', '/api/product/', payload.data );
            if(response.id_prd){
                toast.success("Producto agregado 🍽",{position: "bottom-right"});
                yield put({ type: CREATE_PRODUCT_SUCCESS, response });
            }else{
                toast.warn('🚫 Error al crear el producto, es posible que este producto ya este en el menú',{position: "bottom-right"})
                yield put({type: CREATE_PRODUCT_ERROR, response});
            }
        }
    } catch(error) {
        yield put({ type: CREATE_PRODUCT_ERROR, error });
    }
};

function* productByCategorySaga(payload) {
    try {
        if(payload){
            const response = yield call(apiCall, 'GET', `/api/product/productsbycategory?id_user=${payload.data.id_user}&id_cat=${payload.data.id_cat}`);
            if(response){
                yield put({type: PRODUCT_BY_CATEGORY_SUCCESS, response})
            }else{
                yield put({type: PRODUCT_BY_CATEGORY_ERROR})
            }
        }
    } catch(error) {
        yield put({type: PRODUCT_BY_CATEGORY_ERROR, error})
    }
};

function* deleteProductSaga(payload){
    try{
        const response = yield call(apiCall, 'DELETE', `/api/product/${payload.payload.id_prd}`);
        if(response){
            toast.warn("Producto elimnado!",{position: "bottom-right"});
            yield put({type: DELETE_PRODUCT_SUCCESS, response})
        }else{
            yield put({type: DELETE_PRODUCT_ERROR, response})
        }
        
    }catch(error){
        yield put({type: DELETE_PRODUCT_ERROR, error})
    }
};

function* editProductSaga(payload){
    try{
        const response = yield call(apiCall, 'PUT', `/api/product/`, payload.data);
        if(response){
            yield put({type: EDIT_PRODUCT_SUCCESS, response})
            return response
        }else{
            yield put({type: EDIT_PRODUCT_ERROR, response})
        }
    }catch(error){
        yield put({type: EDIT_PRODUCT_ERROR, error})
    }
};


//watcher
function* sagas(){
    yield takeLatest(PRODUCTS_REQUESTED, getProductstSaga);
    yield takeLatest(CREATE_PRODUCT_REQUESTED, createProductSaga);
    yield takeLatest(PRODUCT_BY_CATEGORY_REQUESTED, productByCategorySaga);
    yield takeLatest(DELETE_PRODUCT_REQUESTED, deleteProductSaga);
    yield takeLatest(EDIT_PRODUCT_REQUESTED, editProductSaga);
}

export default sagas;