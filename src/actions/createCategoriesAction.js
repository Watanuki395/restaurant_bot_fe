import {
    CREATE_CATEGORY_REQUESTED,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR
} from './index';

export const createCategoryAction = data => ({
    type: CREATE_CATEGORY_REQUESTED,
    data,
    isFetching: false
})

/* export const createCategoryActionSuccess = data => ({
    type: CREATE_CATEGORY_SUCCESS,
    data,
    isFetching: false,
    success: true,
    error: false
});

export const createCategoryActionError = data => ({
    type: CREATE_CATEGORY_ERROR,
    data,
    isFetching: false,
    success: false,
    error: true
}) */