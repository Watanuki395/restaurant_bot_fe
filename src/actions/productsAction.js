import {
    PRODUCTS_REQUESTED,
    PRODUCTS_SUCCESS,
    PRODUCTS_ERROR
} from './index';

export const productsRequested = (data) => {
    return {
        type: PRODUCTS_REQUESTED,
        isFetching: true,
        data
    }
};

export const productsSuccess = (products) => {
    return {
        type: PRODUCTS_SUCCESS,
        success: true,
        error: false,
        isFetching: false,
        payload: products
    }
};

export const productsError = () => {
    return {
        type: PRODUCTS_ERROR,
        success: false,
        error: true,
        isFetching: false
    }
};