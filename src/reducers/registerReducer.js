import * as types from '../actions';

const initialState = {
  user: [],
  success: false
}

export default function(state = initialState, action) {
  let response = action.response;

  switch(action.type) {
    case types.REGISTER_USER:
      return { ...state };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, success: true,response };
    case types.REGISTER_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}