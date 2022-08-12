import {
  PRODUCTS_REQUESTED,
  PRODUCTS_SUCCESS,
  PRODUCTS_ERROR,
  CREATE_PRODUCT_REQUESTED,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_BY_CATEGORY_REQUESTED,
  PRODUCT_BY_CATEGORY_SUCCESS, 
  PRODUCT_BY_CATEGORY_ERROR,
  DELETE_PRODUCT_REQUESTED,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  EDIT_PRODUCT_REQUESTED,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  ADD_IMG_REQUESTED,
  ADD_IMG_SUCCESS,
  ADD_IMG_ERROR
} from "./index";


export const productsRequested = (data) => {
  return {
    type: PRODUCTS_REQUESTED,
    data,
  };
};

export const productsSuccess = (data) => {
  return {
    type: PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const productsError = () => {
  return {
    type: PRODUCTS_ERROR
  };
};

export const createProductRequested = (data) => {
  return {
    type: CREATE_PRODUCT_REQUESTED,
    data,
  };
};

export const createProductError = (data) => {
  return {
    type: CREATE_PRODUCT_ERROR,
    data,
  };
};

export const createProductSuccess = (data) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    data,
  };
};

export const productoByCategoryRequested = (data) => {
  return {
    type: PRODUCT_BY_CATEGORY_REQUESTED,
    data
  };
};

export const productByCategorySuccess = (data) => {
  return {
    type: PRODUCT_BY_CATEGORY_SUCCESS,
    data,
  };
};

export const productByCategoryError = (data) => {
  return {
    type: PRODUCT_BY_CATEGORY_ERROR,
    data
  };
};

export const deleteProductAction = (id_prd) => {
  return {
      type: DELETE_PRODUCT_REQUESTED,
      payload: id_prd
  }
};
export const deleteProductSuccess = (data) => {
  return {
      type: DELETE_PRODUCT_SUCCESS,
      payload: data
  }
};
export const deleteProductError = (data) => {
  return {
      type: DELETE_PRODUCT_ERROR,
      payload: data
  }
};
export const editProductAction = ( data ) => {
  return {
      type: EDIT_PRODUCT_REQUESTED,
      data
  }
}

export const editProductSuccess = () => {
  return {
      type: EDIT_PRODUCT_SUCCESS,
      editing: true
  }
}

export const editProductError = ( error ) => {
  return {
      type: EDIT_PRODUCT_ERROR,
      payload: error
  }
}

export const addImgAction = ( data ) => {
  return {
      type: ADD_IMG_REQUESTED,
      data
  }
}

export const addImgSuccess = () => {
  return {
      type: ADD_IMG_SUCCESS,
      editing: true
  }
}

export const addImgError = ( error ) => {
  return {
      type: ADD_IMG_ERROR,
      payload: error
  }
}