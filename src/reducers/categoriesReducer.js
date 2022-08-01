import {
    CATEGORIES_REQUESTED,
    CATEGORIES_SUCCESS,
    CATEGORIES_ERROR,
    CREATE_CATEGORY_REQUESTED,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    DELETE_CATEGORY_REQUESTED,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    EDIT_CATEGORY_REQUESTED,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR
  } from '../actions';
  
  
  const initialState = {
    categories: [],
    isFetching: false,
    success: null,
    error: null,
    createdCategory:[],
    deletedCategory: [],
    editedCategory: []
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
          error: true
        }
      }
      case CREATE_CATEGORY_REQUESTED:
      return {
        ...state,
        isFetching: true,
        success: false,
      };
      case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        createdCategory: response,
        success: true,
        isFetching: false,
      };
      case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        success: false,
        createdCategory: "ERROR",
        error: true,
        isFetching: false,
      };
      
      case DELETE_CATEGORY_REQUESTED:
        return {
          ...state,
          isFetching: true
      };
      case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deletedCategory: response,
      };
      case DELETE_CATEGORY_ERROR:
      return {
        ...state,
        deletedCategory: "ERROR",
      };

      case EDIT_CATEGORY_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        
        case EDIT_CATEGORY_SUCCESS:
            return{
                ...state,
                isFetching: false,
                editedCategory: response
           };
        case EDIT_CATEGORY_ERROR:
            return {
            ...state, 
            isFetching: false,
            error: true,
            success: false,
            editedCategory: response
            };
      default: {
        return state;
      }
    }
  }