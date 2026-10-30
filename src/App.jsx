import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ProcessPage from './pages/ProcessPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import { ThemeProvider } from './context/ThemeContext';
const LeaveReviewPage = lazy(() => import('./pages/LeaveReviewPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AuthLayout = lazy(() => import('./auth/AuthLayout'));
const ProtectedRoute = lazy(() => import('./auth/ProtectedRoute'));
const DashboardLayout = lazy(() => import('./dashboard/data/DashboardLayout'));
const DashboardHome = lazy(() => import('./dashboard/pages/DashboardHome'));
const ContactsPage = lazy(() => import('./dashboard/pages/ContactsPage'));
const ProjectsPage = lazy(() => import('./dashboard/pages/ProjectsPage'));
const TestimonialsPage = lazy(() => import('./dashboard/pages/TestimonialsPage'));
const SecurityPage = lazy(() => import('./dashboard/pages/SecurityPage'));

export default function App() {
  return <ThemeProvider><Toaster position="top-right"/><Suspense fallback={<p className="route-loading" role="status">Carregando…</p>}><Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<HomePage/>}/><Route path="servicos" element={<ServicesPage/>}/><Route path="sobre" element={<AboutPage/>}/><Route path="processo" element={<ProcessPage/>}/><Route path="portfolio" element={<PortfolioPage/>}/><Route path="contato" element={<ContactPage/>}/><Route path="avaliar" element={<LeaveReviewPage/>}/>
      <Route path="*" element={<section className="section-pad"><h1>Página não encontrada.</h1><p>Use a navegação para encontrar as soluções ou entrar em contato.</p></section>}/>
    </Route>
    <Route element={<AuthLayout/>}><Route path="/login" element={<LoginPage/>}/><Route element={<ProtectedRoute/>}><Route path="/admin" element={<DashboardLayout/>}><Route index element={<DashboardHome/>}/><Route path="contatos" element={<ContactsPage/>}/><Route path="projetos" element={<ProjectsPage/>}/><Route path="avaliacoes" element={<TestimonialsPage/>}/><Route path="seguranca" element={<SecurityPage/>}/></Route></Route></Route>
  </Routes></Suspense></ThemeProvider>;
}
