import {
 LOGIN_USER,
 LOGIN_USER_SUCCESS, 
 LOGIN_USER_ERROR
} from './index';

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    isFetching: true,
    user
  }
};

export const loginUserError = () => {
  return {
    type: LOGIN_USER_ERROR,
    isFetching: false,
    error: true,
    success: false
  }
};

export const loginUserSuccess = () => {
  return {
    type: LOGIN_USER_SUCCESS,
    isFetching: false,
    error: false,
    success:true
  }
};