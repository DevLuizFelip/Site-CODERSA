import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Layout do site principal
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import LeaveReviewPage from './pages/LeaveReviewPage';


// Importe o layout e as páginas da dashboard
import DashboardLayout from './dashboard/data/DashboardLayout';
import DashboardHome from './dashboard/pages/DashboardHome';
import ContactsPage from './dashboard/pages/ContactsPage';
import LeadsPage from './dashboard/pages/LeadsPage';
import ProjectsPage from './dashboard/pages/ProjectsPage';
import ProtectedRoute from './auth/ProtectedRoute';
import TestimonialsPage from './dashboard/pages/TestimonialsPage';

function App() {
  return (
    <><Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: { background: '#d1fae5', color: '#065f46' },
        },
        error: {
          style: { background: '#fee2e2', color: '#991b1b' },
        },
      }} /><Routes>
        {/* Rotas do Site Principal */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="contato" element={<ContactPage />} />
        <Route path="avaliar" element={<LeaveReviewPage />} />

        </Route>
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas da Dashboard, agrupadas sob /admin */}
        <Route element={<ProtectedRoute />}></Route>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="contatos" element={<ContactsPage />} />
          {/* <Route path="leads" element={<LeadsPage />} /> */}
          <Route path="projetos" element={<ProjectsPage />} />
          <Route path="avaliacoes" element={<TestimonialsPage />} /> 
        </Route>
      </Routes></>
  );
}

export default App;