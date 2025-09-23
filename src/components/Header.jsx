import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';

// import logoDaEmpresa from '../assets/CodersaLogo8.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="header-logo">
          {/* <img src={logoDaEmpresa} alt="Logo da CODERSA" className="site-logo" /> */}
          <span>CODER&SA</span>
        </Link>
        <nav className="header-nav">
          <NavLink to="/contato">Serviços</NavLink>
          <NavLink to="/portfolio">Projetos</NavLink>
          <NavLink to="/contato">Contato</NavLink>
        </nav>
        <Link to="/contato" className="header-button">
          Solicitar Orçamento
        </Link>
        <ThemeToggleButton />
        {/* Adicionar um botão de menu mobile aqui se necessário */}
      </div>
    </header>
  );
};

export default Header;