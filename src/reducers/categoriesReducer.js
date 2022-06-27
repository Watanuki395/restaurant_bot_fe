import {
    CATEGORIES_REQUESTED,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR
  } from '../actions';
  
  
  const initialState = {
    categories: [],
    isFetching: false,
    success: null,
    error: null
  }
  
   // eslint-disable-next-line import/no-anonymous-default-export
   export default function(state = initialState, action) {
  
    const response = action.response;
  
    switch(action.type) {
      case CATEGORIES_REQUESTED:{
        return { 
          ...state,
          isFetching: action.payload
        }
      }
      case CATEGORIES_SUCCESS:{
        return { 
          ...state,
          isFetching: false,
          success: true, 
          error: false,
          categories: response
        }
      }
      case CATEGORIES_ERROR:{
        return { 
          ...state,
          error: true,
          message: action.response.msg
        }
      }
      default: {
        return state;
      }
    }
  }