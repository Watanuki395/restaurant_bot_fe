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

export const categoriesSuccess = ({categories}) => {
    return {
        type: CATEGORIES_SUCCESS,
        isFetching: false,
        error: false,
        success: true,
        payload: {categories}
    }
};

export const categoriesError = () => {
    return {
        type: CATEGORIES_ERROR,
        isFetching: false,
        error: true,
        success: false
    }
};