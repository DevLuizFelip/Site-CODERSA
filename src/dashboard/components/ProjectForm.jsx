import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSubmit, onFileChange, initialData, isUploading = false }) => {
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
        id: initialData.id,
        title: initialData.title || '',
        client: initialData.client || '',
        deadline: initialData.deadline || '',
        description: initialData.description || '',
        image_url: initialData.image_url || '',
        technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : '',
        is_featured: initialData.is_featured || false,
        show_in_portfolio: initialData.show_in_portfolio || false,
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
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h2>{initialData?.id ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título do Projeto</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required disabled={isUploading} />
      </div>

      <div className="form-group">
        <label htmlFor="client">Cliente</label>
        <input type="text" id="client" name="client" value={formData.client} onChange={handleChange} required disabled={isUploading} />
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Prazo</label>
        <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} disabled={isUploading} />
      </div>

      {/* --- CAMPO DE IMAGEM ATUALIZADO --- */}
      <div className="form-group">
        <label htmlFor="image_upload">Imagem de Capa</label>
        <input
          type="file"
          id="image_upload"
          name="image_upload"
          onChange={onFileChange} // Chama a função do componente pai
          accept="image/png, image/jpeg, image/webp"
          disabled={isUploading}
        />
        {/* Mostra a imagem atual se estiver editando */}
        {initialData?.image_url && !isUploading && (
            <small style={{ marginTop: '0.5rem', color: 'var(--text-muted-color)' }}>
              Imagem atual: {initialData.image_url.split('/').pop()}
            </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" disabled={isUploading}></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="technologies">Tecnologias Usadas (separadas por vírgula)</label>
        <input type="text" id="technologies" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, Supabase" disabled={isUploading} />
      </div>
      
      <div className="form-checkbox-group">
        <input type="checkbox" id="is_featured" name="is_featured" checked={formData.is_featured} onChange={handleChange} disabled={isUploading} />
        <label htmlFor="is_featured">Destacar na Homepage?</label>
      </div>
      
      <div className="form-checkbox-group">
        <input type="checkbox" id="show_in_portfolio" name="show_in_portfolio" checked={formData.show_in_portfolio} onChange={handleChange} disabled={isUploading} />
        <label htmlFor="show_in_portfolio">Mostrar no Portfólio Público?</label>
      </div>

      <button type="submit" className="form-submit-button" disabled={isUploading}>
        {isUploading ? 'Enviando imagem...' : (initialData?.id ? 'Salvar Alterações' : 'Criar Projeto')}
      </button>
    </form>
  );
};

export default ProjectForm;