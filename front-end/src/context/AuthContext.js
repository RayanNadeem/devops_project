import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext to hold authentication state
const AuthContext = createContext();

// AuthProvider component that wraps around your app to provide auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On initial load, check for saved user in localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Login function that sets the user and saves to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function that clears the user and removes from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication state and functions
export const useAuth = () => useContext(AuthContext);
