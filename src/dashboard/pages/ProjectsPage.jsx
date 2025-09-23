import React, { useState, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';

import { supabase } from '../../supabaseClient';
import Modal from '../components/Modal';
import ProjectForm from '../components/ProjectForm';

// Constantes
const columns = ['Planejamento', 'Em Desenvolvimento', 'Testes', 'Concluído'];
// Nome do bucket onde as imagens dos projetos são salvas
const PROJECT_IMAGES_BUCKET = 'project-images';


// --- COMPONENTES INTERNOS DO KANBAN ---

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
    backgroundColor: isOver ? 'var(--primary-color-light)' : 'var(--background-color)', // Usando variáveis CSS
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
  
  // Novos estados para o upload de imagem
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // Função para buscar projetos
  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Não foi possível carregar os projetos.');
      console.error('Erro ao carregar projetos:', error);
    } else {
      setProjects(data);
    }
    setLoading(false);
  }

  // Efeito para buscar projetos na montagem e se inscrever em atualizações em tempo real
  useEffect(() => {
    fetchProjects();
    const channel = supabase.channel('projects-realtime').on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
      fetchProjects(); // Recarrega os projetos quando houver uma mudança
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // Lógica de Drag and Drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) { return; }

    const projectId = active.id;
    const newStatus = over.id;
    const currentProject = projects.find(p => p.id === projectId);

    if (currentProject && currentProject.status !== newStatus) {
      setProjects(prev => prev.map(p => (p.id === projectId ? { ...p, status: newStatus } : p)));

      const { error } = await supabase.from('projects').update({ status: newStatus }).eq('id', projectId);

      if (error) {
        toast.error('Falha ao atualizar o status.');
        console.error('Erro ao atualizar status:', error);
        fetchProjects(); // Reverte a mudança se der erro no DB
      } else {
        toast.success("Status atualizado!");
      }
    }
  };
  
  // Funções para Modais
  const openDetailsModal = (project) => {
    // Constrói a URL pública da imagem para exibição no modal de detalhes
    let imageUrl = project.image_url;
    if (imageUrl) {
        const { data: { publicUrl } } = supabase.storage
            .from(PROJECT_IMAGES_BUCKET)
            .getPublicUrl(imageUrl);
        imageUrl = publicUrl;
    }
    setSelectedProject({ ...project, public_image_url: imageUrl });
    setDetailsModalOpen(true);
  };

  const openFormModal = (project = null) => {
    setSelectedProject(project);
    setDetailsModalOpen(false); // Fecha o modal de detalhes se estiver aberto
    setFormModalOpen(true);
    setSelectedFile(null); // Garante que nenhum arquivo antigo esteja selecionado
  };

  const closeModal = () => {
    setDetailsModalOpen(false);
    setFormModalOpen(false);
    setSelectedProject(null);
    setSelectedFile(null); // Limpa o arquivo selecionado ao fechar o modal
  };

  // Função para lidar com a seleção do arquivo no ProjectForm
  const handleFileSelected = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // Lógica de Submissão do Formulário (com Upload)
  const handleFormSubmit = async (formData) => {
    setUploading(true);
    let imageUrlForDb = formData.image_url; // Mantém a URL existente se não houver novo upload

    // 1. Se um novo arquivo foi selecionado, faz o upload
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`; // Nome de arquivo único
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(PROJECT_IMAGES_BUCKET)
        .upload(fileName, selectedFile, {
            cacheControl: '3600',
            upsert: false // Não sobrescrever se já existir
        });

      if (uploadError) {
        toast.error(`Falha no upload da imagem: ${uploadError.message}`);
        console.error('Erro de upload:', uploadError);
        setUploading(false);
        return;
      }
      imageUrlForDb = uploadData.path; // O caminho (dentro do bucket) para salvar no DB
    }

    // 2. Prepara os dados para o banco de dados
    const projectData = {
      title: formData.title,
      client: formData.client,
      deadline: formData.deadline,
      description: formData.description,
      is_featured: formData.is_featured,
      show_in_portfolio: formData.show_in_portfolio,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
      image_url: imageUrlForDb, // Salva o caminho da imagem (novo ou antigo)
    };

    // 3. Insere ou atualiza o registro do projeto
    const isEditing = !!formData.id;
    const promise = isEditing
      ? supabase.from('projects').update(projectData).eq('id', formData.id)
      : supabase.from('projects').insert([{ ...projectData, status: 'Planejamento' }]);
    
    toast.promise(promise, {
       loading: isEditing ? 'Salvando projeto...' : 'Criando projeto...',
       success: `Projeto ${isEditing ? 'atualizado' : 'criado'}!`,
       error: `Erro ao ${isEditing ? 'atualizar' : 'criar'} projeto.`,
    });
    
    const { error } = await promise; // Aguarda a conclusão da promessa

    if (!error) {
      closeModal();
    }
    setUploading(false); // Finaliza o estado de upload
    setSelectedFile(null); // Limpa o arquivo selecionado
  };

  // Lógica de Deleção de Projeto
  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Tem certeza que deseja deletar este projeto? Esta ação é irreversível.")) {
      const projectToDelete = projects.find(p => p.id === projectId);
      
      // Tenta deletar a imagem do Storage, se houver
      if (projectToDelete?.image_url) {
          const { error: deleteImageError } = await supabase.storage
              .from(PROJECT_IMAGES_BUCKET)
              .remove([projectToDelete.image_url]);
          if (deleteImageError) {
              console.error("Erro ao deletar imagem do Storage:", deleteImageError);
              toast.error("Erro ao deletar a imagem do projeto. Tente novamente.");
              return;
          }
      }

      // Deleta o registro do projeto do banco de dados
      const promise = supabase.from('projects').delete().eq('id', projectId);
      toast.promise(promise, { loading: 'Deletando projeto...', success: 'Projeto deletado!', error: 'Erro ao deletar projeto.' });
      await promise; // Aguarda a conclusão da promessa
      closeModal();
    }
  };
  
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

      {/* Modal de Detalhes do Projeto */}
      <Modal isOpen={isDetailsModalOpen} onClose={closeModal}>
        {selectedProject && (
          <div className="modal-details">
            <h2>{selectedProject.title}</h2>
            {selectedProject.public_image_url && (
                <img src={selectedProject.public_image_url} alt={`Capa do projeto ${selectedProject.title}`} className="project-detail-image"/>
            )}
            <div className="detail-item"><strong>Cliente:</strong><p>{selectedProject.client}</p></div>
            <div className="detail-item"><strong>Prazo Final:</strong><p>{selectedProject.deadline}</p></div>
            <div className="detail-item"><strong>Descrição:</strong><p>{selectedProject.description}</p></div>
            <div className="detail-item"><strong>Tecnologias:</strong><p>{selectedProject.technologies?.join(', ')}</p></div>
            <div className="detail-item"><strong>Destaque na Homepage:</strong><p>{selectedProject.is_featured ? 'Sim' : 'Não'}</p></div>
            <div className="detail-item"><strong>Portfólio Público:</strong><p>{selectedProject.show_in_portfolio ? 'Sim' : 'Não'}</p></div>

            <div className="modal-actions">
                <button onClick={() => openFormModal(selectedProject)} className="add-project-button">Editar Projeto</button>
                <button onClick={() => handleDeleteProject(selectedProject.id)} className="action-button action-button--delete">Deletar</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal do Formulário de Projeto */}
      <Modal isOpen={isFormModalOpen} onClose={closeModal}>
          <ProjectForm
            onSubmit={handleFormSubmit}
            initialData={selectedProject}
            onFileChange={handleFileSelected} // Passa a função para o ProjectForm
            isUploading={uploading} // Informa ao ProjectForm o status do upload
          />
      </Modal>
    </DndContext>
  );
};

export default ProjectsPage;