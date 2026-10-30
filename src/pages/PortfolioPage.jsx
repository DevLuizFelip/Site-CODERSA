import { useEffect, useState } from 'react';
import PortfolioCard from '../components/PortfolioCard';
import { PageIntro, Demonstration, ContactLink, ContactSection } from '../site/Sections';

export default function PortfolioPage() {
  const [state, setState] = useState({ status: 'loading', projects: [] });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timer = setTimeout(() => { controller.abort(); if (active) setState({ status: 'error', projects: [] }); }, 8000);
    async function load() {
      try {
        const { supabase } = await import('../supabaseClient');
        if (!active || controller.signal.aborted) return;
        const { data, error } = await supabase.from('projects').select('id,title,description,technologies,image_url,show_in_portfolio').eq('show_in_portfolio', true).order('created_at', { ascending: false }).abortSignal(controller.signal);
        if (error) throw error;
        const projects = (data || []).filter(project => project.show_in_portfolio === true).map(project => ({ ...project, image_url: project.image_url ? supabase.storage.from('project-images').getPublicUrl(project.image_url).data.publicUrl : null }));
        if (active) setState({ status: projects.length ? 'ready' : 'empty', projects });
      } catch { if (active) setState({ status: 'error', projects: [] }); }
      finally { clearTimeout(timer); }
    }
    load();
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [attempt]);
  const retry = () => { setState({ status: 'loading', projects: [] }); setAttempt(value => value + 1); };
  return <><PageIntro eyebrow="RESULTADOS E DEMONSTRAÇÕES" title="Veja o trabalho" accent="ganhar forma.">Um fluxo ilustrativo para explicar a abordagem, seguido dos projetos selecionados para publicação no portfólio.</PageIntro><Demonstration/><section className="section-pad"><p className="eyebrow">PORTFÓLIO</p><h2>Projetos publicados.</h2><p className="portfolio-note">Os projetos abaixo são descrições de entregas publicadas pela CODERSA. A demonstração acima é ilustrativa e não representa resultado de cliente.</p>
    {state.status === 'ready' ? <div className="portfolio-grid">{state.projects.map(project => <PortfolioCard key={project.id} project={project}/>)}</div> :
      <div className="portfolio-state" role="status">{state.status === 'loading' ? <p>Carregando projetos…</p> : <><p>{state.status === 'error' ? 'Não foi possível carregar o portfólio agora.' : 'Ainda não há projetos disponíveis para exibição.'}</p>{state.status === 'error' && <button type="button" className="button primary" onClick={retry}>Tentar novamente</button>}<div><ContactLink className="text-link">Conversar sobre uma necessidade</ContactLink></div></>}</div>}
  </section><ContactSection/></>;
}
