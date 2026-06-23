import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../contexts/PropertyContext';
import './Home.css';

function Home() {
  const { properties } = useContext(PropertyContext);
  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>
          <p>Discover the perfect property for rent or sale with us.</p>
          <Link to="/properties" className="btn-primary hero-btn">Explore Properties</Link>
        </div>
      </section>
      
      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Wide Selection</h3>
            <p>Thousands of properties to choose from</p>
          </div>
          <div className="feature-card">
            <h3>Trusted Agents</h3>
            <p>Work with experienced real estate professionals</p>
          </div>
          <div className="feature-card">
            <h3>Easy Process</h3>
            <p>Simple and transparent transactions</p>
          </div>
        </div>
      </section>

      <section className="featured-properties">
        <h2>Featured Properties</h2>
        <p className="section-subtitle">Take a look at some of our top picks</p>
        <div className="properties-grid">
          {featuredProperties.map(property => (
            <div key={property.id} className="property-card">
              {property.imageUrls && property.imageUrls.length > 0 && (
                <div className="property-image-container">
                  <img src={property.imageUrls[0]} alt={property.title} className="property-image" />
                </div>
              )}
              <div className="property-info">
                <h3>{property.title}</h3>
                <p className="property-price">${property.price.toLocaleString()}</p>
                <div className="property-meta">
                  <span className="badge type-badge">{property.type}</span>
                  <span className="location">📍 {property.city}, {property.country}</span>
                </div>
                <Link to="/properties" className="view-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/properties" className="btn-primary hero-btn">View All Properties</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
