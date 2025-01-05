import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state is null, indicating no user logged in

  useEffect(() => {
    // Simulate fetching logged-in user data from local storage or backend
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser")); // Replace with actual API call if needed
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const login = (userData) => {
    // Set user data after login
    setUser(userData);
    localStorage.setItem("loggedUser", JSON.stringify(userData)); // Store user data locally for persistence
  };

  const logout = () => {
    // Clear user data on logout
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
