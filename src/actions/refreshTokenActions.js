import {
    REFRESH_TOKEN_REQUESTED,
    REFRESH_TOKEN_SUCCESS, 
    REFRESH_TOKEN_ERROR
    } from './index';
    
    export const refreshTokenRequest = (data) => {
        return {
            type: REFRESH_TOKEN_REQUESTED,
            data
        }
    };
    
    export const refreshTokenError = (data) => {
        return {
            type: REFRESH_TOKEN_ERROR,
            data
        }
    };
    
    export const refreshTokenSuccess = (data) => {
        return {
            type: REFRESH_TOKEN_SUCCESS,
            data
        }
    };