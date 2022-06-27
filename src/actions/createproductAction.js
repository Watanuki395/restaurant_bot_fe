import {
    CREATE_PRODUCT_REQUESTED
} from './index';

export const createProductAction = product => {
    return {
        type: CREATE_PRODUCT_REQUESTED,
        product: product,
        isFetching: true
    }
}