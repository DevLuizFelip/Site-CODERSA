import React, { useState } from 'react';
import { BsArrowRight, BsFileEarmarkPdf, BsClock, BsGlobe, BsEnvelope, BsCheckLg, BsEnvelopeCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Coleta os dados do formulário
    const formData = new FormData(e.target);
    const data = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      assunto: formData.get('assunto'),
      mensagem: formData.get('mensagem')
    };

    try {
      // Produção (Render). Em dev local, você pode manter um backend local e trocar aqui se precisar.
      const response = await fetch('https://codersa-backend.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        const whatsappNumber = '5511936193760';
        const whatsappMessage = encodeURIComponent(
          'Olá! Acabei de enviar o formulário e gostaria de falar sobre minha solicitação.'
        );
        // Redireciona para o WhatsApp após enviar com sucesso
        setTimeout(() => {
          window.location.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        }, 800);
      } else {
        alert('Erro ao enviar email. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen flex justify-center py-12 md:py-24 px-4 md:px-6 bg-background text-primary animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-16 max-w-[1200px] w-full items-start">
          
          {/* === ÁREA DE SUCESSO (Esquerda) === */}
          <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left py-12 lg:py-20">
            <div className="mb-10 animate-scale-in">
              <div className="w-24 h-24 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-surface dark:bg-gray-800 shadow-sm">
                <BsCheckLg className="text-4xl text-primary dark:text-white font-light" />
              </div>
            </div>
            
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
              Solicitação Enviada
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6">
              Mensagem <span className="italic">Recebida.</span>
            </h1>
            <p className="text-gray-500 font-light text-xl max-w-xl leading-relaxed mb-12">
              Nossa equipe de especialistas entrará em contato em breve para discutir como podemos elevar o patamar tecnológico do seu projeto.
            </p>
            
            <Link 
              to="/" 
              className="inline-flex items-center gap-4 bg-black text-white dark:bg-white dark:text-black h-14 px-10 font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none"
            >
              Voltar para o Início
              <BsArrowRight className="text-lg" />
            </Link>
          </div>

          {/* === SIDEBAR (Direita) - Com mensagem de Acompanhamento === */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-32">
            <div className="bg-surface border border-gray-100 dark:border-gray-800 p-8 shadow-2xl shadow-gray-100/50 dark:shadow-none relative overflow-hidden">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-6 mb-8">
                <h4 className="font-serif text-xl italic text-primary">Canais de Suporte</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-bold">Respostas em até 24h</p>
              </div>

              <div className="space-y-10">
                {/* Links Rápidos (Reutilizando componente) */}
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-4">Links Rápidos</p>
                  <div className="space-y-4">
                    <SidebarLink href="#" icon={<BsFileEarmarkPdf className="text-lg" />} title="Baixar Portfólio" subtitle="PDF, 4.2 MB" />
                    <SidebarLink href="#" icon={<BsClock className="text-lg" />} title="Agendar Demo" subtitle="Call de 15 min" />
                  </div>
                </div>

                {/* Bloco de Acompanhamento (Novo) */}
                <div className="bg-gray-50 dark:bg-gray-900 p-6 border-l-2 border-primary">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Acompanhamento</p>
                  <div className="flex items-center gap-3 text-primary dark:text-white">
                    <BsEnvelopeCheck className="text-xl" />
                    <span className="font-serif italic text-sm">Cópia enviada ao seu e-mail</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Verifique sua caixa de entrada ou spam.</p>
                </div>

                {/* Presença Global */}
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-4">Presença Global</p>
                  <div className="flex flex-wrap gap-2">
                    {['São Paulo', 'Remote First'].map(city => (
                      <span key={city} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[9px] font-bold uppercase tracking-widest text-primary">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rodapé Sidebar */}
              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Especialistas Ativos</span>
                </div>
                <div className="flex gap-4 text-gray-400">
                  <a href="#" className="hover:text-primary transition-colors"><BsGlobe className="text-lg" /></a>
                  <a href="#" className="hover:text-primary transition-colors"><BsEnvelope className="text-lg" /></a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Layout Padrão do Formulário
  return (
    <div className="pt-20 min-h-screen flex justify-center py-12 md:py-24 px-4 md:px-6 bg-background text-primary">
      <div className="flex flex-col lg:flex-row gap-16 max-w-[1200px] w-full items-start">
        
        {/* === FORMULÁRIO (Esquerda) === */}
        <div className="flex-1 w-full flex flex-col items-start py-8 lg:py-12">
          <span className="block text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
            Entre em Contato
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-12">
            Fale com a <span className="italic font-normal">Codersa.</span>
          </h1>
          
          <form className="w-full space-y-8" onSubmit={handleSubmit}>
            <MinimalInput label="Nome Completo" id="nome" placeholder="John Doe" type="text" />
            <MinimalInput label="E-mail Corporativo" id="email" placeholder="nome@empresa.com" type="email" />
            <MinimalInput label="Assunto" id="assunto" placeholder="Como podemos ajudar?" type="text" />
            
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold" htmlFor="mensagem">
                Mensagem
              </label>
              <textarea 
                className="w-full bg-transparent border border-gray-200 dark:border-gray-700 px-4 py-4 focus:ring-0 focus:border-black dark:focus:border-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors text-lg resize-none outline-none" 
                id="mensagem" 
                name="mensagem" 
                placeholder="Descreva brevemente seu projeto ou necessidade" 
                rows="4"
              ></textarea>
            </div>

            <div className="pt-8">
              <button 
                type="submit" 
                className="inline-flex items-center gap-4 bg-black text-white dark:bg-white dark:text-black h-14 px-10 font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none"
              >
                Enviar Solicitação
                <BsArrowRight className="text-lg" />
              </button>
            </div>
          </form>
        </div>

        {/* === SIDEBAR (Direita) - Padrão === */}
        <aside className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-32">
          <div className="bg-surface border border-gray-100 dark:border-gray-800 p-8 shadow-2xl shadow-gray-100/50 dark:shadow-none relative overflow-hidden">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-6 mb-8">
              <h4 className="font-serif text-xl italic text-primary">Canais de Suporte</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-bold">Respostas em até 24h</p>
            </div>

            <div className="space-y-10">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-4">Links Rápidos</p>
                <div className="space-y-4">
                  <SidebarLink href="#" icon={<BsFileEarmarkPdf className="text-lg" />} title="Baixar Portfólio" subtitle="PDF, 4.2 MB" />
                  <SidebarLink href="#" icon={<BsClock className="text-lg" />} title="Agendar Demo" subtitle="Call de 15 min" />
                </div>
              </div>
              
              {/* Presença Global */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-4">Presença Global</p>
                <div className="flex flex-wrap gap-2">
                  {['São Paulo', 'Remote First'].map(city => (
                    <span key={city} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[9px] font-bold uppercase tracking-widest text-primary">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Especialistas Ativos</span>
              </div>
              <div className="flex gap-4 text-gray-400">
                <a href="#" className="hover:text-primary transition-colors"><BsGlobe className="text-lg" /></a>
                <a href="#" className="hover:text-primary transition-colors"><BsEnvelope className="text-lg" /></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="font-serif italic text-gray-400 text-sm">"Excelência em cada linha de código."</p>
          </div>
        </aside>

      </div>
    </div>
  );
};

// Componente de Input Minimalista
const MinimalInput = ({ label, id, type, placeholder }) => (
  <div>
    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold" htmlFor={id}>
      {label}
    </label>
    <input 
      className="w-full bg-transparent border border-gray-200 dark:border-gray-700 px-4 py-4 focus:ring-0 focus:border-black dark:focus:border-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors text-lg outline-none" 
      id={id} 
      name={id} 
      placeholder={placeholder} 
      type={type} 
    />
  </div>
);

// Componente de Link da Sidebar
const SidebarLink = ({ href, icon, title, subtitle }) => (
  <a className="flex items-center gap-3 group" href={href}>
    <div className="text-gray-400 group-hover:text-primary transition-colors">
      {icon}
    </div>
    <div>
      <span className="text-sm font-medium block text-primary group-hover:underline decoration-1 underline-offset-4 decoration-gray-400">
        {title}
      </span>
      <span className="text-xs text-gray-400 italic">{subtitle}</span>
    </div>
  </a>
);

export default ContactPage;