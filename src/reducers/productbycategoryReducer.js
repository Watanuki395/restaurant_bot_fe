import {
    PRODUCT_BY_CATEGORY_REQUESTED,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_ERROR
} from '../actions/index';

const initialState = {
    productByCategory: [],
    isFetching: false,
    success: null,
    error: null
}

 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state = initialState, action){
    const response = action.response;

    switch(action.type){
        case PRODUCT_BY_CATEGORY_REQUESTED: {
            return {
                ...state,
                isFetching: true
            }
        }

        case PRODUCT_BY_CATEGORY_SUCCESS:{
            return {
                ...state,
                isFetching: false,
                success: true,
                error: false,
                productByCategory: response
            }
        }

        case PRODUCT_BY_CATEGORY_ERROR:{
            return {
                ...state,
                error: true,
                isFetching: false
            }
        }

        default: {
            return state;
        }
    }
}