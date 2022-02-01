import * as types from '../actions';

const initialState = {
  user: [],
  success: null
}

export default function(state = initialState, action) {
  let response = action.response;

  switch(action.type) {
    case types.REGISTER_USER:
      return { ...state };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, response, success: true };
    case types.REGISTER_USER_ERROR:
      return { ...state, response, success: false };
    default:
      return state;
  }
}