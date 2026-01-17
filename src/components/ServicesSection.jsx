import React from 'react';
import { Link } from 'react-router-dom';
import { BsTerminal, BsArrowRight, BsCodeSlash, BsCloudCheck, BsGlobe, BsEnvelope } from 'react-icons/bs';
import { BiBrain } from 'react-icons/bi';
import { MdOutlineDraw, MdCall, MdEvent } from 'react-icons/md';

const ServicesSection = () => {
  return (
    <section className="flex-1 flex justify-center py-16 px-4 md:px-6 bg-background text-primary">
      <div className="flex flex-col lg:flex-row gap-16 max-w-[1200px] w-full items-start">
        
        {/* === COLUNA PRINCIPAL (Esquerda) === */}
        <div className="flex-1 w-full">
          
          {/* Cabeçalho da Seção */}
          <div className="mb-14 text-center lg:text-left">
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
              Crafting Digital Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6">
              Nossos <span className="italic">Serviços</span>.
            </h1>
            <p className="text-gray-500 text-xl font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Soluções de engenharia e design de alto contraste para empresas que buscam o excepcional. Transformamos complexidade em simplicidade elegante.
            </p>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Desenvolvimento (Dark) */}
            <ServiceCard 
              dark 
              icon={<BsCodeSlash className="text-4xl mb-6 opacity-80" />}
              title="Desenvolvimento Customizado"
              desc="Sistemas robustos e escaláveis construídos sob medida para os desafios únicos do seu negócio."
            />

            {/* Card 2: IA (Light) */}
            <ServiceCard 
              icon={<BiBrain className="text-4xl mb-6 opacity-60" />}
              title="Inteligência Artificial"
              desc="Implementação de modelos generativos e automação inteligente para otimizar processos críticos."
            />

            {/* Card 3: Cloud (Light) */}
            <ServiceCard 
              icon={<BsCloudCheck className="text-4xl mb-6 opacity-60" />}
              title="Cloud & Infra"
              desc="Arquitetura em nuvem segura e resiliente, garantindo alta disponibilidade e performance global."
            />

            {/* Card 4: UX/UI (Dark) */}
            <ServiceCard 
              dark
              icon={<MdOutlineDraw className="text-4xl mb-6 opacity-80" />}
              title="Consultoria UX/UI"
              desc="Design de interfaces premium focado na experiência do usuário e na estética minimalista."
            />

          </div>

          {/* Rodapé da Seção (CTA) */}
          <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="font-serif text-2xl italic">Pronto para o próximo nível?</h4>
              <p className="text-gray-500 font-light mt-1">Agende uma consultoria técnica com nossos especialistas.</p>
            </div>
            <Link to="/contato" className="bg-black text-white dark:bg-white dark:text-black h-14 px-10 font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none flex items-center gap-4">
              Fale Conosco
              <MdCall className="text-lg" />
            </Link>
          </div>

        </div>

        {/* === BARRA LATERAL (Direita - Desktop) === */}
        <aside className="hidden lg:block w-80 xl:w-96 shrink-0 sticky top-32">
          <div className="bg-surface border border-gray-100 dark:border-gray-800 p-8 shadow-2xl shadow-gray-100/50 dark:shadow-none relative overflow-hidden">
            
            {/* Cabeçalho Sidebar */}
            <div className="border-b border-gray-100 dark:border-gray-800 pb-6 mb-8">
              <h4 className="font-serif text-xl italic text-primary">Destaques do Mês</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-bold">Relatório de Inovação</p>
            </div>

            <div className="space-y-10">
              
              {/* Bloco Performance */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-4">Foco em Performance</p>
                <div className="space-y-4">
                  <SidebarItem color="bg-black dark:bg-white" title="Otimização de Latência" subtitle="Redução de 40% em APIs" />
                  <SidebarItem color="bg-gray-300" title="Segurança Cloud-Native" subtitle="Zero Trust Architecture" />
                </div>
              </div>

              {/* Bloco Stack */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-4">Stack Tecnológica</p>
                <div className="flex flex-wrap gap-2">
                  {['React Next.js', 'Python AI', 'AWS EKS', 'Tailwind CSS', 'Terraform'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[9px] font-bold uppercase tracking-widest text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bloco Workshop */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 border-l-2 border-primary">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Próximo Workshop</p>
                <div className="flex items-center gap-3 text-primary">
                  <MdEvent className="text-xl" />
                  <span className="font-serif italic text-sm">IA Generativa na Prática</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">24 de Setembro, 19:00</p>
              </div>

            </div>

            {/* Rodapé Sidebar */}
            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Time Online</span>
              </div>
              <div className="flex gap-4 text-gray-400">
                <a href="#" className="hover:text-primary transition-colors"><BsGlobe className="text-lg" /></a>
                <a href="#" className="hover:text-primary transition-colors"><BsEnvelope className="text-lg" /></a>
              </div>
            </div>

          </div>

          <div className="text-center mt-8">
            <p className="font-serif italic text-gray-400 text-sm">"Inovação é a nossa linguagem padrão."</p>
          </div>
        </aside>

      </div>
    </section>
  );
};

// Componente Auxiliar para o Card de Serviço
const ServiceCard = ({ icon, title, desc, dark }) => (
  <div className={`
    group flex flex-col justify-between p-10 h-[400px] border relative overflow-hidden transition-all duration-500 hover:-translate-y-1
    ${dark 
      ? 'bg-primary text-background border-primary dark:bg-white dark:text-black dark:border-white' 
      : 'bg-surface text-primary border-gray-200 dark:border-gray-800'
    }
  `}>
    <div className="z-10">
      <div className={dark ? "text-white dark:text-black" : "text-primary"}>{icon}</div>
      <h3 className="text-2xl font-serif italic mb-4">{title}</h3>
      <p className={`font-light leading-relaxed ${dark ? 'text-gray-400 dark:text-gray-600' : 'text-gray-500'}`}>
        {desc}
      </p>
    </div>
    <div className="z-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold group-hover:gap-4 transition-all">
      Ver Detalhes <BsArrowRight className="text-sm" />
    </div>
  </div>
);

// Componente Auxiliar para item da Sidebar
const SidebarItem = ({ color, title, subtitle }) => (
  <div className="flex items-start gap-3 group cursor-pointer">
    <div className={`w-1.5 h-1.5 rounded-full mt-2 ${color}`}></div>
    <div>
      <span className="text-sm font-medium block text-primary group-hover:underline">{title}</span>
      <span className="text-xs text-gray-400 italic">{subtitle}</span>
    </div>
  </div>
);

export default ServicesSection;