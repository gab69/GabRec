// components/Footer.tsx
import React, { useEffect, useState } from 'react';
import {ArrowUp, Facebook
} from 'lucide-react';
import "../style/Foter.css"
import { BsWhatsapp } from 'react-icons/bs';

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  // Número de WhatsApp 
  const whatsappNumber = '916386651';
  
  // Mensaje predefinido para WhatsApp
  const whatsappMessage = encodeURIComponent('¡Hola! Me interesa solicitar una cotización de tus servicios. ¿Podrías proporcionarme más información?');

 
  

  const socialLinks = [
    { icon: < BsWhatsapp size={20} />, label: 'Whatsapp', href:`https://wa.me/${whatsappNumber}?text=${whatsappMessage}` , color: '#181717' },
    { icon: <Facebook size={20} />, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61585909102748', color: '#1877F2' }
  ];

  return (
    <footer className="footer-modern">
   
      <div className="container">
        {/* Sección principal del footer */}
        <div className="footer-main">
          {/* Columna 1: Logo y descripción */}
          
            <div className="footer-brand">
              <div className="footer-logo">
                
                <span className="logo-text">GabRec</span>
                <span className="logo-brackets">{'</>'}</span>
              </div>
              <p className="footer-tagline">
                Transformamos ideas complejas en software extraordinario
              </p>
              <p className="footer-description">
                Especialistas en desarrollo de software a medida para empresas 
                que buscan innovar y destacar en el mercado digital.
              </p>
            </div>

        
         

          


          {/* Columna 4: Redes sociales */}
          <div className="footer-column">
            <h3 className="footer-column-title">Conéctate con nosotros</h3>
            <p className="social-description">
              Síguenos en nuestras redes para mantenerte actualizado
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-button"
                  aria-label={social.label}
                  style={{ '--social-color': social.color } as React.CSSProperties}
                >
                  {social.icon}
                </a>
              ))}
            </div>

           
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="footer-divider"></div>

        {/* Copyright y enlaces legales */}
        <div className="footer-bottom">
          <div className="copyright-section">
            <p className="copyright">
              © {currentYear} <span className="highlight">GabReC Software</span>. 
              Todos los derechos reservados.
            </p>
            
          </div>

         
        </div>
      </div>

      {/* Botón para ir al inicio */}
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="scroll-top-button"
          aria-label="Volver al inicio"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};