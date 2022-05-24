import { createContext, useReducer, useEffect } from "react";
import AuthReducer from '../reducers/loginReducer';


const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser));
    }, [state.currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;