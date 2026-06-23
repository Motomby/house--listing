
import './PropertyCard.css';

export const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      {property.imageUrls && property.imageUrls.length > 0 && (
        <div className="property-image-container">
          <img src={property.imageUrls[0]} alt={property.title} className="property-image" />
        </div>
      )}
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="property-price">
          {property.forRent ? `$${property.price.toLocaleString()}/month` : `$${property.price.toLocaleString()}`}
        </p>
        <div className="property-meta">
          <span className="badge type-badge">{property.type}</span>
          <span className="location">📍 {property.city}, {property.country}</span>
        </div>
        <p className="property-description">{property.description}</p>
      </div>
    </div>
  );
};
