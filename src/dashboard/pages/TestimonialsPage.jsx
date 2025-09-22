import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import { FaStar } from 'react-icons/fa'; // Importa a estrela aqui também

// O formulário agora também tem o seletor de estrelas
const TestimonialForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({ client_name: '', company_position: '', quote: '', is_approved: false });
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const initialRating = initialData.rating || 0;
        setFormData({ client_name: '', company_position: '', quote: '', is_approved: false, ...initialData });
        setRating(initialRating);
    }, [initialData]);

    const handleSubmit = (e) => { e.preventDefault(); onSubmit({ ...formData, rating }); };
    // ... (código do StarRatingInput, igual ao de LeaveReviewPage.jsx) ...
    // #region Componentes Ocultos (sem alteração)
    const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };
    const StarRatingInput = ({ rating, setRating }) => { const [hover, setHover] = useState(null); return ( <div style={{ display: 'flex', gap: '0.25rem' }}> {[...Array(5)].map((star, index) => { const ratingValue = index + 1; return ( <label key={index}> <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} style={{ display: 'none' }} /> <FaStar color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={30} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }} /> </label> ); })} </div> ); };
    // #endregion

    return (
        <form onSubmit={handleSubmit} className="project-form">
            <h2>{initialData.id ? 'Editar Avaliação' : 'Adicionar Avaliação'}</h2>
            <div className="form-group"><label>Nota</label><StarRatingInput rating={rating} setRating={setRating} /></div>
            <div className="form-group"><label>Nome do Cliente</label><input type="text" name="client_name" value={formData.client_name} onChange={handleChange} required /></div>
            <div className="form-group"><label>Cargo/Empresa</label><input type="text" name="company_position" value={formData.company_position} onChange={handleChange} /></div>
            <div className="form-group"><label>Avaliação (Citação)</label><textarea name="quote" rows="5" value={formData.quote} onChange={handleChange} required></textarea></div>
            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}><input type="checkbox" name="is_approved" checked={formData.is_approved} onChange={handleChange} /><label style={{ marginBottom: 0 }}>Aprovado?</label></div>
            <button type="submit" className="submit-button">{initialData.id ? 'Salvar Alterações' : 'Adicionar'}</button>
        </form>
    );
};

const TestimonialsPage = () => {
    // ... (estados e funções fetch/open/close, sem alterações) ...
    // #region Funções Ocultas (sem alteração)
    const [testimonials, setTestimonials] = useState([]); const [loading, setLoading] = useState(true); const [isModalOpen, setModalOpen] = useState(false); const [editingTestimonial, setEditingTestimonial] = useState(null);
    async function fetchTestimonials() { const { data, error } = await supabase.from('testimonials').select('*').order('created_at'); if (error) toast.error("Falha ao buscar."); else setTestimonials(data); setLoading(false); }
    useEffect(() => { fetchTestimonials(); }, []);
    const openModal = (testimonial = null) => { setEditingTestimonial(testimonial); setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); setEditingTestimonial(null); };
    // #endregion
    
    // ATUALIZADO: handleSubmit agora envia o 'rating'
    const handleSubmit = async (formData) => {
        const { id, rating, ...dataToSubmit } = formData;
        const isEditing = !!id;
        const promise = isEditing
            ? supabase.from('testimonials').update({ ...dataToSubmit, rating }).eq('id', id)
            : supabase.from('testimonials').insert([{ ...dataToSubmit, rating }]);
        toast.promise(promise, { loading: 'Salvando...', success: 'Salvo!', error: 'Erro ao salvar.' });
        await promise;
        fetchTestimonials();
        closeModal();
    };
    
    // ... (função handleDelete, sem alterações) ...
    // #region Funções Ocultas (sem alteração)
     const handleDelete = async (id) => { if (window.confirm("Tem certeza?")) { const promise = supabase.from('testimonials').delete().eq('id', id); toast.promise(promise, { loading: 'Deletando...', success: 'Deletado!', error: 'Erro ao deletar.' }); await promise; fetchTestimonials(); } };
    // #endregion

    if (loading) return <div>Carregando...</div>;

    return (
        <div>
            <div className="page-header"><h1>Gerenciar Avaliações</h1><button onClick={() => openModal()} className="add-project-button">Adicionar</button></div>
            <div className="table-wrapper">
                <table className="data-table">
                    {/* ATUALIZADO: Adicionada a coluna "Nota" */}
                    <thead><tr><th>Cliente</th><th>Nota</th><th>Status</th><th>Ações</th></tr></thead>
                    <tbody>
                        {testimonials.map(item => (
                            <tr key={item.id}>
                                <td>{item.client_name}</td>
                                <td>{item.rating ? `${item.rating} / 5` : 'N/A'}</td>
                                <td><span className={`status-badge ${item.is_approved ? 'status-proposta-enviada' : 'status-lido'}`}>{item.is_approved ? 'Aprovado' : 'Pendente'}</span></td>
                                <td><button onClick={() => openModal(item)}>Editar</button><button onClick={() => handleDelete(item.id)} style={{color: 'red', marginLeft: '1rem'}}>Excluir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <Modal isOpen={isModalOpen} onClose={closeModal}><TestimonialForm onSubmit={handleSubmit} initialData={editingTestimonial} /></Modal>
        </div>
    );
};

export default TestimonialsPage;