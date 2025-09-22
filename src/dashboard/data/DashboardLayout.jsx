import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- 1. VERIFIQUE SE ESTA IMPORTAÇÃO EXISTE
import Sidebar from '../components/Sidebar';
import '../../dashboard/dashboard.css'; // Importe o CSS da dashboard

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main-content">
        <Outlet /> {/* <-- 2. VERIFIQUE SE O <Outlet /> ESTÁ AQUI */}
      </main>
    </div>
  );
};

export default DashboardLayout;