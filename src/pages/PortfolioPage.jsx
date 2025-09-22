import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import PortfolioCard from '../components/PortfolioCard';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('show_in_portfolio', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erro ao buscar projetos do portfólio:", error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchPortfolioProjects();
  }, []);

  return (
    <section className="container" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
      <div className="section-header">
        <h1>Nosso Portfólio</h1>
        <p>Explore alguns dos projetos que realizamos para nossos clientes.</p>
      </div>

      {loading ? (
        <p className="empty-portfolio-message">Carregando projetos...</p>
      ) : (
        // LÓGICA ATUALIZADA AQUI:
        // Se houver projetos, renderiza o grid.
        // Se não, renderiza a mensagem de portfólio vazio.
        projects.length > 0 ? (
          <div className="portfolio-grid">
            {projects.map(project => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="empty-portfolio-message">
            Nenhum projeto no portfólio no momento.
          </p>
        )
      )}
    </section>
  );
};

export default PortfolioPage;