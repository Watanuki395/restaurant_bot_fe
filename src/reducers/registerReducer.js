import * as types from '../actions';

const initialState = {
  user: [],
  success: null,
  isLoading: false
} 

function registerReducer(state = initialState, action) {
  let response = action.response;

  switch(action.type) {
    case types.REGISTER_USER:
      return { ...state, isLoading: true };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, 
        response, 
        success: true, 
        isLoading: false };
    case types.REGISTER_USER_ERROR:
      return { ...state, response, success: false, isLoading: false };
    default:
      return state;
  }
};

export default registerReducer;