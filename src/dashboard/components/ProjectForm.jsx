import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSubmit, initialData }) => {
  // O estado inicial deve conter TODAS as chaves do formulário
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    deadline: '',
    description: '',
    image_url: '',
    technologies: '',
    is_featured: false,
    show_in_portfolio: false,
  });

  useEffect(() => {
    // Popula o formulário para edição, ou o mantém vazio para criação
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        client: initialData.client || '',
        deadline: initialData.deadline || '',
        description: initialData.description || '',
        image_url: initialData.image_url || '',
        is_featured: initialData.is_featured || false,
        show_in_portfolio: initialData.show_in_portfolio || false,
        technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : '',
      });
    } else {
      // Garante que o formulário seja limpo ao abrir para criar um novo projeto
      setFormData({
        title: '', client: '', deadline: '', description: '', image_url: '',
        technologies: '', is_featured: false, show_in_portfolio: false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialData?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h2>{initialData?.id ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h2>
      
      {/* --- CAMPOS RESTAURADOS --- */}
      <div className="form-group">
        <label htmlFor="title">Título do Projeto</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="client">Cliente</label>
        <input type="text" name="client" value={formData.client} onChange={handleChange} required />
      </div>
       <div className="form-group">
        <label htmlFor="deadline">Prazo</label>
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="image_url">URL da Imagem de Capa</label>
        <input type="url" name="image_url" placeholder="https://exemplo.com/imagem.png" value={formData.image_url} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
      </div>

      {/* --- CAMPOS QUE JÁ ESTAVAM VISÍVEIS --- */}
      <div className="form-group">
        <label htmlFor="technologies">Tecnologias Usadas (separadas por vírgula)</label>
        <input type="text" name="technologies" placeholder="React, Node.js, Supabase" value={formData.technologies} onChange={handleChange} />
      </div>
      <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
          <input type="checkbox" id="is_featured" name="is_featured" checked={formData.is_featured} onChange={handleChange} style={{ width: '1rem', height: '1rem' }} />
          <label htmlFor="is_featured" style={{ marginBottom: 0 }}>Destacar na Homepage?</label>
      </div>
      <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
          <input type="checkbox" id="show_in_portfolio" name="show_in_portfolio" checked={formData.show_in_portfolio} onChange={handleChange} style={{ width: '1rem', height: '1rem' }} />
          <label htmlFor="show_in_portfolio" style={{ marginBottom: 0, fontWeight: 'bold' }}>Mostrar no Portfólio Público?</label>
      </div>
      
      <button type="submit" className="submit-button">{initialData?.id ? 'Salvar Alterações' : 'Criar Projeto'}</button>
    </form>
  );
};

export default ProjectForm;