import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR
} from './index';

export const registerUserAction = (user) => {
    return {
      type: REGISTER_USER,
      user: user,
      isLoading: true
    }
  }; 