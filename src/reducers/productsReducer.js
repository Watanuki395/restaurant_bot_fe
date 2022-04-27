import {
    PRODUCTS_REQUESTED,
    PRODUCTS_SUCCESS,
    PRODUCTS_ERROR
} from '../actions/index';

const initialState = { 
    products: [],
    isFetching: false,
    success: null,
    error: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    const response = action.response;
    switch(action.type) {
        case PRODUCTS_REQUESTED: {
            return {
                ...state,
                isFetching: true
            }
        }

        case PRODUCTS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                success: true,
                error: false,
                products: response
            }
        }

        case PRODUCTS_ERROR: {
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