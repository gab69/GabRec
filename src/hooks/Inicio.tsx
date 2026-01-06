import { useEffect, useRef, useState } from 'react';
import "../style/Inicio.css";

export const Inicio = () => {
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const slideIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const words = [
    'Software a Medida',
    'Soluciones Digitales',
    'Aplicaciones Web',
    'Sistemas Inteligentes',
    'Plataformas Cloud',
    'Experiencias Digitales'
  ];

  // Imágenes optimizadas para el carrusel moderno
  const slides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Dashboard de análisis de datos"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Plataforma empresarial"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Aplicación móvil"
    },
    {
      id: 4,
      image: "https://media.istockphoto.com/id/1759628359/photo/the-designer-team-is-designing-the-uxui-system-to-make-the-uxui-system-work-well-on-new.jpg?s=1024x1024&w=is&k=20&c=xiKM8kuYZGLcYLkNq7ZbwU4sMKNO1ZCfzSCx40WCFtU=",
      alt: "Sistema en la nube"
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/16129728/pexels-photo-16129728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Interfaz moderna"
    }
  ];

  // Efecto para typing animation mejorado
  useEffect(() => {
    const typeEffect = () => {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setTypedText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(typeEffect, isDeleting ? 30 : 80);
    return () => clearTimeout(timer);
  }, [charIndex, currentWordIndex, isDeleting, words]);

  // Efecto para animación de aparición
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Efecto para el carrusel automático
  useEffect(() => {
    const startSlider = () => {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    };

    startSlider();

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [slides.length]);

  const nextSlide = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const prevSlide = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const goToSlide = (index: number) => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    setCurrentSlide(index);
    
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const metrics = [
    { 
      value: '100+', 
      label: 'Proyectos Entregados',
      icon: '📊',
      description: 'Soluciones implementadas exitosamente'
    },
    { 
      value: '99%', 
      label: 'Satisfacción Cliente',
      icon: '⭐',
      description: 'Índice de satisfacción garantizado'
    },
    { 
      value: '<30 días', 
      label: 'Tiempo Entrega',
      icon: '⚡',
      description: 'Desarrollo ágil y eficiente'
    },
    { 
      value: '10+', 
      label: 'Años Experiencia',
      icon: '🏆',
      description: 'Trayectoria consolidada'
    }
  ];

  return (
    <section 
      className={`inicio-container ${isVisible ? 'visible' : ''}`} 
      id="inicio"
      ref={sectionRef}
    >
      {/* Fondo con gradiente animado */}
      <div className="inicio-background">
        <div className="gradient-animation"></div>
        <div className="grid-overlay"></div>
        <div className="particles-container">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="inicio-content">
        <div className="inicio-left">
          {/* Título principal */}
          <h1 className="inicio-title">
            <span className="title-line">Impulsamos tu negocio con</span>
            <div className="typing-container">
              <span className="typed-text">{typedText}</span>
              <span className={`cursor ${isDeleting ? 'blinking' : ''}`}>|</span>
            </div>
          </h1>
          
          {/* Subtítulo mejorado */}
          <p className="inicio-subtitle">
            Somos <strong>especialistas en desarrollo tecnológico</strong> que 
            combina innovación, diseño y funcionalidad para crear soluciones 
            digitales que generan impacto real en tu negocio.
          </p>
          
          {/* Métricas mejoradas */}
          <div className="metrics-container">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="metric-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="metric-icon">{metric.icon}</div>
                <div className="metric-content">
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-description">{metric.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección derecha con Carrusel Moderno */}
        <div className="inicio-right">
          <div className="carousel-modern-container">
           

            {/* Carrusel principal */}
            <div className="carousel-modern-wrapper">
              <div 
                className="carousel-modern-track" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="carousel-modern-slide">
                    <div className="slide-image-modern-container">
                      <img 
                        src={slide.image} 
                        alt={slide.alt}
                        className="slide-image-modern"
                        loading="lazy"
                      />
                      <div className="image-gradient-overlay"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles flotantes */}
              <div className="floating-controls">
                <button 
                  className="floating-btn floating-prev" 
                  onClick={prevSlide}
                  aria-label="Slide anterior"
                >
                  <svg className="control-arrow" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                  </svg>
                </button>
                <button 
                  className="floating-btn floating-next" 
                  onClick={nextSlide}
                  aria-label="Slide siguiente"
                >
                  <svg className="control-arrow" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>
              </div>
            </div>
                 {/* Indicador superior */}
         <div className="slide-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${((currentSlide + 1) / slides.length) * 100}%` 
                  }}
                />
              </div>
              <div className="slide-count">
                <span className="current-slide">{currentSlide + 1}</span>
                <span className="divider">/</span>
                <span className="total-slides">{slides.length}</span>
              </div>
            {/* Indicadores inferiores */}
            <div className="modern-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`modern-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir a slide ${index + 1}`}
                >
                  <div className="indicator-dot"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};