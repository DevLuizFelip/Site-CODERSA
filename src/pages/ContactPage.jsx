import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

const servicesOptions = [
  'Desenvolvimento Web',
  'Aplicativo Mobile',
  'Sistema Personalizado',
  'E-commerce',
  'Outro'
];

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: servicesOptions[0],
        contactMethod: 'email',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { name, email, phone, service, contactMethod, message } = formData;
        
        const { error } = await supabase
            .from('contacts')
            .insert([{ 
                name, 
                email, 
                phone, 
                service, 
                contact_method: contactMethod,
                message 
            }]);

        setLoading(false);

        if (error) {
            console.error('Erro ao enviar contato:', error);
            toast.error('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
        } else {
            toast.success('Mensagem enviada com sucesso! Obrigado.');
            setFormData({
                name: '', email: '', phone: '', service: servicesOptions[0],
                contactMethod: 'email', message: ''
            });
        }
    };

    return (
        <section className="container">
            <div className="section-header">
                <h1>Entre em Contato</h1>
                <p>Tem um projeto em mente? Adoraríamos ouvir sobre ele. Preencha o formulário abaixo.</p>
            </div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <form className="contact-form" onSubmit={handleSubmit}>
                    {/* --- INÍCIO DOS CAMPOS DO FORMULÁRIO --- */}

                    <div className="form-group">
                        <label htmlFor="service">Qual serviço você tem interesse?</label>
                        <select id="service" name="service" value={formData.service} onChange={handleChange} className="form-control" disabled={loading}>
                            {servicesOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Seu Nome</label>
                        <input type="text" id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="form-control" disabled={loading} />
                    </div>

                    <div className="form-group">
                        <label>Como prefere ser contatado?</label>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="contactMethod" value="email" checked={formData.contactMethod === 'email'} onChange={handleChange} disabled={loading} />
                                Email
                            </label>
                            <label>
                                <input type="radio" name="contactMethod" value="whatsapp" checked={formData.contactMethod === 'whatsapp'} onChange={handleChange} disabled={loading} />
                                WhatsApp
                            </label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Seu Email</label>
                        <input type="email" id="email" name="email" placeholder="voce@example.com" value={formData.email} onChange={handleChange} required className="form-control" disabled={loading} />
                    </div>
                    
                    {formData.contactMethod === 'whatsapp' && (
                        <div className="form-group">
                            <label htmlFor="phone">Seu Telefone (com DDD)</label>
                            <input type="tel" id="phone" name="phone" placeholder="11999998888" value={formData.phone} onChange={handleChange} required className="form-control" disabled={loading} />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="message">Sua Mensagem</label>
                        <textarea id="message" name="message" placeholder="Descreva brevemente seu projeto ou dúvida..." rows="5" value={formData.message} onChange={handleChange} required className="form-control" disabled={loading}></textarea>
                    </div>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar Mensagem'}
                    </button>

                    {/* --- FIM DOS CAMPOS DO FORMULÁRIO --- */}
                </form>
            </div>
        </section>
    );
};
export default ContactPage;