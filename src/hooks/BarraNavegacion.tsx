import React, { useState, useEffect, useRef } from 'react';
import '../style/BarraNavegacion.css';
import logo from '../assets/logo.webp'; // Importar el logo desde assets

interface BarraNavegacionProps {
  logoTipo?: 'texto' | 'imagen';
  logoPersonalizado?: string; // Opcional: ruta personalizada si el logo tiene otro nombre
}

export const BarraNavegacion: React.FC<BarraNavegacionProps> = ({ 
  logoPersonalizado
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  // Determinar qué logo usar
  const logoUrl = logoPersonalizado || logo;

  // Número de WhatsApp 
  const whatsappNumber = '916386651';
  
  // Mensaje predefinido para WhatsApp
  const whatsappMessage = encodeURIComponent('¡Hola! Me interesa solicitar una cotización de tus servicios. ¿Podrías proporcionarme más información?');

  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Efecto para detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Efecto para detectar scroll y cambiar estilos
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      
      // Detectar sección activa con mejor precisión
      const sections = ['inicio', 'servicios', 'resumen', 'trabajos', 'contactanos'];
      let currentSection = activeSection;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          const elementBottom = elementTop + element.offsetHeight;
          
          // Si el elemento está visible en la ventana
          if (scrollPosition >= elementTop - 150 && scrollPosition < elementBottom - 150) {
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Ejecutar una vez al cargar
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Bloquear scroll del body cuando el menú está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Altura del navbar
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Actualizar sección activa después del scroll
      setTimeout(() => {
        setActiveSection(sectionId);
      }, 300);
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'trabajos', label: 'Trabajos' },
    { id: 'contactanos', label: 'Contáctanos' }
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('inicio');
    setMenuOpen(false);
  };

  // Función para manejar error en carga de imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error al cargar el logo:', logoUrl);
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent) {
      // Crear fallback de texto
      const fallback = document.createElement('span');
      fallback.className = 'logo-text-fallback';
      fallback.textContent = 'GabReC';
      parent.appendChild(fallback);
    }
  };

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    setMenuOpen(false); // Cerrar menú si está abierto en móvil
    window.open(whatsappUrl, '_blank');
  };

  return (
    <nav 
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
    >
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={handleLogoClick}>
          <img 
            src={logoUrl} 
            alt="GabReC Logo" 
            className="logo-image"
            onError={handleImageError}
          />
        </div>
        
        {/* Menú Hamburguesa */}
        <button 
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <div className="hamburger">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
        
        {/* Navegación */}
        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-list">
            {navItems.map((item) => (
              <li key={item.id} className="navbar-item">
                <button
                  className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          {/* CTA Mobile - Solo visible en móvil */}
          {isMobile && (
            <div className="navbar-cta-mobile">
              <button 
                className="cta-button"
                onClick={openWhatsApp} // Cambiado a openWhatsApp
              >
                <span>Contactar ahora</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* CTA Desktop - Solo visible en desktop */}
        {!isMobile && (
          <div className="navbar-cta">
            <button 
              className="cta-button"
              onClick={openWhatsApp} // Cambiado a openWhatsApp
            >
              <span>Solicitar cotización</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};