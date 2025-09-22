import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';

const SecurityPage = () => {
    // ... (código do 2FA, sem alterações)

    // NOVO: Estados para o modo de manutenção
    const [isMaintenanceMode, setMaintenanceMode] = useState(false);
    const [loadingMaintenance, setLoadingMaintenance] = useState(true);

    // Busca o status atual do modo de manutenção
    useEffect(() => {
        async function getMaintenanceStatus() {
            const { data, error } = await supabase
                .from('site_settings')
                .select('maintenance_mode')
                .eq('id', 1)
                .single();

            if (data) {
                setMaintenanceMode(data.maintenance_mode);
            }
            setLoadingMaintenance(false);
        }
        getMaintenanceStatus();
    }, []);

    // Função para ligar/desligar o modo
    const handleToggleMaintenance = async (event) => {
        const newStatus = event.target.checked;
        setMaintenanceMode(newStatus);

        const promise = supabase
            .from('site_settings')
            .update({ maintenance_mode: newStatus })
            .eq('id', 1);

        toast.promise(promise, {
            loading: 'Atualizando status...',
            success: `Modo de manutenção ${newStatus ? 'ATIVADO' : 'DESATIVADO'}!`,
            error: 'Falha ao atualizar.',
        });
    };

    return (
        <div>
            <h1>Segurança da Conta (2FA)</h1>
            {/* ... (código da seção 2FA, sem alterações) ... */}

            {/* --- NOVA SEÇÃO DE MODO DE MANUTENÇÃO --- */}
            <div className="maintenance-section">
                <h2>Modo de Manutenção do Site</h2>
                <p>Quando ativado, o site público exibirá uma página de "em manutenção" para todos os visitantes. A dashboard continuará acessível para você.</p>
                {loadingMaintenance ? (
                    <p>Carregando status...</p>
                ) : (
                    <div className="toggle-switch">
                        <label className="switch">
                            <input type="checkbox" checked={isMaintenanceMode} onChange={handleToggleMaintenance} />
                            <span className="slider round"></span>
                        </label>
                        <span>{isMaintenanceMode ? 'Ativado' : 'Desativado'}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecurityPage;