import './Projects.css';

function Projects() {
  return (
    <div className="projects">
      <h1>Our Projects</h1>
      <div className="projects-grid">
        <div className="project-card">
          <h3>Modern Apartments</h3>
          <p>Luxury living in the city center</p>
        </div>
        <div className="project-card">
          <h3>Suburban Homes</h3>
          <p>Spacious houses in quiet neighborhoods</p>
        </div>
        <div className="project-card">
          <h3>Beach Villas</h3>
          <p>Premium properties with ocean views</p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
