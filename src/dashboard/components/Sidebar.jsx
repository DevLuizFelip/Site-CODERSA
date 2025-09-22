import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';


// Componente do Logo (pode ser um SVG ou img)
const Logo = () => ( 
    <svg height="32" width="32" viewBox="0 0 48 48">
        <path fillRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="var(--primary-color)" clipRule="evenodd"></path>
    </svg> 
);

const Sidebar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login'); // Redireciona para o login após sair
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Logo />
        <h2>CODERSA</h2>
      </div>

      {/* ESTA É A SEÇÃO DE NAVEGAÇÃO QUE ESTÁ FALTANDO */}
      <nav className="sidebar-nav">
        <NavLink to="/admin" end>Início</NavLink>
        <NavLink to="/admin/contatos">Contatos</NavLink>
        {/* <NavLink to="/admin/leads">Pedidos</NavLink> */}
        <NavLink to="/admin/projetos">Projetos</NavLink>
        <NavLink to="/admin/avaliacoes">Avaliações</NavLink>
        <NavLink to="/admin/seguranca">Segurança</NavLink>
      </nav>
      
      {/* O botão de logout fica no final */}
      <div style={{ marginTop: 'auto' }}>
        <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem', cursor: 'pointer', backgroundColor: '#f3f4f6', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
          Sair (Logout)
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;