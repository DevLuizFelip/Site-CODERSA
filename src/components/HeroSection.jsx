import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background px-4 overflow-hidden">
      
      {/* Conteúdo Central */}
      <div className="text-center z-10 max-w-4xl mx-auto mt-16 md:mt-0">
        
        {/* Título Gigante */}
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium text-primary mb-6 tracking-tight leading-tight">
          Codersa
          <span className="text-gray-300">.</span>
        </h1>

        {/* Subtítulo Espaçado */}
        <p className="font-sans text-xs md:text-sm lg:text-base text-gray-400 uppercase tracking-[0.25em] mb-12 font-medium">
          Engenharia de Software Potencializada por IA.
        </p>

        {/* Botão Principal Minimalista */}
        <Link 
          to="/contato" 
          className="inline-block bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-[0.2em] py-4 px-10 hover:opacity-90 transition-all duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none"
        >
          Comece Sua Jornada
        </Link>
      </div>

      {/* Elemento Decorativo de Fundo (Blur Sutil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none"></div>

    </section>
  );
};

export default HeroSection;