import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import PortfolioCard from '../components/PortfolioCard';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioProjects = async () => {
      // 1. Busca os dados dos projetos como antes
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('show_in_portfolio', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erro ao buscar projetos do portfólio:", error);
      } else {
        // 2. **A CORREÇÃO ESTÁ AQUI**
        // Mapeia os resultados e transforma o caminho da imagem em uma URL pública
        const projectsWithUrls = data.map(project => {
          // Se o projeto tiver um caminho de imagem salvo...
          if (project.image_url) {
            const { data: { publicUrl } } = supabase.storage
              .from('project-images') // O nome do seu bucket no Supabase Storage
              .getPublicUrl(project.image_url); // Gera a URL pública
            
            // Retorna o objeto do projeto com a image_url atualizada
            return { ...project, image_url: publicUrl };
          }
          // Se não tiver imagem, retorna o projeto como está
          return project;
        });

        // 3. Salva no estado a lista de projetos já com as URLs corretas
        setProjects(projectsWithUrls);
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