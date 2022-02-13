import {
    FORGOT_PASS,
    FORGOT_PASS_SUCCESS, 
    FORGOT_PASS_ERROR
   } from './index';
   
   export const forgotPassRequest = (data) => {
     return {
       type: FORGOT_PASS,
       isFetching: true,
       data
     }
   };
   
   export const forgotPassRequestError = () => {
     return {
       type: FORGOT_PASS_ERROR,
       isFetching: false,
       error: true,
       success: false
     }
   };
   
   export const forgotPassRequestSuccess = () => {
     return {
       type: FORGOT_PASS_SUCCESS,
       isFetching: false,
       error: false,
       success:true
     }
   };