import React, {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const userData = await loginUser(email, password);

    setUser(userData);
  };

  const signup = async (name, email, password) => {
    const userData = await registerUser(
      name,
      email,
      password
    );

    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
