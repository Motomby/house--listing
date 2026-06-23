import './Services.css';

function Services() {
  return (
    <div className="services">
      <div className="services-header">
        <h1>Our Premium Services</h1>
        <p>Comprehensive real estate solutions tailored to your unique needs.</p>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <div className="service-image-container">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" alt="Property Listings" className="service-image" />
          </div>
          <div className="service-content">
            <h3>Property Listings</h3>
            <p>List your property with us to reach thousands of potential buyers and renters. We provide professional photography and premium placement.</p>
          </div>
        </div>
        <div className="service-card">
          <div className="service-image-container">
            <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800" alt="Buying Assistance" className="service-image" />
          </div>
          <div className="service-content">
            <h3>Buying Assistance</h3>
            <p>Our expert agents will guide you through the entire home-buying process, from curating the best listings to negotiating the final closing price.</p>
          </div>
        </div>
        <div className="service-card">
          <div className="service-image-container">
            <img src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800" alt="Rental Management" className="service-image" />
          </div>
          <div className="service-content">
            <h3>Rental Management</h3>
            <p>We handle tenant screening, rent collection, and property maintenance, so you can enjoy passive income without the typical landlord headaches.</p>
          </div>
        </div>
        <div className="service-card">
          <div className="service-image-container">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" alt="Market Analysis" className="service-image" />
          </div>
          <div className="service-content">
            <h3>Market Analysis</h3>
            <p>Get accurate valuations for your property. We use real-time market data to ensure you price your home perfectly for a quick and profitable sale.</p>
          </div>
        </div>
        <div className="service-card">
          <div className="service-image-container">
            <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800" alt="Legal Consulting" className="service-image" />
          </div>
          <div className="service-content">
            <h3>Legal Consulting</h3>
            <p>Our partnered legal professionals ensure your contracts are rock-solid, protecting you from liabilities and ensuring a smooth transfer of ownership.</p>
          </div>
        </div>
        <div className="service-card">
          <div className="service-image-container">
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800" alt="Mortgage Advisory" className="service-image" />
          </div>
          <div className="service-content">
            <h3>Mortgage Advisory</h3>
            <p>Need financing? We connect you with top-tier lenders and help you secure the best mortgage rates to make your dream home a reality.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
