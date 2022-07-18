import { 
    CREATE_PRODUCT_REQUESTED,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR
} from '../actions/index';

const initialState = {
    success: false,
    isFetching: false,
    error: false
};

function createProduct(state = initialState, action){
    let response = action.response;

    switch(action.type){
        case CREATE_PRODUCT_REQUESTED:
            return {
                ...state,
                isFetching: true,
                success: false,
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                response,
                success: true,
                isFetching: false
            };
        case CREATE_PRODUCT_ERROR:
            return {
                ...state,
                success: false,
                error: true,
                isFetching: false
            };
        default:
            return state;
    };

};

export default createProduct;