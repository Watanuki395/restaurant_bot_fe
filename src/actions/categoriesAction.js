import {
    CATEGORIES_REQUESTED,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR,
    CREATE_CATEGORY_REQUESTED,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    DELETE_CATEGORY_REQUESTED,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    EDIT_CATEGORY_REQUESTED,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR
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

//CREATE

export const deleteCategoryAction = (id_cat) => {
    return {
        type: DELETE_CATEGORY_REQUESTED,
        payload: id_cat
    }
  };
  export const deleteCategorySuccess = (data) => {
    return {
        type: DELETE_CATEGORY_SUCCESS,
        payload: data
    }
  };
  export const deleteCategoryError = (data) => {
    return {
        type: DELETE_CATEGORY_ERROR,
        payload: data
    }
  };

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