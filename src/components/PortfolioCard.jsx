import { useState } from 'react';
import { BrandMark } from '../site/Brand';
export default function PortfolioCard({ project }) {
  const [failed, setFailed] = useState(false);
  return <article className="portfolio-card">{project.image_url && !failed ? <img src={project.image_url} alt={project.title || 'Projeto CODERSA'} loading="lazy" width="600" height="400" onError={() => setFailed(true)}/> : <div className="portfolio-placeholder" aria-hidden="true"><BrandMark/></div>}<div className="portfolio-card__content"><h3>{project.title}</h3><p>{project.description}</p>{Array.isArray(project.technologies) && <ul className="portfolio-card__tech-list" aria-label="Tecnologias">{project.technologies.map(technology => <li className="portfolio-card__tech-badge" key={technology}>{technology}</li>)}</ul>}</div></article>;
}
