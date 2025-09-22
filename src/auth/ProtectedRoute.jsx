// src/auth/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  // Agora também pegamos o estado de 'loading'
  const { session, loading } = useAuth();

  // 1. Se ainda estivermos verificando a sessão, não mostre nada (ou um spinner)
  if (loading) {
    return <div>Carregando...</div>; // Ou null, ou um componente de Spinner
  }

  // 2. Se a verificação terminou E não há sessão, redireciona para o login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se a verificação terminou E HÁ uma sessão, permite o acesso
  return <Outlet />;
};

export default ProtectedRoute;