import {
    CATEGORIES_REQUESTED,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR
} from './index';

 export const categoriesRequested = () => {
    return {
        type: CATEGORIES_REQUESTED,
        isFetching: true
    }
};

export const categoriesSuccess = (categories) => ({

        type: CATEGORIES_SUCCESS,
        payload: categories,
        success: true,
        error: false,
        isFetching: false

});

export const categoriesError = () => {
    return {
        type: CATEGORIES_ERROR,
        error: true,
        isFetching: false
    }
}; 