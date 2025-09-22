import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light">
      <Header />
      <main>
        <Outlet /> {/* As páginas serão renderizadas aqui */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;