/* import {
    CREATECATEGORY_ERROR,
    CREATECATEGORY_REQUESTED,
    CREATECATEGORY_SUCCESS
} from './index';

export const createCategoryAction = (category) => {
    return {
        type: CREATECATEGORY_REQUESTED,
        category: category,
        isFetching: true,
        success: null
    }
}

export const createCategoryActionSuccess = () => {
    return {
        type: CREATECATEGORY_SUCCESS,
        
        isFetching: false,
        success: true
    }
}

export const createCategoryActionError = (response) => {
    return {
        type: CREATECATEGORY_ERROR,
        response,
        isFetching: false,
        error: true
    }
} */