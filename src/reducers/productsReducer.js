import {
  PRODUCTS_REQUESTED,
  PRODUCTS_SUCCESS,
  PRODUCTS_ERROR,
  CREATE_PRODUCT_REQUESTED,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  PRODUCT_BY_CATEGORY_REQUESTED,
  PRODUCT_BY_CATEGORY_SUCCESS,
  PRODUCT_BY_CATEGORY_ERROR,
  DELETE_PRODUCT_REQUESTED,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR
} from "../actions/index";

const initialState = {
  isFetching: false,
  success: false,
  error: false,
  productsByCategory: [],
  createdProduct:[],
  deleteProductResponse:[]
};

function ProductsReducers(state = initialState, action) {
  const response = action.response;
  switch (action.type) {
    case PRODUCTS_REQUESTED: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case PRODUCTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
        error: false,
        productsByCategory: response,
      };
    }
    case PRODUCTS_ERROR: {
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    }
    case CREATE_PRODUCT_REQUESTED:
      return {
        ...state,
        isFetching: true,
        success: false
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createdProduct: response,
        success: true,
        isFetching: false
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        success: false,
        createdProduct: 'ERROR',
        error: true,
        isFetching: false
      };
    case PRODUCT_BY_CATEGORY_REQUESTED: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case PRODUCT_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
        error: false,
        productsByCategory: response,
      };
    }
    case PRODUCT_BY_CATEGORY_ERROR: {
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    }
    case DELETE_PRODUCT_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
        deleteProductResponse: response,
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        success: false,
        deleteProductResponse: 'ERROR',
      };

    default: {
      return state;
    }
  }
}
export default ProductsReducers;