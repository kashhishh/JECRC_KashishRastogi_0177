import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    // Mock login - in real app, validate with backend
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = (email, password, name) => {
    // Mock registration - in real app, send to backend
    if (email && password && name) {
      setUser({ email, name });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
