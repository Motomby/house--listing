import { useState, useContext } from 'react';
import { PropertyContext } from '../contexts/PropertyContext';
import { AuthContext } from '../contexts/AuthContext';
import { EmptyState } from '../components/EmptyState';
import './MyListings.css';

function MyListings() {
  const { user } = useContext(AuthContext);
  const { getPropertiesByAuthor, createProperty, deleteProperty } = useContext(PropertyContext);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newProperty, setNewProperty] = useState({ 
    title: '', 
    price: '', 
    type: 'Apartment', 
    city: '',
    country: '', 
    description: '',
    imageUrl: '',
    forRent: false
  });

  // It's possible user is null during the initial render before redirection happens if they bypass the guard
  // but ProtectedRoute ensures they are authenticated.
  const myProperties = user ? getPropertiesByAuthor(user.id) : [];

  const validateForm = () => {
    const newErrors = {};
    if (!newProperty.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!newProperty.price || Number(newProperty.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (!newProperty.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!newProperty.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!newProperty.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (newProperty.imageUrl && !newProperty.imageUrl.match(/^https?:\/\/.+/)) {
      newErrors.imageUrl = 'Image URL must be a valid HTTP/HTTPS URL';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createProperty({
        ...newProperty,
        price: Number(newProperty.price),
        imageUrls: newProperty.imageUrl ? [newProperty.imageUrl] : []
      }, user.id);
      setNewProperty({ title: '', price: '', type: 'Apartment', city: '', country: '', description: '', imageUrl: '', forRent: false });
      setErrors({});
      setSuccessMessage('Listing published successfully!');
    } catch (error) {
      console.error('Failed to create property:', error);
      setErrorMessage(error.message || 'Failed to publish listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteProperty(id, user.id);
        setSuccessMessage('Listing deleted successfully!');
      } catch (error) {
        console.error('Failed to delete property:', error);
        setErrorMessage('Failed to delete listing');
      }
    }
  };

  return (
    <div className="my-listings">
      <div className="my-listings-header">
        <h1>My Property Listings</h1>
        <p>Manage the properties you have listed on the marketplace.</p>
      </div>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="create-listing-form-container">
        <h2>Create New Listing</h2>
        <form onSubmit={handleSubmit} className="create-listing-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input 
                type="text" 
                placeholder="Title" 
                value={newProperty.title}
                onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                className={errors.title ? 'input-error' : ''}
              />
              {errors.title && <span className="validation-error">{errors.title}</span>}
            </div>
            <div className="form-group">
              <label>Price ($) *</label>
              <input 
                type="number" 
                placeholder="Price ($)" 
                value={newProperty.price}
                onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                className={errors.price ? 'input-error' : ''}
              />
              {errors.price && <span className="validation-error">{errors.price}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type *</label>
              <select 
                value={newProperty.type}
                onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value })}
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
            <div className="form-group">
              <label>City *</label>
              <input 
                type="text" 
                placeholder="City" 
                value={newProperty.city}
                onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })}
                className={errors.city ? 'input-error' : ''}
              />
              {errors.city && <span className="validation-error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>Country *</label>
              <input 
                type="text" 
                placeholder="Country" 
                value={newProperty.country}
                onChange={(e) => setNewProperty({ ...newProperty, country: e.target.value })}
                className={errors.country ? 'input-error' : ''}
              />
              {errors.country && <span className="validation-error">{errors.country}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="url" 
              placeholder="Image URL" 
              value={newProperty.imageUrl}
              onChange={(e) => setNewProperty({ ...newProperty, imageUrl: e.target.value })}
              className={errors.imageUrl ? 'input-error' : ''}
            />
            {errors.imageUrl && <span className="validation-error">{errors.imageUrl}</span>}
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea 
              placeholder="Description" 
              value={newProperty.description}
              onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
              className={errors.description ? 'input-error' : ''}
            ></textarea>
            {errors.description && <span className="validation-error">{errors.description}</span>}
          </div>
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="forRent" 
              checked={newProperty.forRent}
              onChange={(e) => setNewProperty({ ...newProperty, forRent: e.target.checked })}
            />
            <label for="forRent">Available for rent (instead of sale)</label>
          </div>
          <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Listing'}
          </button>
        </form>
      </div>

      <div className="listings-grid">
        {myProperties.length === 0 ? (
          <EmptyState message="You haven't listed any properties yet." />
        ) : (
          myProperties.map(property => (
            <div key={property.id} className="listing-card">
              {property.imageUrls && property.imageUrls.length > 0 && (
                <div className="listing-image-container">
                  <img src={property.imageUrls[0]} alt={property.title} className="listing-image" />
                </div>
              )}
              <div className="listing-info">
                <h3>{property.title}</h3>
                <p className="listing-price">
                  {property.forRent ? `$${property.price.toLocaleString()}/month` : `$${property.price.toLocaleString()}`}
                </p>
                <p className="listing-location">📍 {property.city}, {property.country}</p>
                <div className="listing-actions">
                  <button onClick={() => handleDelete(property.id)} className="btn-delete">Delete Listing</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyListings;
