// components/Contactanos.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { ContactFormData } from './types';
import '../style/Contactanos.css';

// Importar iconos modernos
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, 
  Send, CheckCircle, Loader2,
  ChevronDown, Facebook, Instagram,
  MessageSquare, Briefcase, Store, Coffee,
  Truck, Building2, Home, Wifi
} from 'lucide-react';

const initialFormData: ContactFormData = {
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
};

export const Contactanos: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'mensaje') {
      if (value.length <= maxChars) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        setCharCount(value.length);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData(initialFormData);
    setCharCount(0);
    
    // Resetear mensaje después de 5 segundos
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <Mail size={22} />,
      title: 'Correo Electrónico',
      value: 'gebrielrc6979gmail.com',
      link: 'mailto:gebrielrc6979gmail.com',
      color: '#3b82f6',
      delay: 0.1
    },
    {
      icon: <Phone size={22} />,
      title: 'Teléfono / WhatsApp',
      value: '+51 916 386 651',
      link: 'https://wa.me/51916386651',
      color: '#25D366',
      delay: 0.2
    },
    {
      icon: <MapPin size={22} />,
      title: 'Oficina Central',
      value: 'WEB',
      link: '',
      color: '#ef4444',
      delay: 0.3
    },
    {
      icon: <Clock size={22} />,
      title: 'Horario de Atención',
      value: 'Lun-Vie: 8:00 AM - 6:00 PM /n Sab: 8:00 AM - 1:00 PM',
      link: '#',
      color: '#f59e0b',
      delay: 0.4
    }
  ];

  const tiposConsulta = [
    'Consulta General',
    'Soporte Técnico',
    'Cotización de Proyecto',
    'Desarrollo de Software',
    'Página Web / E-commerce',
    'Mantenimiento de Sistemas'
  ];

  const servicios = [
    { icon: <Store size={18} />, name: 'Restaurantes', desc: 'Sistemas POS y gestión' },
    { icon: <Building2 size={18} />, name: 'Boticas', desc: 'Inventario y ventas' },
    { icon: <Truck size={18} />, name: 'Lancheras', desc: 'Pedidos y delivery' },
    { icon: <Coffee size={18} />, name: 'Cafeterías', desc: 'Control de inventario' },
    { icon: <Briefcase size={18} />, name: 'Oficinas', desc: 'Sistemas administrativos' },
    { icon: <Home size={18} />, name: 'Tiendas', desc: 'Punto de venta' },
    { icon: <Wifi size={18} />, name: 'Otros', desc: 'Soluciones personalizadas' }
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, name: 'Facebook', color: '#1877F2' },
    { icon: <Instagram size={20} />, name: 'Instagram', color: '#E4405F' },

  ];

  return (
    <section 
      ref={sectionRef}
      className={`contactanos-modern ${isVisible ? 'visible' : ''}`} 
      id="contactanos"
    >
      {/* Elementos de fondo decorativos */}
      <div className="background-elements">
        <div className="element element-1"></div>
        <div className="element element-2"></div>
        <div className="element element-3"></div>
        <div className="gradient-overlay"></div>
      </div>

      <div className="container-modern">
        {/* Header con animación */}
        <div className="section-header-modern">
          <div className="header-badge">
            <MessageSquare size={16} />
            <span>Contáctanos</span>
          </div>
          <h2 className="section-title-modern">
            <span className="title-line">Soluciones digitales</span>
            <span className="title-line">
              para <span className="text-gradient">tu negocio</span>
            </span>
          </h2>
          <p className="section-description-modern">
            Especialistas en transformación digital para pequeños y medianos negocios en Perú.
            Desarrollamos soluciones a medida que potencian tu crecimiento.
          </p>
        </div>

        <div className="contact-grid-modern">
          {/* Columna izquierda - Información */}
          <div className="info-column">
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">
                  
                  Conecta con nuestro equipo
                </h3>
                <p className="card-subtitle">
                  Estamos listos para ayudarte a llevar tu negocio al siguiente nivel digital
                </p>
              </div>

              <div className="contact-channels">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className={`contact-channel channel-${index + 1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      animationDelay: `${item.delay}s`,
                      '--channel-color': item.color
                    } as React.CSSProperties}
                  >
                    <div className="channel-icon" style={{ backgroundColor: `${item.color}20` }}>
                      {item.icon}
                    </div>
                    <div className="channel-content">
                      <h4>{item.title}</h4>
                      <p>{item.value}</p>
                    </div>
                    <div className="channel-arrow">
                      <ChevronDown size={16} className="rotate-90" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Servicios */}
              <div className="servicios-section">
                <h4>Ofrecemos servicios a:</h4>
                <div className="servicios-grid">
                  {servicios.map((servicio, index) => (
                    <div key={index} className="servicio-card">
                      <div className="servicio-icon">
                        {servicio.icon}
                      </div>
                      <div className="servicio-info">
                        <h5>{servicio.name}</h5>
                        <p>{servicio.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redes sociales */}
              <div className="social-section">
                <h4>Síguenos en redes</h4>
                <div className="social-icons-modern">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href="https://www.facebook.com/profile.php?id=61585909102748"
                      className="social-icon-modern"
                      style={{ '--social-color': social.color } as React.CSSProperties}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="form-column">
            <div className="form-card">
              {isSubmitted ? (
                <div className="success-card">
                  <div className="success-icon-wrapper">
                    <CheckCircle size={48} className="success-icon" />
                  </div>
                  <h3 className="success-title">¡Consulta enviada!</h3>
                  <p className="success-message">
                    Te contactaremos dentro de las próximas 2 horas para ofrecerte 
                    una solución personalizada para tu negocio.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="success-button"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h3 className="form-title">
                      <MessageCircle size={24} />
                      Comienza tu consulta (EN MANTENIMIENTO)
                    </h3>
                    <p className="form-subtitle">
                      Cuéntanos sobre las necesidades de tu negocio y te ayudaremos a encontrar la mejor solución
                    </p>
                  </div>

                  <form className="modern-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                      <div className="form-group-modern">
                        <label className={`form-label-modern ${activeField === 'nombre' ? 'active' : ''}`}>
                          Nombre completo
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            onFocus={() => handleFocus('nombre')}
                            onBlur={handleBlur}
                            className="input-modern"
                            placeholder="Ej: Juan Pérez"
                            required
                          />
                          <div className="input-border"></div>
                        </div>
                      </div>

                      <div className="form-group-modern">
                        <label className={`form-label-modern ${activeField === 'email' ? 'active' : ''}`}>
                          Email
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            className="input-modern"
                            placeholder="ejemplo@negocio.pe"
                            required
                          />
                          <div className="input-border"></div>
                        </div>
                      </div>

                      <div className="form-group-modern">
                        <label className={`form-label-modern ${activeField === 'telefono' ? 'active' : ''}`}>
                          Teléfono / WhatsApp
                        </label>
                        <div className="input-wrapper with-prefix">
                          <div className="input-prefix">+51</div>
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            onFocus={() => handleFocus('telefono')}
                            onBlur={handleBlur}
                            className="input-modern"
                            placeholder="987 654 321"
                            required
                          />
                          <div className="input-border"></div>
                        </div>
                      </div>

                      <div className="form-group-modern">
                        <label className={`form-label-modern ${activeField === 'asunto' ? 'active' : ''}`}>
                          Tipo de consulta
                        </label>
                        <div className="select-wrapper">
                          <select
                            name="asunto"
                            value={formData.asunto}
                            onChange={handleChange}
                            onFocus={() => handleFocus('asunto')}
                            onBlur={handleBlur}
                            className="select-modern"
                            required
                          >
                            <option value="">Selecciona tipo de consulta</option>
                            {tiposConsulta.map((consulta, index) => (
                              <option key={index} value={consulta.toLowerCase().replace(/\s+/g, '-')}>
                                {consulta}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={20} className="select-arrow" />
                          <div className="input-border"></div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group-modern">
                      <label className={`form-label-modern ${activeField === 'mensaje' ? 'active' : ''}`}>
                        Descríbenos tu necesidad
                      </label>
                      <div className="textarea-wrapper">
                        <textarea
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          onFocus={() => handleFocus('mensaje')}
                          onBlur={handleBlur}
                          className="textarea-modern"
                          placeholder="Cuéntanos sobre tu negocio, qué problemas enfrentas y qué solución estás buscando..."
                          rows={6}
                          required
                        />
                        <div className="textarea-border"></div>
                        <div className={`textarea-counter ${charCount > maxChars * 0.8 ? 'textarea-limit-warning' : ''} ${charCount >= maxChars ? 'textarea-limit-error' : ''}`}>
                          {charCount}/{maxChars}
                        </div>
                      </div>
                      <div className="textarea-hint">
                        Ej: "Tengo un restaurante y necesito un sistema para controlar inventario y ventas..."
                      </div>
                    </div>

                    <div className="form-footer">
                      <div className="privacy-note">
                        <input type="checkbox" id="privacy" required />
                        <label htmlFor="privacy">
                          Acepto la política de privacidad y el tratamiento de mis datos
                        </label>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="submit-button-modern"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Enviando consulta...
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Enviar consulta gratuita
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};