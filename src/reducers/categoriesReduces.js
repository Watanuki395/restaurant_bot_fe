import {
    CATEGORIES_REQUESTED,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR
  } from '../actions';
  
  
  const initialState = {
    isFetching: false,
    success: false,
    error: false
  }
  
  export default function(state = [initialState], action) {
  
    const response = action.response;
  
    switch(action.type) {
      case CATEGORIES_REQUESTED:
        return { 
          ...state,
          isFetching: true,
          success: false,
          response}
      case CATEGORIES_SUCCESS:
        return { 
          ...state,
          isFetching: false,
          success: true, 
          error: false,
          response };
      case CATEGORIES_ERROR:
        return { 
          ...state,
          isFetching: false,
          success: false, 
          error: true,
          message: action.response.msg };
      default:
        return state;
    }
  }