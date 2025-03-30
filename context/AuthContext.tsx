'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id?: string;
  name: string;
  email: string;
  profile_picture?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const profileImage = localStorage.getItem('profileImage');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          const userData = JSON.parse(userStr);
          setUser({
            ...userData,
            name: name || userData.name,
            email: email || userData.email,
            profile_picture: profileImage || userData.profile_picture
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('profileImage');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 