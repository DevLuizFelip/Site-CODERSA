import React from 'react';
import { BsSearch, BsCpu, BsHddNetwork, BsArrowUpRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ProcessPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-background text-primary selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* === HERO SECTION === */}
      <main className="flex-1 px-8 md:px-16 pt-12 pb-32 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* === CONTEÚDO PRINCIPAL (Esquerda) === */}
          <div className="lg:col-span-8">
            
            {/* Intro */}
            <section className="mb-32">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 block">Sobre a Codersa</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-none mb-8">
                Onde o código encontra a <span className="italic font-normal">inteligência</span>.
              </h1>
              <p className="text-xl font-light leading-relaxed text-gray-600 dark:text-gray-400 max-w-2xl font-serif">
                Não desenvolvemos apenas ferramentas; arquitetamos ecossistemas autônomos. Nossa metodologia é o alicerce para transformar dados brutos em decisões estratégicas de alto impacto.
              </p>
            </section>

            {/* Metodologia (Timeline) */}
            <section className="mb-32">
              <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-16 border-b border-black/10 dark:border-white/10 pb-4">Nossa Metodologia</h2>
              
              <div className="space-y-24 relative">
                
                {/* Fase 01 */}
                <TimelineStep 
                  number="01"
                  title="Diagnóstico Estrutural"
                  desc="Mapeamos cada gargalo operacional e oportunidade latente. Antes de qualquer código, entendemos a alma do fluxo de trabalho para identificar onde a IA terá o maior ROI."
                  icon={<BsSearch className="text-lg" />}
                  hasLine
                />

                {/* Fase 02 */}
                <TimelineStep 
                  number="02"
                  title="Modelagem de IA Sob Medida"
                  desc="Desenvolvemos modelos neurais proprietários e algoritmos de processamento de linguagem natural refinados especificamente para o seu setor de atuação."
                  icon={<BsCpu className="text-lg" />}
                  hasLine
                />

                {/* Fase 03 */}
                <TimelineStep 
                  number="03"
                  title="Automação Escalável"
                  desc="Implementamos a solução no núcleo da operação, garantindo que a inteligência artificial evolua com os dados e escale sem perder a precisão milimétrica."
                  icon={<BsHddNetwork className="text-lg" />}
                />

              </div>
            </section>

            {/* Citação (Quote) */}
            <section className="py-20 border-t border-black/5 dark:border-white/5">
              <div className="relative">
                <span className="text-6xl text-gray-200 dark:text-gray-800 absolute -top-8 -left-4 font-serif">"</span>
                <blockquote className="text-3xl font-serif italic leading-snug text-gray-800 dark:text-gray-200 mb-8 relative z-10">
                  A verdadeira inovação não está em substituir o humano, mas em libertar sua capacidade criativa através de sistemas que pensam em escala.
                </blockquote>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl italic text-primary" style={{ fontFamily: "'Mrs Saint Delafield', cursive", fontSize: "3rem" }}>Luiz Felipe C. Santana</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mt-2">Fundador Codersa</span>
                </div>
              </div>
            </section>

          </div>

          {/* === SIDEBAR (Direita) === */}
          <aside className="lg:col-span-4 sticky top-32">
            <div className="bg-gray-50 dark:bg-gray-900 p-10 border border-black/5 dark:border-white/5">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Setores de Atuação</h4>
              <nav className="flex flex-col">
                <SidebarItem text="Fintech & Banking" />
                <SidebarItem text="Legal Tech" />
                <SidebarItem text="Supply Chain" />
                <SidebarItem text="Healthcare Systems" />
                <SidebarItem text="Enterprise SaaS" isLast />
              </nav>

              <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5">
                <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
                  Interessado em ver como nossa metodologia se aplica ao seu modelo de negócio específico?
                </p>
                <Link to="/contato" className="inline-block bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase tracking-[0.2em] font-bold py-4 px-8 hover:opacity-80 transition-opacity">
                  Solicitar Consulta
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

// Componente da Timeline
const TimelineStep = ({ number, title, desc, icon, hasLine }) => (
  <div className="relative flex gap-8 md:gap-12">
    <div className="flex flex-col items-center shrink-0">
      <div className="w-12 h-12 rounded-full border border-primary dark:border-white flex items-center justify-center bg-background z-10 text-primary dark:text-white">
        {icon}
      </div>
      {hasLine && <div className="absolute top-12 bottom-[-96px] w-[1px] bg-black/10 dark:bg-white/10"></div>}
    </div>
    <div className="pt-2">
      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Fase {number}</span>
      <h3 className="text-2xl font-serif font-bold mt-2 mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-lg">
        {desc}
      </p>
    </div>
  </div>
);

// Componente da Sidebar
const SidebarItem = ({ text, isLast }) => (
  <a className={`py-3 border-b border-black/5 dark:border-white/5 hover:text-gray-400 transition-colors block text-[10px] uppercase tracking-widest font-bold flex justify-between items-center group ${isLast ? 'border-none' : ''}`} href="#">
    {text}
    <BsArrowUpRight className="text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
  </a>
);

export default ProcessPage;