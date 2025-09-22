import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

// Componente para a seleção de estrelas
const StarRatingInput = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);
    return (
        <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            style={{ cursor: 'pointer' }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

const LeaveReviewPage = () => {
    const [formData, setFormData] = useState({ client_name: '', company_position: '', quote: '' });
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Definido apenas uma vez
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Por favor, selecione uma nota de 1 a 5 estrelas.");
            return;
        }
        setLoading(true);

        const { error } = await supabase.from('testimonials').insert([
            {
                client_name: formData.client_name,
                company_position: formData.company_position,
                quote: formData.quote,
                rating: rating,
                is_approved: false
            }
        ]);
        
        setLoading(false);

        if (error) {
            toast.error('Erro ao enviar sua avaliação.');
        } else {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <section className="container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
                <div className="section-header">
                    <h1>Obrigado!</h1>
                    <p>Sua avaliação foi enviada com sucesso e será analisada pela nossa equipe.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="container">
            <div className="section-header">
                <h1>Deixe sua Avaliação</h1>
                <p>Ficamos felizes em ter você como cliente! Por favor, compartilhe sua experiência conosco.</p>
            </div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Sua nota</label>
                        <StarRatingInput rating={rating} setRating={setRating} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="client_name">Seu Nome</label>
                        <input type="text" id="client_name" name="client_name" className="form-control" value={formData.client_name} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company_position">Seu Cargo e Empresa (Ex: CEO da Empresa X)</label>
                        <input type="text" id="company_position" name="company_position" className="form-control" value={formData.company_position} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quote">Sua Avaliação</label>
                        <textarea id="quote" name="quote" rows="6" className="form-control" value={formData.quote} onChange={handleChange} required placeholder="Descreva como foi sua experiência trabalhando conosco..." disabled={loading}></textarea>
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar Avaliação'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default LeaveReviewPage;