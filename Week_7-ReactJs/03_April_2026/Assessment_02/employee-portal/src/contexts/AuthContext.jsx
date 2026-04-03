import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock users
        const users = {
          'admin@company.com': {
            id: 1,
            email: 'admin@company.com',
            name: 'Admin User',
            role: 'admin',
            password: 'admin123'
          },
          'employee@company.com': {
            id: 2,
            email: 'employee@company.com',
            name: 'John Doe',
            role: 'employee',
            password: 'emp123'
          }
        };

        const userData = users[email];
        
        if (userData && userData.password === password) {
          const { password: _, ...userWithoutPassword } = userData;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          setLoading(false);
          resolve(userWithoutPassword);
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1500); // Simulate network delay
    });
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem('user');
      setLoading(false);
      navigate('/login');
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};