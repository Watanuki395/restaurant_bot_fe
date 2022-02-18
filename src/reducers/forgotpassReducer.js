import {
    FORGOT_PASS_REQUESTED,
    FORGOT_PASS_SUCCESS, 
    FORGOT_PASS_ERROR
  } from '../actions';
  
  const initialState = {
    isFetching: false,
    error: false,
    success: false,
  }

  export default function (state = [initialState], action) {
    const response = action.response;
  
    switch(action.type) {
      case FORGOT_PASS_REQUESTED:
        return { 
          ...state,
          isFetching: true, 
          success: false,
          response };
      case FORGOT_PASS_SUCCESS:
        return { 
          ...state,
          isFetching: false,
          error: false,
          success:true, 
          response };
      case FORGOT_PASS_ERROR:
        return { 
          ...state, 
          isFetching: false,
          error: true,
          success: false,
          message: action.response.msg };
      default:
        return state;
    }
  }
  