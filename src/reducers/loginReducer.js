import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_ERROR
} from '../actions';

const initialState = {
  logged: null,
  success: null,
  error: false
}

export default function(state = initialState, action) {
  const response = action.response;

  switch(action.type) {
    case LOGIN_USER:
      return { ...state, response}
    case LOGIN_USER_SUCCESS:
      return { ...state, response, logged: true, success: true, error: false };
    case LOGIN_USER_ERROR:
      return { ...state, response, logged: false, success: false, error: true };
    default:
      return state;
  }
};