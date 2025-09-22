import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Logo = () => ( <svg height="32" width="32" viewBox="0 0 48 48"><path fillRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="var(--primary-color)" clipRule="evenodd"></path></svg> );

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="header-logo">
          <Logo />
          <span>CODERSA</span>
        </Link>
        <nav className="header-nav">
          <NavLink to="/#services">Serviços</NavLink>
          <NavLink to="/portfolio">Projetos</NavLink>
          <NavLink to="/contato">Contato</NavLink>
        </nav>
        <Link to="/contato" className="header-button">
          Solicitar Orçamento
        </Link>
        {/* Adicionar um botão de menu mobile aqui se necessário */}
      </div>
    </header>
  );
};

export default Header;