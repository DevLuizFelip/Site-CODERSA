import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    // Enquanto a sessão está sendo verificada, mostramos uma tela de carregamento
    // para evitar o "flash" da página de login.
    return <div>Verificando autenticação...</div>;
  }

  if (!session) {
    // Se a verificação terminou e não há sessão, redireciona para o login
    return <Navigate to="/login" replace />;
  }

  // Se a verificação terminou e há uma sessão, permite o acesso
  return <Outlet />;
};

export default ProtectedRoute;