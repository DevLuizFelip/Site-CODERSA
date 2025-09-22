import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Importações do Site Público
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import LeaveReviewPage from './pages/LeaveReviewPage';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './context/ThemeContext';

// Importações da Dashboard (com caminho corrigido para DashboardLayout)
import DashboardLayout from './dashboard/data/DashboardLayout'; // <-- CAMINHO CORRIGIDO
import DashboardHome from './dashboard/pages/DashboardHome';
import ContactsPage from './dashboard/pages/ContactsPage';
import ProjectsPage from './dashboard/pages/ProjectsPage';
import TestimonialsPage from './dashboard/pages/TestimonialsPage';
import SecurityPage from './dashboard/pages/SecurityPage';

// Importações de Autenticação
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';

function App() {
  return (
    // O AuthProvider deve envolver todas as rotas para que a autenticação funcione
    <ThemeProvider>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: { background: '#d1fae5', color: '#065f46' },
          },
          error: {
            style: { background: '#fee2e2', color: '#991b1b' },
          },
        }}
      />
      <Routes>
        {/* Rotas do Site Principal (Públicas) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="contato" element={<ContactPage />} />
          <Route path="avaliar" element={<LeaveReviewPage />} />
        </Route>

        {/* Rota de Login (Pública) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas da Dashboard (AGORA PROTEGIDAS CORRETAMENTE) */}
        <Route element={<ProtectedRoute />}> {/* <-- O Protetor envolve o layout da dashboard */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="contatos" element={<ContactsPage />} />
            <Route path="projetos" element={<ProjectsPage />} />
            <Route path="avaliacoes" element={<TestimonialsPage />} /> 
            <Route path="seguranca" element={<SecurityPage />} />
          </Route>
        </Route>

      </Routes>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;