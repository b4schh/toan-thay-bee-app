// contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (userData) => {
    // Giả lập đăng nhập thành công
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
