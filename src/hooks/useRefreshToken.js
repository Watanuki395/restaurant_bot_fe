import axios from '../api/axios';
import useAuth from './useAuth';
import { refreshTokenRequest } from "../actions/refreshTokenActions";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const dispatch = useDispatch();

    const refresh = async () => {
        dispatch(refreshTokenRequest())
        // const response = await axios.get('/api/auth/refresh-token', {
        //     withCredentials: true
        // });
        // setAuth(prev => {
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.accessToken);
        //     return {
        //         ...prev,
        //         user: response.data.user,
        //         accessToken: response.data.accessToken
        //     }
        // });
        // return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;