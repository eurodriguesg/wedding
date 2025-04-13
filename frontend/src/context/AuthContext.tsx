import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
  
    const login = (token: string) => {
      console.log('Token recebido no login:', token); // Adicione este log
      setToken(token);
      localStorage.setItem('token', token);
    };
  
    const logout = () => {
      console.log('Logout chamado'); // Adicione este log
      setToken(null);
      localStorage.removeItem('token');
    };
  
    return (
      <AuthContext.Provider value={{ token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};