import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

// Helper function to get initial auth state
const getInitialAuthState = () => {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('authToken');
  
  if (storedUser && token) {
    try {
      return {
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      };
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  }
  
  return {
    user: null,
    isAuthenticated: false,
  };
};

export const AuthProvider = ({ children }) => {
  const initialState = getInitialAuthState();
  const [user, setUser] = useState(initialState.user);
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);

  const login = (userData, token = null) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('authToken', token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
