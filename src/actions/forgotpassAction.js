import {
    FORGOT_PASS_REQUESTED,
    FORGOT_PASS_SUCCESS, 
    FORGOT_PASS_ERROR
    } from './index';
    
    export const forgotPassRequest = (data) => {
      return {
        type: FORGOT_PASS_REQUESTED,
        data
      }
    };
    
    export const forgotPassRequestError = (data) => {
      return {
        type: FORGOT_PASS_ERROR,
        data
      }
    };
    
    export const forgotPassRequestSuccess = (data) => {
      return {
        type: FORGOT_PASS_SUCCESS,
        data
      }
    };