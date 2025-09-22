import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}> {/* Clicar no fundo fecha o modal */}
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/* Impede que clicar no conteúdo feche */}
        <div className="modal-header">
          {/* O título e o botão de fechar ficarão aqui, mas o children do Modal é o ProjectForm */}
          {/* Então, vamos deixar o título e o botão de fechar para o componente que renderiza o ProjectForm */}
          {/* ou, mais especificamente, o Modal recebe um prop 'title' e 'showCloseButton' */}
          <h2>{/* Pode passar um prop 'title' para o Modal aqui */}</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;