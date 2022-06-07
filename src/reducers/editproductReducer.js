import {
    EDIT_PRODUCT_REQUESTED,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../actions/index';

const initialState = {
    success: null,
    isFetching: false,
    error: null
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
                isFetching: false
                //categoryEdit: null,
                //categories: state.categories.map(category => category.id === action.payload.id ? category = action.payload : category)
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