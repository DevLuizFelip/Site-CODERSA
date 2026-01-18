import React from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-transparent">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Copyright */}
        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.15em] text-center md:text-left">
          © {new Date().getFullYear()} Codersa. Todos os direitos reservados.
        </p>

        {/* Links Sociais */}
        <div className="flex items-center gap-6">
          <SocialLink href="https://www.linkedin.com/in/luizcostasantana/" icon={<FaLinkedinIn />} />
          <SocialLink href="https://github.com/DevLuizFelip" icon={<FaGithub />} />
          <SocialLink href="mailto:contato@codersa.ai.com" icon={<FaEnvelope />} />
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-primary transition-colors duration-300 text-lg"
  >
    {icon}
  </a>
);

export default Footer;