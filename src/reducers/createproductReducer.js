import { 
    CREATE_PRODUCT_REQUESTED,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR
} from '../actions/index';

const initialState = {
    product: [],
    success: null,
    isFetching: false,
    error: null,
    msg: ''
};

function createProduct(state = initialState, action){
    let response = action.response;

    switch(action.type){
        case CREATE_PRODUCT_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                response,
                success: true,
                isFetching: false,
                msg: response.msg
            };
        case CREATE_PRODUCT_ERROR:
            return {
                ...state,
                response,
                success: false,
                error: true,
                isFetching: false
            };
        default:
            return state;
    };

};

export default createProduct;