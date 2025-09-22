import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  // 1. Enquanto a sessão está sendo verificada, mostramos uma tela de carregamento
  if (loading) {
    return <div>Verificando autenticação...</div>;
  }

  // 2. Se a verificação terminou E não há sessão, redireciona para o login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se a verificação terminou E HÁ uma sessão, permite o acesso
  return <Outlet />;
};

export default ProtectedRoute;