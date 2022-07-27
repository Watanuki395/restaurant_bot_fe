import {
    EDIT_PRODUCT_REQUESTED,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../actions/index';

const initialState = {
    success: null,
    isFetching: false,
    error: null,
    edit: null
}

function editProduct(state = initialState, action){
    let response = action.response;

    switch(action.type){
        case EDIT_PRODUCT_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        
        case EDIT_PRODUCT_SUCCESS:
            return{
                ...state,
                isFetching: false,
                edit: true,
                response
            };
        case EDIT_PRODUCT_ERROR:
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

export default editProduct;