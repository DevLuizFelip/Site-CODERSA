import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <p>© 2025 CODERSA. Todos os direitos reservados.</p>
        <div className="site-footer__links">
          {/* Links Adicionados */}
          <a href="mailto:suporte@codersa.com">Email de Suporte</a>
          <a href="https://instagram.com/seu-usuario" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Serviço</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;