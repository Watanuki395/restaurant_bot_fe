import { CREATE_PRODUCT_REQUESTED, CREATE_PRODUCT_ERROR, CREATE_PRODUCT_SUCCESS } from "./index";

export const createProductRequested = (data) => {
  return {
    type: CREATE_PRODUCT_REQUESTED,
    data
  };
};

export const createProductError = (data) => {
  return {
    type: CREATE_PRODUCT_ERROR,
    data
  };
};

export const createProductSuccess = (data) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    data
  };
};
