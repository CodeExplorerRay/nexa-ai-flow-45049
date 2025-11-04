/**
 * @file AuthContext.tsx
 * @description Provides authentication state and functions to the application.
 * This context handles user data, loading states, and provides login/logout/signup functionalities.
 */

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the user object
interface User {
  id: string;
  username: string;
  name: string | null;
  email: string | null;
}

// Define the shape of the context value
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to use the AuthContext.
 * @throws {Error} if used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Provider component that wraps the application and makes auth object available to any child component that calls useAuth().
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/profile');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to check for an active session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, isLoading, logout, refetchUser: checkSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};