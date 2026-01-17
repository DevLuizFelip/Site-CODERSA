import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { BsMoonStars, BsSun } from 'react-icons/bs'; // Ícones mais finos/modernos da biblioteca Bootstrap Icons

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full text-gray-400 hover:text-primary transition-colors duration-300 focus:outline-none"
      aria-label="Alternar Tema"
    >
      {theme === 'light' ? <BsMoonStars size={18} /> : <BsSun size={20} />}
    </button>
  );
};

export default ThemeToggleButton;