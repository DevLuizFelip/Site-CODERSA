import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MaintenancePage from '../pages/MaintenancePage';
import { metadata, siteOrigin } from '../site/content';
import '../site/site.css';
import '../site/refinements.css';

export default function Layout() {
  const [maintenance, setMaintenance] = useState(false);
  const location = useLocation();
  const lastPath = useRef(location.pathname);
  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const info = metadata[path];
    document.title = info?.title || 'CODERSA | Avaliação';
    const setMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) { element = document.createElement(selector.startsWith('link') ? 'link' : 'meta'); document.head.appendChild(element); }
      Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    };
    setMeta('meta[name="description"]', { name: 'description', content: info?.description || 'Compartilhe sua experiência com a CODERSA.' });
    setMeta('meta[name="robots"]', { name: 'robots', content: info ? 'index,follow' : 'noindex,follow' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: info?.title || 'CODERSA' });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: info?.description || '' });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: siteOrigin + path });
    setMeta('link[rel="canonical"]', { rel: 'canonical', href: siteOrigin + path });
    if (lastPath.current !== location.pathname) {
      document.getElementById('conteudo')?.focus({ preventScroll: true });
      if (!location.hash) window.scrollTo(0, 0);
    }
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    lastPath.current = location.pathname;
  }, [location.pathname, location.hash]);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    async function check() {
      try {
        const { supabase } = await import('../supabaseClient');
        if (!active || controller.signal.aborted) return;
        const { data } = await supabase.from('site_settings').select('maintenance_mode').eq('id', 1).single().abortSignal(controller.signal);
        if (active && data?.maintenance_mode === true) setMaintenance(true);
      } catch { /* The public presentation remains available when settings cannot load. */ }
      finally { clearTimeout(timer); }
    }
    check();
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, []);
  if (maintenance) return <div className="public-site"><main id="conteudo"><MaintenancePage/></main></div>;
  return <div className="public-site"><a className="skip" href="#conteudo">Pular para o conteúdo</a><Header key={location.pathname}/><main id="conteudo" tabIndex="-1"><Outlet/></main><Footer/></div>;
}
