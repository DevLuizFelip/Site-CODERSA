import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { BsTerminal } from 'react-icons/bs'; // Ícone similar ao da imagem

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} transition-all duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="text-2xl text-primary transition-transform group-hover:scale-110">
            <BsTerminal strokeWidth={0.5} />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-primary">
            Codersa
          </span>
        </Link>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-10">
          {['Serviços', 'Processo', 'Sobre', 'Contato'].map((item) => (
            <NavLink 
              key={item}
              to={`/${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`} // converte Serviços -> servicos
              className={({ isActive }) => 
                `text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'
                }`
              }
            >
              {item}
            </NavLink>
          ))}
          
          <ThemeToggleButton />
        </nav>

        {/* MENU MOBILE (Simples para agora) */}
        <button className="md:hidden text-primary">
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;