import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { session } = useAuth();

  // Se não houver sessão ativa, redireciona para a página de login
  if (!session) {
    return <Navigate to="/login" />;
  }

  // Se houver sessão, permite o acesso à rota filha (a dashboard)
  return <Outlet />;
};

export default ProtectedRoute;