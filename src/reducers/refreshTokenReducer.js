import {
    REFRESH_TOKEN_REQUESTED,
    REFRESH_TOKEN_SUCCESS, 
    REFRESH_TOKEN_ERROR
} from '../actions';

const initialState = {
    isFetching: false,
    error: false,
    success: false,
}

export default function (state = [], action) {
    const response = action.response;

    switch(action.type) {
        case REFRESH_TOKEN_REQUESTED:
            return { 
            ...state,
            isFetching: true, 
            success: false,
            logged: false,
            response };
        case REFRESH_TOKEN_SUCCESS:
            return { 
            ...state,
            isFetching: false,
            error: false,
            success:true, 
            logged: true,
            response };
        case REFRESH_TOKEN_ERROR:
            return { 
            ...state, 
            isFetching: false,
            error: true,
            success: false,
            logged: false,
            message: action.response };
        default:
        return state;
    }
}