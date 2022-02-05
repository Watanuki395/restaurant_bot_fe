import {
 LOGIN_USER,
 LOGIN_USER_SUCCESS, 
 LOGIN_USER_ERROR
} from './index';

export const loginUserAction = (user) => {
  return {
    type: LOGIN_USER,
    user
  }
};