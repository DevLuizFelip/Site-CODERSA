import React, {useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

// CORREÇÃO: Garantindo que todos os estilos do carrossel sejam importados
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importação de ícones
import { FaStar, FaLaptopCode, FaMobileAlt, FaCloud, FaPalette, FaRocket, FaBug } from 'react-icons/fa';

const PROJECT_IMAGES_BUCKET = 'project-images';

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
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  // Busca os projetos em destaque
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      setLoadingProjects(true);
      const { data, error } = await supabase.from('projects').select('*').eq('is_featured', true).limit(6);

      if (error) {
        console.error("Erro ao buscar projetos:", error);
      } else {
        // CORREÇÃO: Adicionada a lógica para transformar o caminho da imagem em URL pública
        const projectsWithUrls = data.map(project => {
            if (project.image_url) {
                const { data: { publicUrl } } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(project.image_url);
                return { ...project, image_url: publicUrl };
            }
            return project;
        });
        setFeaturedProjects(projectsWithUrls);
      }
      setLoadingProjects(false);
    };
    fetchFeaturedProjects();
  }, []);

  // Busca as avaliações aprovadas
  useEffect(() => {
    const fetchTestimonials = async () => {
        setLoadingTestimonials(true);
        const { data, error } = await supabase.from('testimonials').select('*').eq('is_approved', true);
        
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
    { title: 'Design UX/UI', description: 'Desenvolvemos interfaces de usuário bonitas e fáceis de usar, centradas no usuário.', icon: <FaPalette size={40}/> },
    { title: 'Otimização de Performance e SEO', description: 'Melhoramos a velocidade do seu site e a visibilidade nos motores de busca para atrair mais clientes.', icon: <FaRocket size={40}/> },
    { title: 'Consultoria e Suporte Técnico', description: 'Oferecemos consultoria especializada e suporte contínuo para garantir o funcionamento impecável dos seus sistemas.', icon: <FaBug size={40}/> }
  ];

  // VERIFIQUE SE ESTE CAMINHO E NOME DE ARQUIVO ESTÃO CORRETOS!
  const heroBackgroundImageUrl = '/images/gradiente.jpg';

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

      {/* --- SEÇÃO 'QUEM SOMOS' --- */}
      <section id="about-us" className="about-us-section">
        <div className="container">
          <div className="about-us-grid">
            <div className="about-us-image">
              {/* VERIFIQUE SE ESTE CAMINHO E NOME DE ARQUIVO ESTÃO CORRETOS! */}
              <img src="/images/gradiente.jpg" alt="Equipe da CODERSA trabalhando em projetos" />
            </div>
            <div className="about-us-content">
              <h2>Apaixonados por Código e Inovação</h2>
              <p>Somos parceiros estratégicos que mergulham nos desafios dos nossos clientes para construir soluções de software robustas, escaláveis e intuitivas.</p>
              <Link to="/contato" className="about-us-button">Fale Conosco</Link>
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
            {loadingProjects ? (
              <p className="empty-portfolio-message">Carregando projetos...</p>
            ) : (
              featuredProjects.length > 0 ? (
                // O div do grid foi substituído pelo componente Swiper
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation={true} // Habilita as setas de navegação
                  pagination={{ clickable: true }}
                  breakpoints={{
                      640: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                  }}
                  className="portfolio-swiper" // Classe para estilização customizada
                >
                  {featuredProjects.map(project => (
                    <SwiperSlide key={project.id}>
                      <HomePageProjectCard project={project} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="empty-portfolio-message">Nenhum projeto em destaque no momento.</p>
              )
            )}
        </div>
      </section>
      {/* --- SEÇÃO DE AVALIAÇÕES --- */}
      {loadingTestimonials ? (
        <div className="container" style={{textAlign: 'center', padding: '2rem 0'}}><p>Carregando avaliações...</p></div>
      ) : testimonials.length > 0 && (
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
                              {/* CORREÇÃO: Trocado 'testimonial.message' por 'testimonial.quote' */}
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