import { mockFetch } from './mockBackend';

// Centralized API hook/wrapper
// 1. Global Interceptors: Automatically attaches tokens.
// 2. Memory Cleanups: Accepts AbortSignal to cancel requests on unmount.

const USE_MOCK_BACKEND = false; // Pointing to real Express backend

export const apiFetch = async (url, options = {}) => {
  // Global Request Interceptor: Attach Token
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  try {
    let response;
    if (USE_MOCK_BACKEND) {
      response = await mockFetch(url, fetchOptions);
    } else {
      // Real backend
      response = await fetch(`http://localhost:5000${url}`, fetchOptions);
    }

    // Global Response Interceptor: Error Handling
    if (!response.ok) {
      if (response.status === 401) {
        // Handle token expiration globally
        localStorage.removeItem('token');
        // Optional: trigger a custom event or redirect to login
        window.dispatchEvent(new Event('auth_unauthorized'));
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API Error');
    }

    return await response.json();
  } catch (error) {
    // Check if the error is an AbortError (Memory Cleanup successful)
    if (error.name === 'AbortError') {
      console.log(`Request to ${url} was aborted to prevent memory leaks.`);
    }
    throw error;
  }
};
