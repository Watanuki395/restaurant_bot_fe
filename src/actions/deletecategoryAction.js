import {
    DELETE_CATEGORY_REQUESTED
} from './index';

export const deleteProductAction = (id) => {
    return {
        type: DELETE_CATEGORY_REQUESTED,
        payload: id
    }
}