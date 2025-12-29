// components/Contactanos.tsx
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../style/Contactanos.css';

// Importar iconos modernos
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, 
  Send, CheckCircle, Loader2, AlertCircle,
  ChevronDown, Facebook, Instagram,
  MessageSquare, Briefcase, Store, Coffee,
  Truck, Building2, Home, Wifi
} from 'lucide-react';

// Definir tipos
interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

const initialFormData: ContactFormData = {
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
};

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
  color: string;
  delay: number;
}

interface Servicio {
  icon: React.ReactNode;
  name: string;
  desc: string;
}

interface SocialLink {
  icon: React.ReactNode;
  name: string;
  color: string;
  link: string;
}

export const Contactanos: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const maxChars = 500;
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Configuración de EmailJS - REEMPLAZA CON TUS DATOS REALES
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_rw0nokw',
    TEMPLATE_ID: 'template_tx9t3sp',
    PUBLIC_KEY: 'M6h1sjrFlj5vvxm6K'
  };

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

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
    
    if (name === 'telefono') {
      // Solo permitir números y limitar a 9 dígitos
      const numericValue = value.replace(/\D/g, '').slice(0, 9);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else if (name === 'mensaje') {
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
    
    // Limpiar errores cuando el usuario escribe
    if (error) setError(null);
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = (fieldName: string) => {
    setActiveField(null);
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const validateField = (name: keyof ContactFormData, value: string): string | null => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es requerido';
        if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) return 'El nombre solo puede contener letras y espacios';
        return null;
        
      case 'email':
        if (!value.trim()) return 'El email es requerido';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Por favor, ingresa un email válido';
        return null;
        
      case 'telefono':
        if (!value.trim()) return 'El teléfono es requerido';
        if (value.length !== 9) return 'El teléfono debe tener 9 dígitos';
        if (!/^9\d{8}$/.test(value)) return 'El teléfono debe empezar con 9';
        return null;
        
      case 'asunto':
        if (!value.trim()) return 'Por favor, selecciona un tipo de consulta';
        return null;
        
      case 'mensaje':
        if (!value.trim()) return 'El mensaje es requerido';
        if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
        if (value.trim().length > maxChars) return `El mensaje no puede exceder ${maxChars} caracteres`;
        return null;
        
      default:
        return null;
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    (Object.entries(formData) as [keyof ContactFormData, string][]).forEach(([key, value]) => {
      const fieldError = validateField(key, value);
      if (fieldError) {
        errors.push(fieldError);
      }
    });
    
    if (errors.length > 0) {
      setError(errors[0]);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Formatear teléfono para mostrar
      const telefonoFormateado = `+51 ${formData.telefono.slice(0, 3)} ${formData.telefono.slice(3, 6)} ${formData.telefono.slice(6, 9)}`;
      
      const templateParams = {
        from_name: formData.nombre.trim(),
        from_email: formData.email,
        phone: telefonoFormateado,
        subject: formData.asunto,
        message: formData.mensaje.trim(),
        to_email: 'gabrielrc6979@gmail.com',
        reply_to: formData.email,
        date: new Date().toLocaleDateString('es-PE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Enviando email con parámetros:', templateParams);

      // Enviar email usando EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('Respuesta de EmailJS:', response);

      if (response.status === 200) {
        // Éxito - solo limpiar formulario y mostrar mensaje de éxito
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData(initialFormData);
        setCharCount(0);
        setTouchedFields({});
        
        // Resetear después de 8 segundos
        setTimeout(() => {
          setIsSubmitted(false);
        }, 8000);
      } else {
        throw new Error('Error en el envío');
      }

    } catch (err: any) {
      console.error('Error enviando email:', err);
      setError('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos directamente por WhatsApp.');
      setIsSubmitting(false);
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail size={22} />,
      title: 'Correo Electrónico',
      value: 'gebrielrc6979@gmail.com',
      link: 'mailto:gebrielrc6979@gmail.com',
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
      link: '#',
      color: '#ef4444',
      delay: 0.3
    },
    {
      icon: <Clock size={22} />,
      title: 'Horario de Atención',
      value: 'Lun-Vie: 8:00 AM - 6:00 PM / Sab: 8:00 AM - 1:00 PM',
      link: '#',
      color: '#f59e0b',
      delay: 0.4
    }
  ];

  const tiposConsulta: string[] = [
    'Consulta General',
    'Soporte Técnico',
    'Cotización de Proyecto',
    'Desarrollo de Software',
    'Página Web / E-commerce',
    'Mantenimiento de Sistemas',
    'Sistema POS',
    'Control de Inventario',
    'Desarrollo de App Móvil',
    'Migración a la Nube'
  ];

  const servicios: Servicio[] = [
    { icon: <Store size={18} />, name: 'Restaurantes', desc: 'Sistemas POS y gestión' },
    { icon: <Building2 size={18} />, name: 'Boticas', desc: 'Inventario y ventas' },
    { icon: <Truck size={18} />, name: 'Lancheras', desc: 'Pedidos y delivery' },
    { icon: <Coffee size={18} />, name: 'Cafeterías', desc: 'Control de inventario' },
    { icon: <Briefcase size={18} />, name: 'Oficinas', desc: 'Sistemas administrativos' },
    { icon: <Home size={18} />, name: 'Tiendas', desc: 'Punto de venta' },
    { icon: <Wifi size={18} />, name: 'Otros', desc: 'Soluciones personalizadas' }
  ];

  const socialLinks: SocialLink[] = [
    { icon: <Facebook size={20} />, name: 'Facebook', color: '#1877F2', link: 'https://www.facebook.com/profile.php?id=61585909102748' },
    { icon: <Instagram size={20} />, name: 'Instagram', color: '#E4405F', link: '#' },
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
                      ['--channel-color' as any]: item.color
                    }}
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
                      href={social.link}
                      className="social-icon-modern"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ['--social-color' as any]: social.color }}
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
                  <h3 className="success-title">¡Consulta enviada exitosamente!</h3>
                  <p className="success-message">
                    Hemos recibido tu consulta y te contactaremos dentro de las próximas 2 horas.
                    También te hemos enviado un correo de confirmación.
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
                      Comienza tu consulta
                    </h3>
                    <p className="form-subtitle">
                      Cuéntanos sobre las necesidades de tu negocio y te ayudaremos a encontrar la mejor solución
                    </p>
                  </div>

                  {error && (
                    <div className="error-alert">
                      <AlertCircle size={20} />
                      <span>{error}</span>
                    </div>
                  )}

                  <form 
                    ref={formRef}
                    className="modern-form" 
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-grid">
                      <div className="form-group-modern">
                        <label className={`form-label-modern ${activeField === 'nombre' ? 'active' : ''}`}>
                          Nombre completo *
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            onFocus={() => handleFocus('nombre')}
                            onBlur={() => handleBlur('nombre')}
                            className={`input-modern ${touchedFields.nombre && validateField('nombre', formData.nombre) ? 'input-error' : ''}`}
                            placeholder="Ej: Juan Pérez"
                            required
                            minLength={3}
                            pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                            title="Solo letras y espacios, mínimo 3 caracteres"
                          />
                          <div className="input-border"></div>
                        </div>
                        {touchedFields.nombre && validateField('nombre', formData.nombre) && (
                          <div className="field-error">{validateField('nombre', formData.nombre)}</div>
                        )}
                      </div>

                      <div className="form-group-modern">
                        <label className={`form-label-modern ${activeField === 'email' ? 'active' : ''}`}>
                          Email *
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            className={`input-modern ${touchedFields.email && validateField('email', formData.email) ? 'input-error' : ''}`}
                            placeholder="ejemplo@negocio.pe"
                            required
                          />
                          <div className="input-border"></div>
                        </div>
                        {touchedFields.email && validateField('email', formData.email) && (
                          <div className="field-error">{validateField('email', formData.email)}</div>
                        )}
                      </div>

                      <div className="form-group-modern">
                        <label className={`form-label-modern ${activeField === 'telefono' ? 'active' : ''}`}>
                          Teléfono / WhatsApp *
                        </label>
                        <div className="input-wrapper with-prefix">
                          <div className="input-prefix">+51</div>
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            onFocus={() => handleFocus('telefono')}
                            onBlur={() => handleBlur('telefono')}
                            className={`input-modern ${touchedFields.telefono && validateField('telefono', formData.telefono) ? 'input-error' : ''}`}
                            placeholder="987654321"
                            pattern="9[0-9]{8}"
                            title="Debe empezar con 9 y tener 9 dígitos"
                            required
                            maxLength={9}
                          />
                          <div className="input-border"></div>
                        </div>
                        {touchedFields.telefono && validateField('telefono', formData.telefono) && (
                          <div className="field-error">{validateField('telefono', formData.telefono)}</div>
                        )}
                        <div className="input-hint">Ingresa 9 dígitos, empezando con 9 (ej: 987654321)</div>
                      </div>

                      <div className="form-group-modern">
                        <label className={`form-label-modern ${activeField === 'asunto' ? 'active' : ''}`}>
                          Tipo de consulta *
                        </label>
                        <div className="select-wrapper">
                          <select
                            name="asunto"
                            value={formData.asunto}
                            onChange={handleChange}
                            onFocus={() => handleFocus('asunto')}
                            onBlur={() => handleBlur('asunto')}
                            className={`select-modern ${touchedFields.asunto && validateField('asunto', formData.asunto) ? 'input-error' : ''}`}
                            required
                          >
                            <option value="">Selecciona tipo de consulta</option>
                            {tiposConsulta.map((consulta, index) => (
                              <option key={index} value={consulta}>
                                {consulta}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={20} className="select-arrow" />
                          <div className="input-border"></div>
                        </div>
                        {touchedFields.asunto && validateField('asunto', formData.asunto) && (
                          <div className="field-error">{validateField('asunto', formData.asunto)}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group-modern">
                      <label className={`form-label-modern ${activeField === 'mensaje' ? 'active' : ''}`}>
                        Descríbenos tu necesidad *
                      </label>
                      <div className="textarea-wrapper">
                        <textarea
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          onFocus={() => handleFocus('mensaje')}
                          onBlur={() => handleBlur('mensaje')}
                          className={`textarea-modern ${touchedFields.mensaje && validateField('mensaje', formData.mensaje) ? 'input-error' : ''}`}
                          placeholder="Cuéntanos sobre tu negocio, qué problemas enfrentas y qué solución estás buscando..."
                          rows={6}
                          required
                          minLength={10}
                          maxLength={maxChars}
                        />
                        <div className="textarea-border"></div>
                        <div className={`textarea-counter ${charCount > maxChars * 0.8 ? 'textarea-limit-warning' : ''} ${charCount >= maxChars ? 'textarea-limit-error' : ''}`}>
                          {charCount}/{maxChars}
                        </div>
                      </div>
                      {touchedFields.mensaje && validateField('mensaje', formData.mensaje) && (
                        <div className="field-error">{validateField('mensaje', formData.mensaje)}</div>
                      )}
                      <div className="textarea-hint">
                        Ej: "Tengo un restaurante y necesito un sistema para controlar inventario y ventas..."
                      </div>
                    </div>

                    <div className="form-footer">
                      <div className="privacy-note">
                        <input type="checkbox" id="privacy" required />
                        <label htmlFor="privacy">
                          Acepto la política de privacidad y el tratamiento de mis datos *
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
                      
                      <p className="response-time-note">
                        * Te responderemos en menos de 2 horas hábiles
                      </p>
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

export default Contactanos;