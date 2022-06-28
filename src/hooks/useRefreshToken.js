import useAuth from './useAuth';
import axios from '../api/axios';
import { refreshTokenRequest } from "../actions/refreshTokenActions";
import { useDispatch, useSelector } from "react-redux";
//import { useEffect } from "react";

const useRefreshToken = () => {
        const { setAuth } = useAuth();
        const dispatch = useDispatch(); ///TODO, implementar con dispatch para usar redux-sagas
    
        const refresh = async () => {

            const response = await axios.get('/api/auth/refresh-token', {
                withCredentials: true
            });
            dispatch(refreshTokenRequest())
            setAuth(prev => {
                //console.log(JSON.stringify(prev));
                //console.log(response.data.accessToken);
                return {
                    ...prev,
                    user: response.data.user,
                    roles: response.data.user.admin,
                    accessToken: response.data.accessToken
                }
            });
            return response.data.accessToken;
        }
        return refresh;
    };
    
    export default useRefreshToken;