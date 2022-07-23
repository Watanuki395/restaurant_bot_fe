import {
    EDIT_CATEGORY_REQUESTED,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR
} from '../actions/index';

const initialState = {
    success: null,
    isFetching: false,
    error: null
}

function editCategory(state = initialState, action){
    let response = action.response;

    switch(action.type){
        case EDIT_CATEGORY_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        
        case EDIT_CATEGORY_SUCCESS:
            return{
                ...state,
                isFetching: false,
                response
           };
        case EDIT_CATEGORY_ERROR:
            return {
            ...state, 
            isFetching: false,
            error: true,
            success: false,
            message: action.payload
            };
        
        default:
            return state;
    }
}

export default editCategory;