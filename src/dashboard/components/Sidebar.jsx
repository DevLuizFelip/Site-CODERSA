import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const Logo = () => ( 
    <svg height="32" width="32" viewBox="0 0 48 48">
        <path fillRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="var(--primary-color)" clipRule="evenodd"></path>
    </svg> 
);

const Sidebar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(); // Desloga do Supabase e zera o estado local
      
      // FORÇAR RECARREGAMENTO DA PÁGINA PARA LIMPAR TUDO
      // Isso garante que qualquer estado residual, cache ou sessão de navegador seja limpo.
      window.location.href = '/login'; // Redireciona e recarrega
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Logo />
        <h2>CODERSA</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/admin" end>Início</NavLink>
        <NavLink to="/admin/contatos">Contatos</NavLink>
        <NavLink to="/admin/projetos">Projetos</NavLink>
        <NavLink to="/admin/avaliacoes">Avaliações</NavLink>
        <NavLink to="/admin/seguranca">Segurança</NavLink>
      </nav>
      <div style={{ marginTop: 'auto' }}>
        <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem', cursor: 'pointer', backgroundColor: '#f3f4f6', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
          Sair (Logout)
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;