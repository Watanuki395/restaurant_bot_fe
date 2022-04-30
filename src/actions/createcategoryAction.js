import {
    CREATECATEGORY_REQUESTED
} from './index';

export const createCategoryAction = (category) => {
    return {
        type: CREATECATEGORY_REQUESTED,
        category: category,
        isFetching: true
    }
}