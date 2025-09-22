import React, { useState, useEffect } from 'react';
// ATUALIZADO: Não precisamos mais do SortableContext, apenas do core do dnd-kit
import { DndContext, PointerSensor, useSensor, useSensors, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';

import { supabase } from '../../supabaseClient';
import Modal from '../components/Modal';
import ProjectForm from '../components/ProjectForm';

// Constantes
const columns = ['Planejamento', 'Em Desenvolvimento', 'Testes', 'Concluído'];


// --- COMPONENTES INTERNOS DO KANBAN (REATORADOS PARA O PADRÃO CORRETO) ---

// KANBAN CARD (Agora usa useDraggable)
const KanbanCard = ({ project, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: project.id,
    data: { project }, // Passamos o projeto inteiro nos dados do evento
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="project-card" onClick={onClick}>
      <h4>{project.title}</h4>
      <p><strong>Cliente:</strong> {project.client}</p>
      <p><strong>Prazo:</strong> {project.deadline}</p>
    </div>
  );
};

// KANBAN COLUMN (Agora usa useDroppable)
const KanbanColumn = ({ title, projects, onCardClick }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title, // O ID da área de soltar é o próprio status (ex: "Planejamento")
  });

  const columnStyle = {
    backgroundColor: isOver ? '#e0f2fe' : '#f3f4f6', // Feedback visual ao passar o mouse
    transition: 'background-color 0.2s ease',
  };

  return (
    <div ref={setNodeRef} style={columnStyle} className="kanban-column">
      <div className="kanban-column__header">
        <h3 className="kanban-column__title">{title}</h3>
      </div>
      <div className="kanban-column__cards">
        {projects.map(project => (
          <KanbanCard key={project.id} project={project} onClick={() => onCardClick(project)} />
        ))}
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL DA PÁGINA ---

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const sensors = useSensors(useSensor(PointerSensor));

  async function fetchProjects() { /* ... (sem alterações) */ }
  useEffect(() => { /* ... (sem alterações) */ }, []);

  // LÓGICA DE DRAG AND DROP CORRETA E SIMPLIFICADA
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    // Se o card não for solto sobre uma coluna válida, não faz nada
    if (!over) {
      return;
    }

    const projectId = active.id;
    const newStatus = over.id; // O ID da coluna droppable é o novo status
    const currentProject = projects.find(p => p.id === projectId);

    // Se o status for realmente diferente, atualiza
    if (currentProject && currentProject.status !== newStatus) {
      // Atualização otimista na tela
      setProjects(prev => prev.map(p => (p.id === projectId ? { ...p, status: newStatus } : p)));

      // Atualização no Supabase
      const { error } = await supabase.from('projects').update({ status: newStatus }).eq('id', projectId);

      if (error) {
        toast.error('Falha ao atualizar o status.');
        fetchProjects(); // Reverte a mudança se der erro no DB
      } else {
        toast.success("Status atualizado!");
      }
    }
  };
  
  // Funções de manipulação (sem alterações)
  // #region Funções Ocultas (sem alteração)
  async function fetchProjects() { const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false }); if (error) { toast.error('Não foi possível carregar os projetos.'); } else { setProjects(data); } setLoading(false); }
  useEffect(() => { fetchProjects(); const channel = supabase.channel('projects-realtime').on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => { fetchProjects(); }).subscribe(); return () => { supabase.removeChannel(channel); }; }, []);
  const openDetailsModal = (project) => { setSelectedProject(project); setDetailsModalOpen(true); };
  const openFormModal = (project = null) => { setSelectedProject(project); setDetailsModalOpen(false); setFormModalOpen(true); };
  const closeModal = () => { setDetailsModalOpen(false); setFormModalOpen(false); setSelectedProject(null); };

  const handleFormSubmit = async (formData) => {
    const isEditing = !!formData.id;
    
    const projectData = {
      title: formData.title,
      client: formData.client,
      deadline: formData.deadline,
      description: formData.description,
      image_url: formData.image_url,
      is_featured: formData.is_featured,
      show_in_portfolio: formData.show_in_portfolio,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
    };

    const promise = isEditing
      ? supabase.from('projects').update(projectData).eq('id', formData.id)
      : supabase.from('projects').insert([{ ...projectData, status: 'Planejamento' }]);
    
    toast.promise(promise, {
       loading: isEditing ? 'Salvando...' : 'Criando...',
       success: `Projeto ${isEditing ? 'atualizado' : 'criado'}!`,
       error: `Erro ao ${isEditing ? 'atualizar' : 'criar'}.`,
    });
    
    const { error } = await promise;

    // Se não houve erro, nós apenas fechamos o modal.
    // **NÃO DEVEMOS TER nenhuma linha como 'setProjects(...)' aqui.**
    // A atualização em tempo real vai cuidar de recarregar a lista.
    if (!error) {
      closeModal();
    }
  };
  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Tem certeza?")) {
      const promise = supabase.from('projects').delete().eq('id', projectId);
      toast.promise(promise, { loading: 'Deletando...', success: 'Deletado!', error: 'Erro ao deletar.' });
      await promise;
      closeModal();
    }
  }
  // #endregion
  
  if (loading) { return <div>Carregando projetos...</div>; }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="page-header">
        <h1>Projetos Ativos</h1>
        <button onClick={() => openFormModal()} className="add-project-button">Adicionar Projeto</button>
      </div>
      <div className="kanban-board">
        {columns.map(column => (
          <KanbanColumn
            key={column}
            title={column}
            projects={projects.filter(p => p.status === column)}
            onCardClick={openDetailsModal}
          />
        ))}
      </div>

      {/* Modais (sem alterações) */}
      <Modal isOpen={isDetailsModalOpen} onClose={closeModal}>
        {selectedProject && (
          <div className="modal-details">
            <h2>{selectedProject.title}</h2>
            <div className="detail-item"><strong>Cliente:</strong><p>{selectedProject.client}</p></div>
            <div className="detail-item"><strong>Prazo Final:</strong><p>{selectedProject.deadline}</p></div>
            <div className="modal-actions">
                <button onClick={() => openFormModal(selectedProject)} className="add-project-button">Editar Projeto</button>
                <button onClick={() => handleDeleteProject(selectedProject.id)} className="action-button action-button--delete">Deletar</button>
            </div>
          </div>
        )}
      </Modal>
      <Modal isOpen={isFormModalOpen} onClose={closeModal}>
          <ProjectForm onSubmit={handleFormSubmit} initialData={selectedProject} />
      </Modal>
    </DndContext>
  );
};

export default ProjectsPage;