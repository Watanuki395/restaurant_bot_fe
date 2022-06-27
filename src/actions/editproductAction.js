import {
    EDIT_PRODUCT_REQUESTED,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from './index';

export const editProductAction = ( product ) => {
    return {
        type: EDIT_PRODUCT_REQUESTED,
        payload: product
    }
}

export const editProductSuccessAction = () => {
    return {
        type: EDIT_PRODUCT_SUCCESS,
        edit: true
    }
}

export const editProductErrorAction = ( error ) => {
    return {
        type: EDIT_PRODUCT_ERROR,
        payload: error
    }
}