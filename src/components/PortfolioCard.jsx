import React from 'react';

const PortfolioCard = ({ project }) => {
  return (
    <div className="portfolio-card">
      <img 
        src={project.image_url || 'https://via.placeholder.com/400x225.png?text=CODERSA'} 
        alt={project.title} 
        className="portfolio-card__image" 
      />
      <div className="portfolio-card__content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="portfolio-card__tech-list">
          {project.technologies?.map(tech => (
            <span key={tech} className="portfolio-card__tech-badge">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;