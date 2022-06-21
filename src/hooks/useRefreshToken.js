import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh-token', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                user: response.data.user,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;