import {
    DELETE_PRODUCT_REQUESTED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR
} from '../actions/index';

const initialState = {
    categories: [],
    products: [],
    success: null,
    isFetching: false,
    error: null
}

function deleteProduct(state = initialState, action){
    let response = action.response;

    switch(action.type){
        case DELETE_PRODUCT_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
            ...state,
            isFetching: false,
            error: false,
            success:true,
            products:state.products.filter( item => item.id_prd !== state.payload),
            categoryDelete: null,
            response
        }
        case DELETE_PRODUCT_ERROR:
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

export default deleteProduct;