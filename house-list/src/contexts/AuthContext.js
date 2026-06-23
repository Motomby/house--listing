import React, { createContext, useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // State Initialization & Memory Cleanup for authentication check
  useEffect(() => {
    const abortController = new AbortController();

    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await apiFetch('/api/auth/me', { signal: abortController.signal });
          setUser(data.user);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Failed to verify token:', error);
            localStorage.removeItem('token');
          }
        }
      }
      setLoading(false);
    };

    initAuth();

    return () => {
      // Clean up network request if component unmounts before finishing
      abortController.abort();
    };
  }, []);

  const signup = async (email, username, password) => {
    const data = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, username, password })
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const login = async (email, password) => {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const data = await apiFetch('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    setUser(data.user);
  };

  const updatePassword = async (oldPassword, newPassword) => {
    await apiFetch('/api/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword })
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout,
      updateProfile,
      updatePassword,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
