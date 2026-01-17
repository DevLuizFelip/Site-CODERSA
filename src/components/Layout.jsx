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
      // Ocultando erro se a tabela não existir ainda na migração
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('maintenance_mode')
          .eq('id', 1)
          .single();
        
        if (data) {
          setMaintenanceMode(data.maintenance_mode);
        }
      } catch (e) {
        console.log('Tabela de configurações ainda não criada');
      }
      setLoading(false);
    };

    checkMaintenanceStatus();
  }, []);

  if (loading) return null;

  if (maintenanceMode) return <MaintenancePage />;

  return (
    <div className="flex flex-col min-h-screen bg-background text-text transition-colors duration-500">
      <Header />
      {/* O main cresce para empurrar o footer para baixo */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;