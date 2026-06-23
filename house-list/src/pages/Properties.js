import { useState, useContext } from 'react';
import { PropertyContext } from '../contexts/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { FilterInput } from '../components/FilterInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import './Properties.css';

function Properties() {
  const { searchProperties, loading, error, refetch } = useContext(PropertyContext);
  const [filters, setFilters] = useState({ city: '', minPrice: '', maxPrice: '' });

  const displayedProperties = searchProperties({
    city: filters.city,
    minPrice: filters.minPrice ? Number(filters.minPrice) : null,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : null,
  });

  if (loading) {
    return <LoadingSpinner message="Loading properties..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="properties">
      <div className="properties-header-banner">
        <div className="properties-header-content">
          <h1>Explore Premium Properties</h1>
          <p>
            Whether you are looking for a modern downtown loft, a spacious suburban family home, or a luxurious penthouse, our curated public feed has something for everyone. 
            Use the powerful search filters below to narrow down properties by city and price range, and find the perfect match for your lifestyle.
          </p>
        </div>
      </div>
      
      <div className="filters-section">
        <FilterInput 
          placeholder="Filter by City" 
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <FilterInput 
          type="number"
          placeholder="Min Price" 
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <FilterInput 
          type="number"
          placeholder="Max Price" 
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </div>

      <div className="properties-list">
        {displayedProperties.length === 0 ? (
          <EmptyState message="No properties found matching your criteria." />
        ) : (
          displayedProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        )}
      </div>
    </div>
  );
}

export default Properties;
