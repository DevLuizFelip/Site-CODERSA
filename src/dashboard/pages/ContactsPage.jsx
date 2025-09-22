import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import useDebounce from '../../hooks/useDebounce';
import Pagination from '../components/Pagination';

const contactStatuses = ['Novo', 'Lido', 'Respondido', 'Arquivado'];
const filterOptions = ['Ativos', 'Todos', ...contactStatuses];
const ITEMS_PER_PAGE = 10;

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Ativos');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchContacts = useCallback(async (page) => {
    setLoading(true);
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    let query = supabase.from('contacts').select('*', { count: 'exact' });

    if (debouncedSearchTerm) {
      query = query.ilike('name', `%${debouncedSearchTerm}%`);
    }

    if (statusFilter === 'Ativos') {
      query = query.neq('status', 'Arquivado');
    } else if (statusFilter !== 'Todos') {
      query = query.eq('status', statusFilter);
    }

    query = query.range(from, to).order('created_at', { ascending: false });
    const { data, error, count } = await query;

    if (error) {
      toast.error('Não foi possível carregar os contatos.');
    } else {
      setContacts(data);
      setTotalContacts(count);
    }
    setLoading(false);
  }, [debouncedSearchTerm, statusFilter]);

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage, fetchContacts]);

  // --- INÍCIO DAS FUNÇÕES DE MANIPULAÇÃO (DEFINIDAS UMA ÚNICA VEZ) ---

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'novo': return 'status-novo';
      case 'lido': return 'status-lido';
      case 'respondido': return 'status-contactado';
      case 'arquivado': return 'status-arquivado';
      default: return '';
    }
  };

  const handleRowClick = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleStatusChange = async (contactId, newStatus) => {
    const originalContacts = [...contacts];
    const updatedContacts = contacts.map(c => c.id === contactId ? { ...c, status: newStatus } : c);
    setContacts(updatedContacts);
    setSelectedContact(updatedContacts.find(c => c.id === contactId));
    const { error } = await supabase.from('contacts').update({ status: newStatus }).eq('id', contactId);
    if (error) {
      toast.error("Falha ao atualizar status.");
      setContacts(originalContacts);
    } else {
      toast.success("Status atualizado!");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm("Tem certeza que deseja excluir esta mensagem? Esta ação é irreversível.")) {
      const { error } = await supabase.from('contacts').delete().eq('id', contactId);
      if (error) {
        toast.error("Erro ao excluir a mensagem.");
      } else {
        toast.success("Mensagem excluída com sucesso!");
        setContacts(contacts.filter(c => c.id !== contactId));
        closeModal();
      }
    }
  };

  // --- FIM DAS FUNÇÕES DE MANIPULAÇÃO ---

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Mensagens de Contato</h1>
      <div className="filters-bar">
        <input type="search" placeholder="Buscar por nome..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
          {filterOptions.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id} onClick={() => handleRowClick(contact)}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                <td><span className={`status-badge ${getStatusClass(contact.status)}`}>{contact.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} totalItems={totalContacts} onPageChange={handlePageChange} />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedContact && (
          <div className="modal-details">
            <h2>Detalhes do Contato</h2>
            <div className="detail-item"><strong>Nome:</strong><p>{selectedContact.name}</p></div>
            <div className="detail-item"><strong>Email:</strong><p>{selectedContact.email}</p></div>
            {selectedContact.phone && <div className="detail-item"><strong>Telefone:</strong><p>{selectedContact.phone}</p></div>}
            {selectedContact.service && <div className="detail-item"><strong>Serviço de Interesse:</strong><p>{selectedContact.service}</p></div>}
            <div className="detail-item"><strong>Mensagem:</strong><p>{selectedContact.message}</p></div>
            <div className="status-selector">
              <label htmlFor="status-select">Alterar Status:</label>
              <select id="status-select" value={selectedContact.status} onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}>
                {contactStatuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="modal-actions">
              <a href={`mailto:${selectedContact.email}`} className="action-button action-button--email">Responder por Email</a>
              {selectedContact.phone && <a href={`https://wa.me/${selectedContact.phone}`} target="_blank" rel="noopener noreferrer" className="action-button action-button--whatsapp">Chamar no WhatsApp</a>}
              <button onClick={() => handleDeleteContact(selectedContact.id)} className="action-button action-button--delete">Excluir</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactsPage;