import {
    DELETE_CATEGORY_REQUESTED
} from './index';

export const deleteCategoryAction = (id_cat) => {
    return {
        type: DELETE_CATEGORY_REQUESTED,
        payload: id_cat
    }
}