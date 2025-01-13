import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        const storedToken = localStorage.getItem('token');

        if (!user || !storedToken) {
            navigate('/login');
        } else {
            setLoggedInUser(user);
            setToken(storedToken);
        }
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ loggedInUser, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
