import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authService } from './api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [loading, setLoading] = useState(false);

  const register = async (data: any) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: any) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
