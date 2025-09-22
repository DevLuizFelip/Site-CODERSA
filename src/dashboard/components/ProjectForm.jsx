import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    deadline: '', // Formato YYYY-MM-DD para input type="date"
    image_url: '',
    description: '',
    technologies: '', // String separada por vírgulas
    is_featured: false,
    show_in_portfolio: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title,
        client: initialData.client,
        deadline: initialData.deadline ? initialData.deadline.split('T')[0] : '', // Garante formato YYYY-MM-DD
        image_url: initialData.image_url,
        description: initialData.description,
        technologies: initialData.technologies ? initialData.technologies.join(', ') : '',
        is_featured: initialData.is_featured,
        show_in_portfolio: initialData.show_in_portfolio,
      });
    } else {
      // Limpa o formulário se não houver initialData (para novo projeto)
      setFormData({
        title: '', client: '', deadline: '', image_url: '', description: '',
        technologies: '', is_featured: false, show_in_portfolio: true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    // Adicionado a classe 'project-form' ao formulário
    <form onSubmit={handleSubmit} className="project-form">
      {/* O título do modal agora faz mais sentido estar aqui */}
      <h2>{initialData ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título do Projeto</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="client">Cliente</label>
        <input type="text" id="client" name="client" value={formData.client} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Prazo</label>
        <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="image_url">URL da Imagem de Capa</label>
        <input type="url" id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://exemplo.com/imagem.png" />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="technologies">Tecnologias Usadas (separadas por vírgula)</label>
        <input type="text" id="technologies" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, Supabase" />
      </div>
      
      <div className="form-checkbox-group">
        <input type="checkbox" id="is_featured" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
        <label htmlFor="is_featured">Destacar na Homepage?</label>
      </div>
      
      <div className="form-checkbox-group">
        <input type="checkbox" id="show_in_portfolio" name="show_in_portfolio" checked={formData.show_in_portfolio} onChange={handleChange} />
        <label htmlFor="show_in_portfolio">Mostrar no Portfólio Público?</label>
      </div>

      <button type="submit" className="form-submit-button">
        {initialData ? 'Salvar Alterações' : 'Criar Projeto'}
      </button>
    </form>
  );
};

export default ProjectForm;