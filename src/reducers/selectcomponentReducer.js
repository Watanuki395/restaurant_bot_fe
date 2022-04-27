import {
    SELECTCOMPONENT_REQUESTED,
    SELECTCOMPONENT_SUCCESS,
    SELECTCOMPONENT_ERROR
} from '../actions/index';

const initialState = {
    component: '',
    isFetching: false,
    success: null,
    error: null
}

 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state = initialState, action){
    const response = action.response;

    switch(action.type){
        case SELECTCOMPONENT_REQUESTED: {
            return {
                ...state,
                isFetching: true
            }
        }

        case SELECTCOMPONENT_SUCCESS:{
            return {
                ...state,
                isFetching: false,
                success: true,
                error: false,
                component: action.payload
            }
        }

        case SELECTCOMPONENT_ERROR:{
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