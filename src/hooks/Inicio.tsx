import { useEffect, useRef, useState } from 'react';
import "../style/Inicio.css";


export const Inicio = () => {
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const words = [
    'Software a Medida',
    'Soluciones Digitales',
    'Aplicaciones Web',
    'Sistemas Inteligentes',
    'Plataformas Cloud',
    'Experiencias Digitales'
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
          setTimeout(() => setIsDeleting(true), 2000); // Pausa más larga
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

    const timer = setTimeout(typeEffect, isDeleting ? 30 : 80); // Velocidad optimizada
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

      
        
        {/* Sección derecha con visualización mejorada */}
        <div className="inicio-right">
          <div className="hero-visual">
            {/* Ventana de código interactiva */}
            <div className="code-window glass-effect">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="window-title">
                  <span className="file-icon">📁</span>
                  proyecto-cliente.tsx
                </div>
                <div className="window-actions">
                  <span className="action-icon">⚡</span>
                  <span className="status">Live Preview</span>
                </div>
              </div>
              <div className="code-content">
                <pre>
{`// Innovación + Resultados = Éxito
class SolucionDigital {
  constructor() {
    this.tecnologia = 'vanguardia';
    this.rendimiento = 'optimizado';
    this.escalabilidad = 'ilimitada';
  }

  async desarrollar(cliente) {
    const proyecto = await this.crearSolucion(cliente);
    
    return {
      ...proyecto,
      impacto: 'exponencial',
      retornoInversion: 'garantizado',
      soporte: 'prioritario'
    };
  }
}

// Tu visión + Nuestra experiencia
const tuExito = new SolucionDigital();
console.log(await tuExito.desarrollar('TuEmpresa'));`}
                </pre>
              </div>
              <div className="code-footer">
                <div className="tech-indicators">
                  <span className="tech-indicator react">⚛️ React</span>
                  <span className="tech-indicator node">🟢 Node.js</span>
                  <span className="tech-indicator docker">🐳 Docker</span>                </div>
                <div className="live-preview">
                  <span className="live-dot"></span>
                  <span>Despliegue Automático</span>
                </div>
              </div>
            </div>

                     {/* Elementos flotantes mejorados */}
            <div className="floating-card card-1">
              <div className="floating-icon">⚡</div>
              <div className="floating-content">
                <h4>Rendimiento Máximo</h4>
                <p>Optimización avanzada para cargas pesadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};