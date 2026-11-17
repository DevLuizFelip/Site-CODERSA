import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Brand from '../site/Brand';
import { navigation } from '../site/content';
import { ContactLink } from '../site/Sections';
import ThemeToggleButton from './ThemeToggleButton';
export default function Header() {
  const home=useLocation().pathname==='/';
  const items=home?[{path:'#sobre',label:'Sobre',external:true},{path:'#solucoes',label:'Soluções',external:true},{path:'#blueprint',label:'Blueprint',external:true},{path:'#processo',label:'Processo',external:true}]:navigation;
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const close = () => setOpen(false);
  return <header className="site-header" onKeyDown={event => { if (event.key === 'Escape' && open) { close(); toggle.current?.focus(); } }}>
    <Link className="logo" to="/" aria-label="CODERSA — início" onClick={close}><Brand/></Link>
    <nav id="main-nav" className={open ? 'open' : ''} aria-label="Principal">{items.map(item => item.external ? <a href={item.path} key={item.path} onClick={close}>{item.label}</a> : <NavLink to={item.path} end key={item.path} onClick={close}>{item.label}</NavLink>)}</nav>
    <div className="header-tools"><ThemeToggleButton/><ContactLink source="header" className="header-contact">Vamos conversar</ContactLink><button type="button" className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(value => !value)}>Menu <span aria-hidden="true">☰</span></button></div>
  </header>;
}
