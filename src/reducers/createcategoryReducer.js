import {
    CREATECATEGORY_REQUESTED,
    CREATECATEGORY_SUCCESS,
    CREATECATEGORY_ERROR
} from '../actions/index'

const initialState = {
    category: [],
    success: null,
    isFetching: false,
    error: null
}

function createCategory(state = initialState, action){
    let response = action.response;

    switch(action.type){
        case CREATECATEGORY_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        case CREATECATEGORY_SUCCESS:
            return {
                ...state,
                response,
                success: true,
                isFetching: false
            };
        case CREATECATEGORY_ERROR:
            return {
                ...state,
                response, 
                success: false,
                error: true,
                isFetching: false
            };
        default: 
        return state;
    }

};

export default createCategory;