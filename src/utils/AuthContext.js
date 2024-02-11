import React, { createContext, useState } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    setToken: () => { },
    getToken: () => { },
});

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    const setToken = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setToken, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
