import React, { useState } from 'react';
import { mockLeads } from '../data/mockData'; // Apenas para o estado inicial
import Modal from '../components/Modal';

const leadStatuses = [
  'Novo Lead', 
  'Contactado', 
  'Reunião Agendada', 
  'Proposta Enviada', 
  'Negociação',
  'Ganhamos',
  'Perdemos'
];

const LeadsPage = () => {
    const [leads, setLeads] = useState(mockLeads);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    const handleRowClick = (lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLead(null);
    };

    const handleStatusChange = (leadId, newStatus) => {
        const updatedLeads = leads.map(lead =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
        );
        setLeads(updatedLeads);
    };

    const getStatusClass = (status) => {
        // Você pode criar mais classes de status se quiser cores diferentes
        const statusClassMap = {
            'novo lead': 'status-novo',
            'contactado': 'status-contactado',
            'reunião agendada': 'status-contactado',
            'proposta enviada': 'status-proposta-enviada',
            'negociação': 'status-novo', // Reutilizando cores
            'ganhamos': 'status-proposta-enviada',
            'perdemos': 'status-arquivado'
        };
        return statusClassMap[status.toLowerCase()] || 'status-lido';
    };
    
    return (
        <div>
            <h1>Pedidos de Orçamento</h1>
            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Tipo de Projeto</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map(lead => (
                            <tr key={lead.id} onClick={() => handleRowClick(lead)}>
                                <td>{lead.clientName}</td>
                                <td>{lead.projectType}</td>
                                <td>{lead.date}</td>
                                <td>
                                    <span className={`status-badge ${getStatusClass(lead.status)}`}>
                                        {lead.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedLead && (
                    <div className="modal-details">
                        <h2>Detalhes do Pedido</h2>
                        {/* ... outros detalhes ... */}
                         <div className="detail-item">
                            <strong>Detalhes do Pedido:</strong>
                            <p>{selectedLead.details}</p>
                        </div>
                        <div className="status-selector">
                            <label htmlFor="lead-status-select">Alterar Status:</label>
                            <select
                                id="lead-status-select"
                                value={selectedLead.status}
                                onChange={(e) => {
                                    handleStatusChange(selectedLead.id, e.target.value);
                                    setSelectedLead({ ...selectedLead, status: e.target.value });
                                }}
                            >
                                {leadStatuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedLead && (
            <div className="modal-details">
                <h2>Detalhes do Pedido</h2>
                {/* ... outros detail-item ... */}
                <div className="detail-item">
                    <strong>Detalhes do Pedido:</strong>
                    <p>{selectedLead.details}</p>
                </div>

                <div className="status-selector">
                    {/* ... seletor de status ... */}
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="modal-actions">
                    <a href={`mailto:${selectedLead.email}`} className="action-button action-button--email">
                        Enviar Email
                    </a>
                    {selectedLead.phone && (
                        <a 
                          href={`https://wa.me/${selectedLead.phone}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="action-button action-button--whatsapp"
                        >
                          Chamar no WhatsApp
                        </a>
                    )}
                </div>
            </div>
        )}
      </Modal>
            </Modal>
        </div>
    );
};

export default LeadsPage;