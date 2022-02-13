import {
    //FORGOT_PASS,
    FORGOT_PASS_SUCCESS, 
    FORGOT_PASS_ERROR
  } from '../actions';
  
  export default function (state = [], action) {
    const response = action.response;
  
    switch(action.type) {
      case FORGOT_PASS_SUCCESS:
        return { ...state, response };
      case FORGOT_PASS_ERROR:
        return { ...state, response };
      default:
        return state;
    }
  }
  