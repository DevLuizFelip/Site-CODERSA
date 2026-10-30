import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Brand from '../site/Brand';
import { navigation } from '../site/content';
import { ContactLink } from '../site/Sections';
import ThemeToggleButton from './ThemeToggleButton';
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const close = () => setOpen(false);
  return <header className="site-header" onKeyDown={event => { if (event.key === 'Escape' && open) { close(); toggle.current?.focus(); } }}>
    <Link className="logo" to="/" aria-label="CODERSA — início" onClick={close}><Brand/></Link>
    <nav id="main-nav" className={open ? 'open' : ''} aria-label="Principal">{navigation.map(item => <NavLink to={item.path} key={item.path} onClick={close}>{item.label}</NavLink>)}</nav>
    <div className="header-tools"><ThemeToggleButton/><ContactLink source="header" className="header-contact">Vamos conversar</ContactLink><button type="button" className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(value => !value)}>Menu <span aria-hidden="true">☰</span></button></div>
  </header>;
}
