import {
    CREATE_CATEGORY_REQUESTED,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR
} from '../actions/index';

const initialState = {
    category: [],
    success: null,
    isFetching: false,
    error: null,
    msg: ''
}

export default function createCategory(state = [], action){
    let response = action.response;

    switch(action.type){

        case CREATE_CATEGORY_REQUESTED:
            return {
                ...state,
                isFetching: true
            }
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                response,
                isFetching: false,
                success: true,
                error: false,
                msg: response.msg
            }
        case CREATE_CATEGORY_ERROR:
            return {
                ...state,
                response,
                isFetching: false,
                success: false,
                error: true
            }

        default:{
            return state;
        } 
    }
}