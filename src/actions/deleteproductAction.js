import {
    DELETE_PRODUCT_REQUESTED
} from './index';

export const deleteProductAction = (id_prd) => {
    return {
        type: DELETE_PRODUCT_REQUESTED,
        payload: id_prd
    }
}