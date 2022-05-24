import {
    EDIT_CATEGORY_REQUESTED,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR
} from './index';

export const editCategoryAction = ( category ) => {
    return {
        type: EDIT_CATEGORY_REQUESTED,
        payload: category
    }
}

export const editCategorySuccessAction = () => {
    return {
        type: EDIT_CATEGORY_SUCCESS
    }
}

export const editCategoryErrorAction = ( error ) => {
    return {
        type: EDIT_CATEGORY_ERROR,
        payload: error
    }
}