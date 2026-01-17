import React from 'react';
import { BsArrowRight, BsTerminal } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-background text-primary selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* === HERO SECTION === */}
      <section className="px-8 md:px-16 mb-24 pt-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-none mb-12">
            O futuro é<br />
            automatizado<span className="text-gray-200 dark:text-gray-800">.</span>
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
        </div>
      </section>

      {/* === JORNADA & PILARES === */}
      <section className="px-8 md:px-16 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Coluna Esquerda: Jornada */}
          <div className="lg:col-span-8 space-y-24">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Nossa Jornada</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                <div className="space-y-6">
                  <p className="text-2xl font-serif leading-relaxed italic">
                    "Nascemos da necessidade de transformar complexidade em fluidez."
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                    A Codersa não é apenas uma empresa de tecnologia; somos arquitetos de sistemas autônomos. Nossa trajetória começou no coração da engenharia de dados, onde percebemos que o verdadeiro valor da IA não reside apenas no processamento, mas na precisão da execução.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                    Hoje, unimos o rigor matemático à sensibilidade do design para entregar soluções que não apenas resolvem problemas, mas antecipam necessidades.
                  </p>
                </div>

                {/* Elemento Gráfico Abstrato */}
                <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden flex items-center justify-center p-12 rounded-sm border border-gray-100 dark:border-gray-800">
                  <div className="relative w-full h-full border border-black/5 dark:border-white/5 rounded-full flex items-center justify-center">
                    <div className="absolute w-3/4 h-3/4 border border-black/10 dark:border-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute w-1/2 h-1/2 border border-black/20 dark:border-white/20 rounded-full"></div>
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-black/40 dark:bg-white/40 rounded-full"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-black/40 dark:bg-white/40 rounded-full"></div>
                    
                    {/* SVG Decorativo de Fundo */}
                    <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none" viewBox="0 0 100 100">
                      <path d="M20,50 Q50,20 80,50" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                      <path d="M20,50 Q50,80 80,50" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                      <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.1"></circle>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Coluna Direita: Pilares Técnicos (Sticky) */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-12 border border-gray-100 dark:border-gray-800">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Pilares Técnicos</h3>
              <ul className="flex flex-col">
                <TechnicalPillar 
                  title="Inteligência Artificial" 
                  desc="Modelos neurais aplicados a decisões complexas e processamento preditivo." 
                />
                <TechnicalPillar 
                  title="Automação de Fluxos" 
                  desc="Sistemas que operam em harmonia e independência absoluta no ambiente digital." 
                />
                <TechnicalPillar 
                  title="Engenharia de Dados" 
                  desc="Infraestrutura resiliente para suportar a evolução contínua dos algoritmos." 
                />
              </ul>
            </div>
            
            <div className="mt-8 px-2">
              <Link to="/contato" className="inline-flex items-center gap-4 group text-primary dark:text-white hover:opacity-70 transition-opacity">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Inicie seu projeto conosco</span>
                <BsArrowRight className="text-sm group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* === MANIFESTO (Escuro) === */}
      <section className="bg-black text-white dark:bg-white dark:text-black py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">Nosso Manifesto</h2>
            <p className="text-4xl md:text-6xl font-serif max-w-4xl leading-tight text-white dark:text-black">
              Tecnologia não é sobre o que as máquinas podem fazer, mas sobre o que os humanos podem deixar de fazer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 dark:bg-black/10 border border-white/10 dark:border-black/10">
            <ManifestoCard 
              number="01" 
              title="Eficiência Obsessiva" 
              desc="Eliminamos o atrito. Cada processo automatizado é um recurso devolvido à criatividade humana." 
            />
            <ManifestoCard 
              number="02" 
              title="Engenharia Invisível" 
              desc="O melhor sistema é aquele que funciona sem ser percebido. Buscamos a sofisticação através da simplicidade." 
            />
            <ManifestoCard 
              number="03" 
              title="Ética Algorítmica" 
              desc="Construímos com responsabilidade. A IA deve servir como uma extensão justa e transparente da vontade humana." 
            />
          </div>
        </div>
      </section>

      {/* === CTA FINAL === */}
      <section className="py-40 px-8 md:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-5xl font-serif tracking-tight">Pronto para o próximo passo?</h2>
          <p className="text-gray-500 font-light text-lg">
            Junte-se às empresas que já estão operando no futuro da automação inteligente.
          </p>
          <div className="flex justify-center">
            <Link 
              to="/contato" 
              className="px-12 py-5 bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity"
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

// Componente para item da lista de pilares
const TechnicalPillar = ({ title, desc }) => (
  <li className="py-6 border-b border-black/5 dark:border-white/5 last:border-0">
    <span className="text-[11px] uppercase tracking-[0.2em] font-bold block mb-1">{title}</span>
    <p className="text-xs text-gray-500 font-light">{desc}</p>
  </li>
);

// Componente para card do manifesto
const ManifestoCard = ({ number, title, desc }) => (
  <div className="p-12 bg-primary dark:bg-white hover:bg-white/5 dark:hover:bg-black/5 transition-colors">
    <span className="text-4xl font-serif italic block mb-6 text-white dark:text-black">{number}</span>
    <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-4 text-white dark:text-black">{title}</h4>
    <p className="text-sm text-gray-400 dark:text-gray-600 leading-relaxed font-light">
      {desc}
    </p>
  </div>
);

export default AboutPage;