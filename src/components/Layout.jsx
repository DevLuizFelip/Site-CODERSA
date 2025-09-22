import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { supabase } from '../supabaseClient';
import MaintenancePage from '../pages/MaintenancePage';

const Layout = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMaintenanceStatus = async () => {
      // Busca a configuração do banco de dados
      const { data, error } = await supabase
        .from('site_settings')
        .select('maintenance_mode')
        .eq('id', 1)
        .single();
      
      if (data) {
        setMaintenanceMode(data.maintenance_mode);
      }
      setLoading(false);
    };

    checkMaintenanceStatus();
  }, []);

  // Enquanto verifica, mostra uma tela em branco ou um loader
  if (loading) {
    return <div></div>; // Ou um componente de spinner
  }

  // Se o modo de manutenção estiver ATIVO, mostra a página de manutenção
  if (maintenanceMode) {
    return <MaintenancePage />;
  }

  // Se estiver DESATIVADO, mostra o site normal
  return (
    <div className="site-wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;