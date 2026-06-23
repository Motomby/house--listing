import React, { createContext, useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State Initialization exactly once & Memory Cleanups
  useEffect(() => {
    const abortController = new AbortController();

    const loadProperties = async () => {
      try {
        setError(null);
        const data = await apiFetch('/api/properties', { signal: abortController.signal });
        setProperties(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to load properties:', error);
          setError(error.message || 'Failed to load properties');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProperties();

    return () => {
      // Clean up network request on unmount
      abortController.abort();
    };
  }, []);

  const createProperty = async (property, authorId) => {
    const newProperty = await apiFetch('/api/properties', {
      method: 'POST',
      body: JSON.stringify({ ...property, authorId })
    });
    setProperties(prev => [...prev, newProperty]);
    return newProperty;
  };

  const updateProperty = async (id, updates) => {
    const updatedProperty = await apiFetch(`/api/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    setProperties(prev => prev.map(p => p.id === id ? updatedProperty : p));
  };

  const deleteProperty = async (id, authorId) => {
    await apiFetch(`/api/properties/${id}`, {
      method: 'DELETE'
    });
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const getPropertiesByAuthor = (authorId) => {
    return properties.filter(p => p.authorId === authorId);
  };

  const searchProperties = (filters) => {
    let filtered = [...properties];
    
    if (filters.city) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    
    return filtered;
  };

  const refetch = async () => {
    const abortController = new AbortController();
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch('/api/properties', { signal: abortController.signal });
      setProperties(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to load properties');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      loading,
      error,
      createProperty,
      updateProperty,
      deleteProperty,
      getPropertiesByAuthor,
      searchProperties,
      refetch
    }}>
      {children}
    </PropertyContext.Provider>
  );
};
