import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_ERROR
} from '../actions';

export default function (state = [], action) {
  const response = action.response;

  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, response };
    case LOGIN_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}
