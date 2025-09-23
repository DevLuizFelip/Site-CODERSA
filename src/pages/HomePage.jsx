import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

// Importações do Swiper para o carrossel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importação de ícones que usaremos
import { FaStar, FaLaptopCode, FaMobileAlt, FaCloud, FaPalette, FaRocket, FaBug } from 'react-icons/fa';

// Nome do bucket onde as imagens dos projetos são salvas
const PROJECT_IMAGES_BUCKET = 'project-images';

// --- SUB-COMPONENTES DA HOMEPAGE ---

const HomePageProjectCard = ({ project }) => (
  <div className="portfolio-card">
    {/* Usa a image_url já processada ou um placeholder */}
    <img src={project.image_url || 'https://via.placeholder.com/400x225.png?text=CODERSA'} alt={project.title} className="portfolio-card__image" />
    <div className="portfolio-card__content">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <Link to="/portfolio" style={{fontWeight: 600}}>Ver mais projetos →</Link> 
    </div>
  </div>
);

const ServiceCard = ({ icon, title, description }) => (
    <div className="service-card">
      <div className="service-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
);

const StarRatingDisplay = ({ rating }) => (
    <div style={{ display: 'flex', gap: '0.25rem', color: '#ffc107', marginBottom: '1rem' }}>
        {[...Array(5)].map((_, index) => (
            <FaStar key={index} color={index < rating ? '#ffc107' : '#e4e5e9'} />
        ))}
    </div>
);


// --- COMPONENTE PRINCIPAL DA HOMEPAGE ---

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  // Estados de carregamento separados
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  // Busca os projetos em destaque
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      setLoadingProjects(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true)
        .eq('show_in_portfolio', true) // Garante que só projetos para o portfólio sejam exibidos
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error("Erro ao buscar projetos em destaque:", error);
      } else {
        // **A CORREÇÃO PARA A HOMEPAGE ESTÁ AQUI**
        const projectsWithPublicUrls = data.map(project => {
            if (project.image_url) {
                const { data: { publicUrl } } = supabase.storage
                    .from(PROJECT_IMAGES_BUCKET) // Usa a constante do bucket
                    .getPublicUrl(project.image_url);
                return { ...project, image_url: publicUrl };
            }
            return project;
        });
        setFeaturedProjects(projectsWithPublicUrls);
      }
      setLoadingProjects(false);
    };
    fetchFeaturedProjects();
  }, []);

  // Busca as avaliações aprovadas
  useEffect(() => {
    const fetchTestimonials = async () => {
        setLoadingTestimonials(true);
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('is_approved', true);
        
        if (error) console.error("Erro ao buscar avaliações:", error);
        else setTestimonials(data);
        setLoadingTestimonials(false);
    };
    fetchTestimonials();
  }, []);
  
  const servicesData = [
    { title: 'Desenvolvimento Web Customizado', description: 'Construímos sites e aplicações web únicas, modernas e de alta performance.', icon: <FaLaptopCode size={40}/> },
    { title: 'Desenvolvimento de Aplicativos Mobile', description: 'Criamos aplicativos nativos e híbridos para iOS e Android.', icon: <FaMobileAlt size={40}/> },
    { title: 'Soluções em Nuvem e DevOps', description: 'Implementamos infraestruturas robustas em nuvem e automatizamos seus processos.', icon: <FaCloud size={40}/> },
    { title: 'Design UX/UI', description: 'Desenvolvemos interfaces de usuário bonitas e fáceis de usar.', icon: <FaPalette size={40}/> },
    { title: 'Otimização de Performance e SEO', description: 'Melhoramos a velocidade do seu site e a visibilidade nos motores de busca.', icon: <FaRocket size={40}/> },
    { title: 'Consultoria e Suporte Técnico', description: 'Oferecemos consultoria especializada e suporte contínuo para seus sistemas.', icon: <FaBug size={40}/> }
  ];

  const heroBackgroundImageUrl = '/images/hero-background.jpg'; // Altere para a sua imagem

  return (
    <>
      {/* --- SEÇÃO HERO --- */}
      <section className="container hero-section">
        <div className="hero-boxed" style={{ backgroundImage: `url(${heroBackgroundImageUrl})` }}>
          <div className="hero-boxed__content">
            <h1>Transformando Ideias em Soluções Digitais</h1>
            <p>Combinamos tecnologia de ponta com criatividade para desenvolver softwares inovadores que impulsionam o seu sucesso.</p>
            <Link to="/contato" className="hero-button">Conheça Nossos Serviços</Link>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE SERVIÇOS --- */}
      <section id="services" className="container services-section">
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">Soluções tecnológicas completas para impulsionar seu negócio.</p>
        <div className="services-grid">
            {servicesData.map((service, index) => <ServiceCard key={index} {...service} />)}
        </div>
      </section>

      {/* --- SEÇÃO 'QUEM SOMOS' --- */}
      <section id="about-us" className="about-us-section">
        <div className="container">
          <div className="about-us-grid">
            <div className="about-us-image">
              <img src="/images/equipe-codersa.jpg" alt="Equipe da CODERSA trabalhando em projetos" />
            </div>
            <div className="about-us-content">
              <h2>Apaixonados por Código e Inovação</h2>
              <p>
                A CODERSA nasceu da visão de que a tecnologia pode transformar negócios. Somos mais do que desenvolvedores; somos parceiros estratégicos que mergulham nos desafios dos nossos clientes para construir soluções de software robustas, escaláveis e intuitivas.
              </p>
              <p>
                Nossa missão é transformar ideias complexas em produtos digitais de sucesso, utilizando as melhores tecnologias e uma abordagem colaborativa.
              </p>
              <Link to="/contato" className="about-us-button">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE PORTFÓLIO --- */}
      <section id="portfolio" className="container portfolio-section">
        <h2 className="section-title">Projetos em Destaque</h2>
        <p className="section-subtitle">Confira alguns dos projetos que tivemos o prazer de desenvolver.</p>
        {loadingProjects ? (
          <p className="empty-portfolio-message">Carregando projetos...</p>
        ) : (
          featuredProjects.length > 0 ? (
            <div className="portfolio-grid">
              {featuredProjects.map(project => ( <HomePageProjectCard key={project.id} project={project} /> ))}
            </div>
          ) : (
            <p className="empty-portfolio-message">Nenhum projeto em destaque no momento.</p>
          )
        )}
      </section>

      {/* --- SEÇÃO DE AVALIAÇÕES --- */}
      {loadingTestimonials ? (
        <div className="container" style={{textAlign: 'center', padding: '2rem 0'}}>
            <p>Carregando avaliações...</p>
        </div>
      ) : testimonials.length > 0 && (
          <section id="testimonials" className="container testimonials-section">
              <h2 className="section-title">O Que Nossos Clientes Dizem</h2>
              <p className="section-subtitle">Depoimentos de quem já confiou na CODERSA.</p>
              <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  breakpoints={{
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                  }}
              >
                  {testimonials.map(item => (
                      <SwiperSlide key={item.id}>
                          <div className="testimonial-card">
                              <StarRatingDisplay rating={item.rating} />
                              <p className="testimonial-text">"{item.message}"</p>
                              <p className="testimonial-author">- {item.client_name}</p>
                              <p className="testimonial-position">{item.company_position}</p>
                          </div>
                      </SwiperSlide>
                  ))}
              </Swiper>
              <div className="leave-review">
                  <Link to="/avaliar" className="button button-secondary">Deixar uma Avaliação</Link>
              </div>
          </section>
      )}
    </>
  );
};

export default HomePage;