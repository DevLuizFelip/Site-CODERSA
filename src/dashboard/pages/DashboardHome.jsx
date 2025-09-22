import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; // Importa nosso cliente Supabase
import StatCard from '../components/StatCard';
import toast from 'react-hot-toast';

const DashboardHome = () => {
  // 1. Estado para armazenar as estatísticas e o estado de carregamento
  const [stats, setStats] = useState({
    newContactsToday: 0,
    totalContacts: 0,
    activeProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  // 2. useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    async function fetchStats() {
      try {
        // --- Cálculo das Datas para "Hoje" ---
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Início do dia de hoje
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // Início do dia de amanhã

        // --- Realiza as 3 consultas ao Supabase em paralelo para mais eficiência ---
        const [newContactsRes, totalContactsRes, activeProjectsRes] = await Promise.all([
          // Consulta 1: Conta contatos criados hoje
          supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', today.toISOString())
            .lt('created_at', tomorrow.toISOString()),

          // Consulta 2: Conta o total de contatos
          supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true }),

          // Consulta 3: Conta projetos que NÃO estão com status 'Concluído'
          supabase
            .from('projects')
            .select('*', { count: 'exact', head: true })
            .neq('status', 'Concluído'),
        ]);

        // 3. Atualiza o estado com os resultados das consultas
        setStats({
          newContactsToday: newContactsRes.count ?? 0,
          totalContacts: totalContactsRes.count ?? 0,
          activeProjects: activeProjectsRes.count ?? 0,
        });

      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        toast.error("Não foi possível carregar as estatísticas.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []); // O array vazio [] garante que a busca só aconteça uma vez

  // 4. Renderiza um estado de carregamento
  if (loading) {
    return <div>Carregando estatísticas...</div>;
  }

  // 5. Renderiza os cards com os dados reais do estado
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <StatCard title="Novos Contatos (Hoje)" value={stats.newContactsToday} />
        <StatCard title="Total de Contatos" value={stats.totalContacts} />
        <StatCard title="Projetos Ativos" value={stats.activeProjects} />
      </div>
    </div>
  );
};

export default DashboardHome;