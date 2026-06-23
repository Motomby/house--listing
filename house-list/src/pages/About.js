import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-hero">
        <h1>About HomeFinder</h1>
        <p>Your trusted partner in finding the perfect place to call home.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            HomeFinder is a premier real estate platform dedicated to connecting buyers, sellers, and renters with the best properties on the market. With over a decade of experience in the real estate industry, we pride ourselves on our deep market knowledge and commitment to exceptional customer service.
          </p>
          <p>
            We believe that finding a home shouldn't be a stressful process. That's why we've built a platform that is intuitive, transparent, and comprehensive, ensuring you have all the tools you need to make an informed decision.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to democratize real estate and make finding a home as seamless as possible. We strive to provide accurate, up-to-date listings, empower our clients with market insights, and foster trust through every transaction.
          </p>
        </section>

        <section className="about-section">
          <h2>Why We Stand Out</h2>
          <ul className="about-list">
            <li><strong>Expert Agents:</strong> Our team consists of vetted professionals who know the neighborhoods inside out.</li>
            <li><strong>Vast Network:</strong> We have exclusive access to off-market properties and premier listings.</li>
            <li><strong>Client-First Approach:</strong> We tailor our search and selling strategies strictly around your goals.</li>
            <li><strong>Innovative Technology:</strong> We use the latest in property tech to give you virtual tours, accurate pricing models, and seamless digital contracts.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;
