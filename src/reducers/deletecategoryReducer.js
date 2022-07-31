/* import {
    DELETE_CATEGORY_REQUESTED,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR
} from '../actions/index';

const initialState = {
    categories: [],
    success: null,
    isFetching: false,
    error: null,
    categoryDelete: null
}

function deleteCategory(state = initialState, action){
    let response = action.response;

    switch(action.type){
        case DELETE_CATEGORY_REQUESTED:
            return {
                ...state,
                isFetching: true,
                response
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
            ...state,
            isFetching: false,
            error: false,
            success:true,
            categories:state.categories.filter( category => category.id_cat !== state.productoeliminar),
            categoryDelete: null,
            response
        }
        case DELETE_CATEGORY_ERROR:
            return {
            ...state, 
            isFetching: false,
            error: true,
            success: false,
            message: action.response.msg
            };
        default:
            return state;
    }
}

export default deleteCategory; */