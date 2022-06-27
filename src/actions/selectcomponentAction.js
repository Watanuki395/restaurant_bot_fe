import {
    SELECTCOMPONENT_REQUESTED,
    SELECTCOMPONENT_SUCCESS,
    SELECTCOMPONENT_ERROR
} from './index';

 export const selectComponentRequested = (component) => {
    return {
        type: SELECTCOMPONENT_REQUESTED,
        payload: component,
        isFetching: true
    }
};

export const selectComponentSuccess = (component) => ({

        type: SELECTCOMPONENT_SUCCESS,
        payload: component,
        success: true,
        error: false,
        isFetching: false

});

export const selectComponentError = () => {
    return {
        type: SELECTCOMPONENT_ERROR,
        error: true,
        isFetching: false
    }
};