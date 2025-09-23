import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

// Importações do Swiper para o carrossel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importação do ícone de estrela
import { FaStar } from 'react-icons/fa';

// --- SUB-COMPONENTES DA HOMEPAGE ---

const HomePageProjectCard = ({ project }) => (
  <div className="portfolio-card">
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomePageData = async () => {
      const [projectsRes, testimonialsRes] = await Promise.all([
        supabase.from('projects').select('*').eq('is_featured', true).limit(3),
        supabase.from('testimonials').select('*').eq('is_approved', true)
      ]);

      if (projectsRes.error) console.error("Erro ao buscar projetos:", projectsRes.error);
      else setFeaturedProjects(projectsRes.data);
      
      if (testimonialsRes.error) console.error("Erro ao buscar avaliações:", testimonialsRes.error);
      else setTestimonials(testimonialsRes.data);

      setLoading(false);
    };

    fetchHomePageData();
  }, []);
  
  const servicesData = [
    { title: 'Desenvolvimento Web', description: 'Criação de sites responsivos e plataformas web interativas.', icon: <svg fill="currentColor" viewBox="0 0 256 256"><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path></svg> },
    { title: 'Aplicações Mobile', description: 'Desenvolvimento de aplicativos móveis nativos e multiplataforma.', icon: <svg fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM80,84A12,12,0,1,1,68,72,12,12,0,0,1,80,84Zm40,0a12,12,0,1,1-12-12A12,12,0,0,1,120,84Z"></path></svg> },
    { title: 'Sistemas Personalizados', description: 'Desenvolvimento de sistemas sob medida para o seu negócio.', icon: <svg fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"></path></svg> }
  ];

  const heroBackgroundImageUrl = '././public/gradiente.jpg';

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
      <section id="services" className="container">
        <div className="section-header">
          <h2>Soluções Sob Medida</h2>
          <p>Oferecemos um conjunto completo de serviços de desenvolvimento, da concepção à implementação.</p>
        </div>
        <div className="services-grid">
            {servicesData.map(service => <ServiceCard key={service.title} {...service} />)}
        </div>
      </section>
{/* --- NOVA SEÇÃO 'QUEM SOMOS' --- */}
       <section id="about-us" className="about-us-section">
        <div className="container">
          <div className="about-us-grid">
            <div className="about-us-image">
              {/* IMPORTANTE: Coloque uma imagem da sua equipe ou escritório na pasta public/images */}
              <img src="././public/gradiente.jpg" alt="Equipe da CODERSA trabalhando em projetos" />
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
      <section id="portfolio" style={{backgroundColor: 'var(--white)'}}>
        <div className="container">
            <div className="section-header">
                <h2>Portfólio de Projetos em Destaque</h2>
                <p>Confira alguns dos projetos que tivemos o prazer de desenvolver.</p>
            </div>
            {loading ? (
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
        </div>
      </section>

      {/* --- SEÇÃO DE AVALIAÇÕES --- */}
      {!loading && testimonials.length > 0 && (
          <section id="testimonials" className="container">
              <div className="section-header">
                  <h2>O Que Nossos Clientes Dizem</h2>
              </div>
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
                              <p className="quote">"{item.quote}"</p>
                              <p className="author">{item.client_name}</p>
                              <p className="position">{item.company_position}</p>
                          </div>
                      </SwiperSlide>
                  ))}
              </Swiper>
          </section>
      )}
    </>
  );
};

export default HomePage;