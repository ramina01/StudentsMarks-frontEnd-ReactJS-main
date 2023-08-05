import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import prop types

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login and set isAuthenticated state to true
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout and set isAuthenticated state to false
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Provide the login and logout functions and isAuthenticated state to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Add prop types validation for 'children'
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
