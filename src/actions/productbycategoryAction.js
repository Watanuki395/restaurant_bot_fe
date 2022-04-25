import {
    PRODUCT_BY_CATEGORY_REQUESTED,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_ERROR
} from './index';

export const productoByCategoryRequested = (data) => {
    return {
        type: PRODUCT_BY_CATEGORY_REQUESTED,
        isFetching: true,
        data
    }
};

export const productByCategorySuccess = (productByCategory) => {
    return {
        type: PRODUCT_BY_CATEGORY_SUCCESS,
        payload: productByCategory,
        success: true,
        error: false,
        isFetching: false
    }
};

export const productByCategoryError = () => {
    return {
        type: PRODUCT_BY_CATEGORY_ERROR,
        success: false,
        error: true,
        isFetching: false
    }
}