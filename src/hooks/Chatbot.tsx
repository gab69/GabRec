import { useState, useRef, useEffect } from 'react';
import '../style/Chatbot.css';
import { FiCpu } from 'react-icons/fi';
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiThumbsUp,
  FiThumbsDown,
  FiChevronUp,
  FiChevronDown,
  FiUser,
  FiHelpCircle,
  FiChevronRight
} from 'react-icons/fi';

/* =========================
   Tipos
========================= */

type Sender = 'user' | 'bot';
type Feedback = 'like' | 'dislike';

interface Message {
  id: number;
  sender: Sender;
  content: string;
  time: string;
  feedback?: Feedback;
}

/* =========================
   Componente Mejorado
========================= */

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* =========================
     Datos Mejorados con nuevas preguntas
  ========================= */

  const allowedQuestions = [
    {
      question: "¿Cuál es su horario de atención?",
      answer: "Nuestro horario de atención es de lunes a viernes de 8:00 a 18:00 y sábados de 08:00 a 13:00.",
      icon: "🕐",
      category: "general"
    },
    {
      question: "¿Dónde están ubicados?",
      answer: "Actualmente no tenemos una ubicación física, estamos en la web. Nos puede contactar por Facebook o WhatsApp.",
      icon: "📍",
      category: "general"
    },
    {
      question: "¿Qué servicios ofrecen?",
      answer: "Ofrecemos servicios de consultoría, desarrollo de software, soporte técnico, hosting, dominio y mantenimiento web.",
      icon: "💼",
      category: "servicios"
    },
    {
      question: "¿Cómo puedo contactar con soporte?",
      answer: "Puedes contactar a soporte por teléfono al 916386651, email a: gabrielrc6979@gmail.com, por Facebook en: https://www.facebook.com/profile.php?id=61585909102748 o a través de nuestro portal web.",
      icon: "📞",
      category: "general"
    },
    {
      question: "¿Cuáles son todos sus planes y precios?",
      answer: "🔹 PLAN BÁSICO – Presencia Digital\n\n💰 Desde S/ 500 – S/ 800\n\nIdeal para emprendedores y negocios pequeños.\n\n✔ Página web tipo Landing Page\n✔ Hasta 4 secciones (Inicio, Servicios, Nosotros, Contacto)\n✔ Diseño moderno y responsive (PC, tablet, celular)\n✔ Formulario de contacto (WhatsApp o correo)\n✔ Dominio y hosting (opcional)\n✔ Entrega rápida (5–7 días)\n\n🔹 PLAN PROFESIONAL – Negocio en Crecimiento\n\n💰 Desde S/ 1,200 – S/ 1,800\n\nPara empresas que buscan mayor impacto y confianza.\n\n✔ Página web corporativa\n✔ Hasta 8 secciones\n✔ Diseño personalizado\n✔ Integración con WhatsApp Business\n✔ Google Maps y redes sociales\n✔ Optimización básica SEO\n✔ Panel autoadministrable (opcional)\n✔ Entrega en 7–12 días\n\n🔹 PLAN EMPRESARIAL – Alta Presencia Online\n\n💰 Desde S/ 2,500 – S/ 4,000\n\nPara empresas consolidadas o proyectos grandes.\n\n✔ Diseño a medida\n✔ Páginas ilimitadas\n✔ Panel administrador completo\n✔ Optimización SEO avanzada\n✔ Integración con APIs / sistemas externos\n✔ Seguridad y rendimiento optimizado\n✔ Soporte técnico por 3 meses\n✔ Capacitación incluida\n\n🔹 PLAN TIENDA VIRTUAL (E-Commerce)\n\n💰 Desde S/ 2,000 – S/ 3,500\n\nPara vender productos o servicios online.\n\n✔ Catálogo de productos\n✔ Carrito de compras\n✔ Gestión de pedidos\n✔ Panel administrador\n✔ Diseño responsive\n✔ Capacitación de uso\n ❌El código fuente NO se incluye automáticamente en los planes normales de desarrollo web.",
      icon: "📋",
      category: "planes"
    },
    {
      question: "¿Ofrecen planes de mantenimiento web?",
      answer: "🔧 PLANES DE MANTENIMIENTO WEB\n\n🔹 PLAN BÁSICO – Soporte Esencial\n\n💰 S/ 100 – S/ 150 / mes\n\nIdeal para páginas informativas o landing pages.\n\n✔ Actualización de textos e imágenes (hasta 2 cambios/mes)\n✔ Copia de seguridad mensual\n✔ Revisión básica de funcionamiento\n✔ Soporte vía WhatsApp\n✔ Monitoreo básico del sitio\n\n🔹 PLAN PROFESIONAL – Mantenimiento Activo\n\n💰 S/ 200 – S/ 300 / mes\n\nPara negocios que dependen de su web.\n\n✔ Cambios de contenido (hasta 5 cambios/mes)\n✔ Copias de seguridad semanales\n✔ Optimización de rendimiento\n✔ Actualizaciones de plugins / sistema\n✔ Seguridad básica\n✔ Soporte prioritario\n✔ Reporte mensual\n\n🔹 PLAN EMPRESARIAL – Gestión Completa\n\n💰 S/ 400 – S/ 600 / mes\n\nPara empresas y tiendas virtuales.\n\n✔ Cambios ilimitados de contenido\n✔ Copias de seguridad diarias\n✔ Seguridad avanzada (firewall, antimalware)\n✔ Optimización SEO continua\n✔ Monitoreo 24/7\n✔ Corrección de errores críticos\n✔ Soporte inmediato\n✔ Reporte detallado mensual\n\n🔹 PLAN E-COMMERCE\n\n💰 S/ 500 – S/ 800 / mes\n\nExclusivo para tiendas virtuales.\n\n✔ Gestión de productos (hasta 20/mes)\n✔ Soporte en pagos y pedidos\n✔ Copias de seguridad diarias\n✔ Seguridad avanzada\n✔ Optimización de velocidad\n✔ Soporte prioritario\n✔ Reporte de ventas básico\n\n🔁 PLAN ANUAL (DESCUENTO)\n\n🎁 1 mes GRATIS contratando 12 meses\n🎁 Prioridad en soporte\n🎁 Ajustes adicionales sin costo\n\n📌 Nota importante:\nEl mantenimiento no incluye rediseños completos ni nuevas funcionalidades mayores.\nEstos se cotizan por separado.",
      icon: "🔧",
      category: "mantenimiento"
    },
    {
      question: "¿Ofrecen hosting y dominio?",
      answer: "💰 Dominio + Hosting + Configuración: S/ 300 – S/ 400",
      icon: "🌐",
      category: "hosting"
    },
    {
      question: "¿Aceptan pagos con tarjeta?",
      answer: "Aceptamos transferencias bancarias a BCP, BBVA, Yape y Plin.",
      icon: "💳",
      category: "pagos"
    }
  ];

  /* =========================
     Effects
  ========================= */

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: 'bot',
          content: '¡Hola! 👋 Soy tu asistente virtual. Puedo responder preguntas sobre nuestros servicios. Aquí tienes algunas preguntas frecuentes:',
          time: getCurrentTime()
        }
      ]);
      setShowSuggestions(true);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized, messages.length]);

  /* =========================
     Funciones Auxiliares
  ========================= */

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const findBestMatch = (question: string): { question: string; answer: string; icon: string; category: string } | null => {
    const normalized = question.trim().toLowerCase();
    
    // Buscar coincidencia exacta o parcial
    for (const q of allowedQuestions) {
      if (q.question.toLowerCase().includes(normalized) || 
          normalized.includes(q.question.toLowerCase().replace('?', ''))) {
        return q;
      }
    }
    
    // Buscar palabras clave
    const keywords: Record<string, string> = {
      horario: "¿Cuál es su horario de atención?",
      ubicado: "¿Dónde están ubicados?",
      ubicación: "¿Dónde están ubicados?",
      servicios: "¿Qué servicios ofrecen?",
      contacto: "¿Cómo puedo contactar con soporte?",
      soporte: "¿Cómo puedo contactar con soporte?",
      precio: "¿Cuáles son todos sus planes y precios?",
      plan: "¿Cuáles son todos sus planes y precios?",
      planes: "¿Cuáles son todos sus planes y precios?",
      pagos: "¿Aceptan pagos con tarjeta?",
      tarjeta: "¿Aceptan pagos con tarjeta?",
      mantenimiento: "¿Ofrecen planes de mantenimiento web?",
      mantener: "¿Ofrecen planes de mantenimiento web?",
      actualización: "¿Ofrecen planes de mantenimiento web?",
      hosting: "¿Ofrecen hosting y dominio?",
      hostinger: "¿Ofrecen hosting y dominio?",
      dominio: "¿Ofrecen hosting y dominio?",
      servidor: "¿Ofrecen hosting y dominio?",
      alojamiento: "¿Ofrecen hosting y dominio?",
      web: "¿Qué servicios ofrecen?",
      sitio: "¿Qué servicios ofrecen?",
      página: "¿Qué servicios ofrecen?"
    };

    for (const [keyword, question] of Object.entries(keywords)) {
      if (normalized.includes(keyword)) {
        return allowedQuestions.find(q => q.question === question) || null;
      }
    }

    return null;
  };

  /* =========================
     Handlers
  ========================= */

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Mensaje del usuario
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      time: getCurrentTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Buscar respuesta
    const match = findBestMatch(inputMessage);

    setTimeout(() => {
      setIsTyping(false);

      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        content: match 
          ? match.answer
          : 'Lo siento, solo puedo responder preguntas específicas. Por favor, selecciona una de las preguntas sugeridas o pregunta sobre: horarios, ubicación, servicios, contacto, planes de precios, mantenimiento web, hosting y dominio, o métodos de pago.',
        time: getCurrentTime()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Si no hay match, mostrar sugerencias de nuevo
      if (!match) {
        setTimeout(() => setShowSuggestions(true), 500);
      }
    }, 1200);
  };

  const handleSuggestionClick = (question: string) => {
    setInputMessage(question);
    // Auto-enfocar el input
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(question.length, question.length);
    }, 50);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'Escape') {
      setInputMessage('');
    }
  };

  const handleFeedback = (id: number, feedback: Feedback) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, feedback } : msg
      )
    );
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        content: '¡Hola! 👋 Soy tu asistente virtual. Puedo responder preguntas sobre nuestros servicios. Aquí tienes algunas preguntas frecuentes:',
        time: getCurrentTime()
      }
    ]);
    setShowSuggestions(true);
  };

  /* =========================
     Render
  ========================= */

  return (
    <>
      {/* Botón flotante */}
      <button
        className={`chatbot-floating-btn ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir chatbot"
        title="Chatea con nosotros"
      >
        <FiMessageSquare size={22} />
        <span className="notification-dot"></span>
      </button>

      {isOpen && (
        <div 
          className={`chatbot-wrapper ${isMinimized ? 'minimized' : ''}`}
          role="dialog"
          aria-label="Chat de asistencia"
          aria-modal="true"
        >
          {/* Header */}
          <header className="chatbot-header">
            <div className="header-left">
              <FiCpu /> 
              <span>Asistente Virtual</span>
              <span className="status-indicator" title="En línea"></span>
            </div>
            <div className="header-actions">
              <button 
                onClick={handleClearChat}
                aria-label="Limpiar conversación"
                title="Nueva conversación"
                className="clear-chat-btn"
              >
                <FiHelpCircle />
              </button>
              <button 
                onClick={() => setIsMinimized(v => !v)}
                aria-label={isMinimized ? "Maximizar chat" : "Minimizar chat"}
              >
                {isMinimized ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
              >
                <FiX />
              </button>
            </div>
          </header>

          {!isMinimized && (
            <main className="chatbot-body">
              {/* Mensajes */}
              <div className="chatbot-messages">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`message-bubble ${msg.sender}`}
                    role="article"
                    aria-label={`Mensaje de ${msg.sender === 'user' ? 'usuario' : 'asistente'}`}
                  >
                    <div className="message-header">
                      <div className="sender-info">
                        {msg.sender === 'user' ? (
                          <>
                            <FiUser />
                            <span>Tú</span>
                          </>
                        ) : (
                          <>
                            <FiCpu />
                            <span>Asistente</span>
                          </>
                        )}
                      </div>
                      <span className="message-time">{msg.time}</span>
                    </div>

                    <p className="message-content">{msg.content}</p>

                    {msg.sender === 'bot' && msg.id > 1 && (
                      <div className="feedback" role="group" aria-label="Valorar respuesta">
                        <span className="feedback-label">¿Te ayudó esta respuesta?</span>
                        <div className="feedback-buttons">
                          <button
                            onClick={() => handleFeedback(msg.id, 'like')}
                            className={msg.feedback === 'like' ? 'active' : ''}
                            aria-label="Me gusta esta respuesta"
                            aria-pressed={msg.feedback === 'like'}
                          >
                            <FiThumbsUp />
                            <span>Sí</span>
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'dislike')}
                            className={msg.feedback === 'dislike' ? 'active' : ''}
                            aria-label="No me gusta esta respuesta"
                            aria-pressed={msg.feedback === 'dislike'}
                          >
                            <FiThumbsDown />
                            <span>No</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Preguntas sugeridas */}
                {showSuggestions && messages.length <= 2 && (
                  <div className="suggestions-container" role="region" aria-label="Preguntas sugeridas">
                    <div className="suggestions-header">
                      <FiHelpCircle />
                      <span>Preguntas frecuentes:</span>
                    </div>
                    <div className="suggestions-grid">
                      {allowedQuestions.map((item, index) => (
                        <button
                          key={index}
                          className="suggestion-btn"
                          onClick={() => handleSuggestionClick(item.question)}
                          aria-label={`Preguntar: ${item.question}`}
                        >
                          <span className="suggestion-icon">{item.icon}</span>
                          <span className="suggestion-text">{item.question}</span>
                          <FiChevronRight className="suggestion-arrow" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isTyping && (
                  <div className="typing-indicator" aria-live="polite">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span>Asistente está escribiendo...</span>
                  </div>
                )}
                
                <div ref={messagesEndRef} aria-hidden="true" />
              </div>

              {/* Input area */}
              <footer className="chatbot-input-area">
                <div className="input-wrapper">
                  <input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Escribe tu pregunta aquí..."
                    aria-label="Escribe tu mensaje"
                    aria-describedby="input-help"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    aria-label="Enviar mensaje"
                    className="send-btn"
                  >
                    <FiSend />
                  </button>
                </div>
                <div id="input-help" className="input-help">
                  Pulsa Enter para enviar • Esc para cancelar
                </div>
                <div className="topics-hint">
                  <span className="hint-icon">💡</span>
                  Puedes preguntar sobre: 
                  <span className="topics-list"> horarios, ubicación, servicios, contacto, planes, mantenimiento, hosting, dominio</span>
                </div>
              </footer>
            </main>
          )}
        </div>
      )}
    </>
  );
}