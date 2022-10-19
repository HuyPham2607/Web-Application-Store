import { createContext } from 'react';
import axios from 'axios';
import { useReducer } from 'react';
import { authReducer } from '../reducers/Authreducers';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
    });

    const loginUser = async (userForm) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', userForm);
            if (response.data.success) localStorage.setItem('user', response.data.accessToken);
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const registerUser = async (userForm) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', userForm);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    const AuthContextData = { loginUser, registerUser };

    return <AuthContext.Provider value={AuthContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
