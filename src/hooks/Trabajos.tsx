import React, { useState, useEffect, useRef } from 'react';
import type { Proyecto } from './types';
import '../style/Trabajos.css';

// Importar imágenes (debes tener estas imágenes en tu carpeta public/images/)
const proyectosData: Proyecto[] = [
  {
    id: 1,
    titulo: 'Marmolito Calisa - Cerámica y Fotografía Conmemorativa',
    categoria: 'Frontend',
    imagen: '/images/proyectos/foto.png',
    tecnologias: ['React', 'TypeScript', 'Git Hub'],
    enlace: 'https://imagenes-recuerdos.netlify.app/',
    descripcion: 'sitio web oficial de una empresa que ofrece un producto tangible (cerámica conmemorativa) acompañado de un servicio altamente personalizado y sensible, dirigido a un público en un momento específico de duelo o recuerdo. Diseño responsivo y optimizado para SEO.',
    estado: 'disponible',
    destacado: true,
    fecha: '2025-12'
  },
  {
    id: 2,
    titulo: 'API RESTful Microservicios',
    categoria: 'Backend',
    imagen: '/images/proyectos/api-rest.jpg',
    tecnologias: ['Node.js', 'Express', 'MongoDB', 'Docker', 'JWT'],
    descripcion: 'Arquitectura de microservicios escalable con autenticación JWT, documentación Swagger y sistema de caché distribuido.',
    estado: 'proximamente',
    fecha: '2024-02'
  },
  {
    id: 3,
    titulo: 'Dashboard Empresarial',
    categoria: 'Fullstack',
    imagen: '/images/proyectos/dashboard.jpg',
    tecnologias: ['Next.js 14', 'Prisma', 'PostgreSQL', 'Chart.js', 'Auth.js'],
    enlace: 'https://dashboard-empresarial.com',
    descripcion: 'Dashboard analítico en tiempo real con múltiples widgets, reportes exportables y panel de administración avanzado.',
    estado: 'proximamente',
    destacado: true,
    fecha: '2024-03'
  },
  {
    id: 4,
    titulo: 'Sistema de Reservas Hotel',
    categoria: 'Fullstack',
    imagen: '/images/proyectos/hotel-booking.jpg',
    tecnologias: ['React', 'NestJS', 'MySQL', 'Socket.io', 'Stripe'],
    descripcion: 'Sistema de gestión hotelera con reservas en tiempo real, notificaciones push y pagos seguros integrados.',
    estado: 'proximamente',
    fecha: '2024-04'
  },
  {
    id: 5,
    titulo: 'App Clima en Tiempo Real',
    categoria: 'Frontend',
    imagen: '/images/proyectos/weather-app.jpg',
    tecnologias: ['Vue 3', 'Pinia', 'Vite', 'OpenWeather API'],
    enlace: 'https://weather-app-demo.com',
    descripcion: 'Aplicación meteorológica con geolocalización, pronóstico extendido y modo oscuro/claro. Optimizada para PWA.',
    estado: 'proximamente',
    fecha: '2024-01'
  },
  {
    id: 6,
    titulo: 'Plataforma E-learning',
    categoria: 'Fullstack',
    imagen: '/images/proyectos/elearning.jpg',
    tecnologias: ['Angular', '.NET Core', 'SQL Server', 'Azure', 'SignalR'],
    descripcion: 'Plataforma educativa con videoconferencias, evaluaciones automatizadas y sistema de gamificación.',
    estado: 'proximamente',
    destacado: true,
    fecha: '2024-05'
  },
  {
    id: 7,
    titulo: 'CMS Headless Personalizado',
    categoria: 'Backend',
    imagen: '/images/proyectos/cms.jpg',
    tecnologias: ['Strapi', 'GraphQL', 'Redis', 'AWS S3', 'Webhooks'],
    enlace: 'https://cms-headless.com',
    descripcion: 'Sistema de gestión de contenido headless con editor WYSIWYG, multi-tenant y API GraphQL optimizada.',
    estado: 'proximamente',
    fecha: '2024-02'
  },
  {
    id: 8,
    titulo: 'Marketplace NFT',
    categoria: 'Frontend',
    imagen: '/images/proyectos/nft-marketplace.jpg',
    tecnologias: ['React', 'Web3.js', 'Ethers.js', 'IPFS', 'MetaMask'],
    descripcion: 'Marketplace descentralizado para NFTs con conexión a billeteras crypto y subastas en tiempo real.',
    estado: 'proximamente',
    fecha: '2024-06'
  }
];

export const Trabajos: React.FC = () => {
  const [filtro, setFiltro] = useState<string>('todos');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [cardsInView, setCardsInView] = useState<boolean[]>(Array(proyectosData.length).fill(false));
  const [modalLoaded, setModalLoaded] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const proyectosFiltrados = filtro === 'todos' 
    ? proyectosData 
    : proyectosData.filter(proyecto => 
        proyecto.categoria.toLowerCase() === filtro.toLowerCase()
      );

  const categorias = ['todos', 'frontend', 'backend', 'fullstack'];

  // Observador de intersección para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setCardsInView(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [proyectosFiltrados]);

  // Reset cards in view cuando cambia el filtro
  useEffect(() => {
    setCardsInView(Array(proyectosFiltrados.length).fill(false));
  }, [filtro]);

  // Efecto para modal
  useEffect(() => {
    if (proyectoSeleccionado) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setModalLoaded(true), 50);
    } else {
      document.body.style.overflow = 'unset';
      setModalLoaded(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [proyectoSeleccionado]);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProyectoSeleccionado(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    ];
    return gradients[index % gradients.length];
  };

  const getCategoriaColor = (categoria: string) => {
    switch(categoria.toLowerCase()) {
      case 'frontend': return '#3b82f6';
      case 'backend': return '#10b981';
      case 'fullstack': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const getEstadoColor = (estado: string) => {
    return estado === 'disponible' ? '#10b981' : '#f59e0b';
  };

  // Función para manejar el ref de las cards
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  // Renderizar imagen - maneja tanto URLs como imports
  const renderImagen = (proyecto: Proyecto, className: string = '') => {
    // Si es un string (URL), usar directamente
    if (typeof proyecto.imagen === 'string') {
      // Verificar si la imagen existe, si no usar placeholder
      return (
        <>
          <img 
            src={proyecto.imagen} 
            alt={proyecto.titulo}
            className={`${className} imagen-real`}
            onError={(e) => {
              // Si la imagen falla, mostrar el placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const placeholder = parent.querySelector('.imagen-placeholder-fallback') as HTMLElement;
                if (placeholder) placeholder.style.display = 'block';
              }
            }}
          />
          <div 
            className="imagen-placeholder-fallback" 
            style={{ 
              background: getGradient(proyecto.id - 1),
              display: 'none'
            }}
          >
            <div className="proyecto-icono">
              {proyecto.categoria === 'Frontend' ? '🖥️' : 
               proyecto.categoria === 'Backend' ? '⚙️' : '🚀'}
            </div>
          </div>
        </>
      );
    }
    
    // Si es un import/require, usar src
    return (
      <img 
        src={proyecto.imagen} 
        alt={proyecto.titulo}
        className={`${className} imagen-real`}
      />
    );
  };

  return (
    <section className="trabajos-section" id="trabajos">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Portfolio de Desarrollo</span>
          <h2 className="section-title">Proyectos <span className="highlight">Tecnológicos</span></h2>
          <p className="section-description">
            Soluciones web innovadoras desarrolladas con las tecnologías más modernas del mercado
          </p>
        </div>

        <div className="filtros">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`filtro-btn ${filtro === categoria ? 'active' : ''}`}
              onClick={() => setFiltro(categoria)}
              style={{
                background: filtro === categoria ? getCategoriaColor(categoria) : undefined
              }}
            >
              {categoria === 'todos' ? 'Todos' : 
               categoria === 'frontend' ? 'Frontend' :
               categoria === 'backend' ? 'Backend' : 'Fullstack'}
            </button>
          ))}
        </div>

        <div className="proyectos-grid">
          {proyectosFiltrados.map((proyecto, index) => (
            <div 
              key={proyecto.id} 
              className={`proyecto-card ${proyecto.destacado ? 'destacado' : ''} ${cardsInView[index] ? 'visible' : ''}`}
              ref={(el) => setCardRef(el, index)}
              onClick={() => setProyectoSeleccionado(proyecto)}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`,
                borderColor: proyecto.destacado ? getCategoriaColor(proyecto.categoria) : 'transparent'
              }}
            >
              {proyecto.destacado && (
                <div className="destacado-badge" style={{ background: getCategoriaColor(proyecto.categoria) }}>
                  ⭐ Destacado
                </div>
              )}
              
              <div className="proyecto-card-inner">
                <div className="proyecto-imagen">
                  <div 
                    className="imagen-placeholder"
                    style={{ background: getGradient(proyecto.id - 1) }}
                  >
                    <div className="proyecto-icono">
                      {proyecto.categoria === 'Frontend' ? '🖥️' : 
                       proyecto.categoria === 'Backend' ? '⚙️' : '🚀'}
                    </div>
                  </div>
                  {renderImagen(proyecto, 'imagen-overlay')}
                  <div className="proyecto-overlay">
                    <span className="ver-detalles">
                      <svg className="eye-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Ver detalles
                    </span>
                  </div>
                  <div className="proyecto-indicador">
                    <span 
                      className="indicador-dot"
                      style={{ background: getEstadoColor(proyecto.estado) }}
                    ></span>
                    <span 
                      className="indicador-text"
                      style={{ color: getEstadoColor(proyecto.estado) }}
                    >
                      {proyecto.estado === 'disponible' ? 'Disponible' : 'Próximamente'}
                    </span>
                  </div>
                  <div className="proyecto-fecha">
                    {proyecto.fecha}
                  </div>
                </div>
                
                <div className="proyecto-content">
                  <div className="proyecto-header">
                    <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
                    <span 
                      className="proyecto-categoria"
                      style={{ 
                        background: `${getCategoriaColor(proyecto.categoria)}15`,
                        color: getCategoriaColor(proyecto.categoria)
                      }}
                    >
                      {proyecto.categoria}
                    </span>
                  </div>
                  
                  <div className="proyecto-descripcion">
                    {proyecto.descripcion?.substring(0, 100)}...
                  </div>
                  
                  <div className="tecnologias">
                    {proyecto.tecnologias.slice(0, 4).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="tecnologia-tag"
                        style={{ 
                          background: `${getCategoriaColor(proyecto.categoria)}15`,
                          color: getCategoriaColor(proyecto.categoria)
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {proyecto.tecnologias.length > 4 && (
                      <span className="tecnologia-more">+{proyecto.tecnologias.length - 4}</span>
                    )}
                  </div>
                  
                  <div className="proyecto-footer">
                    {proyecto.enlace && proyecto.estado === 'disponible' ? (
                      <a 
                        href={proyecto.enlace} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="proyecto-enlace"
                        onClick={(e) => e.stopPropagation()}
                        style={{ 
                          background: `${getCategoriaColor(proyecto.categoria)}15`,
                          color: getCategoriaColor(proyecto.categoria)
                        }}
                      >
                        <svg className="link-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Ver demo
                      </a>
                    ) : (
                      <span 
                        className="proyecto-soon"
                        style={{ 
                          background: `${getEstadoColor(proyecto.estado)}15`,
                          color: getEstadoColor(proyecto.estado)
                        }}
                      >
                        {proyecto.estado === 'proximamente' ? 'Próximamente' : 'Ver código'}
                      </span>
                    )}
                    
                    <button 
                      className="proyecto-info-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProyectoSeleccionado(proyecto);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal mejorado */}
        {proyectoSeleccionado && (
          <div className="proyecto-modal" onClick={() => setProyectoSeleccionado(null)}>
            <div 
              className={`modal-content ${modalLoaded ? 'loaded' : ''}`}
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setProyectoSeleccionado(null)}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              
              <div className="modal-header">
                <div className="modal-badge-group">
                  <span 
                    className="modal-categoria"
                    style={{ 
                      background: `${getCategoriaColor(proyectoSeleccionado.categoria)}15`,
                      color: getCategoriaColor(proyectoSeleccionado.categoria),
                      border: `1px solid ${getCategoriaColor(proyectoSeleccionado.categoria)}30`
                    }}
                  >
                    {proyectoSeleccionado.categoria}
                  </span>
                  <span 
                    className="modal-estado"
                    style={{ 
                      background: `${getEstadoColor(proyectoSeleccionado.estado)}15`,
                      color: getEstadoColor(proyectoSeleccionado.estado)
                    }}
                  >
                    {proyectoSeleccionado.estado === 'disponible' ? '🚀 Disponible' : '⏳ Próximamente'}
                  </span>
                  {proyectoSeleccionado.destacado && (
                    <span className="modal-destacado">
                      ⭐ Destacado
                    </span>
                  )}
                </div>
                
                <h2 className="modal-titulo">{proyectoSeleccionado.titulo}</h2>
                <div className="modal-fecha">
                  <svg className="calendar-icon" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  {proyectoSeleccionado.fecha}
                </div>
              </div>
              
              <div className="modal-body">
                <div className="modal-imagen-container">
                  <div className="modal-imagen-wrapper">
                    {renderImagen(proyectoSeleccionado, 'modal-imagen-real')}
                    <div 
                      className="modal-imagen-placeholder"
                      style={{ background: getGradient(proyectoSeleccionado.id - 1) }}
                    >
                      <div className="modal-icono">
                        {proyectoSeleccionado.categoria === 'Frontend' ? '💻' : 
                         proyectoSeleccionado.categoria === 'Backend' ? '⚙️' : '🚀'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-info">
                  <div className="modal-descripcion">
                    <h3>
                      <svg className="desc-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 13H8" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 17H8" stroke="currentColor" strokeWidth="2"/>
                        <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Descripción del Proyecto
                    </h3>
                    <p>{proyectoSeleccionado.descripcion}</p>
                  </div>
                  
                  <div className="modal-tecnologias">
                    <h3>
                      <svg className="tech-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Tecnologías Utilizadas
                    </h3>
                    <div className="tecnologias-lista">
                      {proyectoSeleccionado.tecnologias.map((tech, index) => (
                        <span 
                          key={index} 
                          className="tecnologia-item"
                          style={{ 
                            background: `${getCategoriaColor(proyectoSeleccionado.categoria)}15`,
                            color: getCategoriaColor(proyectoSeleccionado.categoria),
                            border: `1px solid ${getCategoriaColor(proyectoSeleccionado.categoria)}30`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    {proyectoSeleccionado.enlace && proyectoSeleccionado.estado === 'disponible' ? (
                      <a 
                        href={proyectoSeleccionado.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-enlace"
                        style={{ 
                          background: getCategoriaColor(proyectoSeleccionado.categoria),
                          color: 'white'
                        }}
                      >
                        <svg className="link-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Ver proyecto en vivo
                      </a>
                    ) : (
                      <button 
                        className="modal-proximamente"
                        style={{ 
                          background: `${getEstadoColor(proyectoSeleccionado.estado)}15`,
                          color: getEstadoColor(proyectoSeleccionado.estado)
                        }}
                      >
                        <svg className="clock-icon" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Proyecto en desarrollo
                      </button>
                    )}
                    
                    <button className="modal-contacto">
                      <svg className="message-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M21 11.5C21 16.75 16.75 21 11.5 21C10.9 21 10.3 20.9 9.7 20.8C5.9 20 3 16.6 3 12.5V8.5C3 5.5 5.5 3 8.5 3H11.5C16.75 3 21 7.25 21 12.5V11.5Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 9H15" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 13H12" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Consultar proyecto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {proyectosFiltrados.length === 0 && (
          <div className="no-proyectos">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none">
              <path d="M21 10H3M21 6H3M21 14H3M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>No hay proyectos en esta categoría</h3>
            <p>Prueba con otra categoría o vuelve más tarde para ver nuevos proyectos</p>
          </div>
        )}
      </div>
    </section>
  );
};