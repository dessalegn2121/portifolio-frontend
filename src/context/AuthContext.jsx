import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';

const AuthContext = createContext();

const getStoredToken = () => localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const getStoredUser = () => {
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(getStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // ensure the created axios instance used across the app also has the header
      if (api && api.defaults && api.defaults.headers) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      if (api && api.defaults && api.defaults.headers) {
        delete api.defaults.headers.common['Authorization'];
      }
    }
  }, [token]);

  const login = (newToken, remember = false, userData = null) => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    if (remember) {
      localStorage.setItem('token', newToken);
    } else {
      sessionStorage.setItem('token', newToken);
    }

    if (userData) {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      const serializedUser = JSON.stringify(userData);

      if (remember) {
        localStorage.setItem('user', serializedUser);
      } else {
        sessionStorage.setItem('user', serializedUser);
      }
      setUser(userData);
    }

    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
    // cleanup axios instance header as well
    delete axios.defaults.headers.common['Authorization'];
    if (api && api.defaults && api.defaults.headers) {
      delete api.defaults.headers.common['Authorization'];
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
