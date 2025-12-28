import { useState, useRef, useEffect, KeyboardEvent } from 'react';
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
     Datos Mejorados
  ========================= */

  const allowedQuestions = [
    {
      question: "¿Cuál es su horario de atención?",
      answer: "Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 y sábados de 10:00 a 14:00.",
      icon: "🕐"
    },
    {
      question: "¿Dónde están ubicados?",
      answer: "Estamos ubicados en Av. Principal 1234, Ciudad, País.",
      icon: "📍"
    },
    {
      question: "¿Qué servicios ofrecen?",
      answer: "Ofrecemos servicios de consultoría, desarrollo de software y soporte técnico.",
      icon: "💼"
    },
    {
      question: "¿Cómo puedo contactar con soporte?",
      answer: "Puedes contactar a soporte por teléfono, email o a través de nuestro portal web.",
      icon: "📞"
    },
    {
      question: "¿Cuál es su plan más económico?",
      answer: "Nuestro plan básico comienza en $29.99/mes.",
      icon: "💰"
    },
    {
      question: "¿Aceptan pagos con tarjeta?",
      answer: "Sí, aceptamos todas las tarjetas principales y también transferencias bancarias.",
      icon: "💳"
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

  const findBestMatch = (question: string): { question: string; answer: string; icon: string } | null => {
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
      servicios: "¿Qué servicios ofrecen?",
      contacto: "¿Cómo puedo contactar con soporte?",
      soporte: "¿Cómo puedo contactar con soporte?",
      precio: "¿Cuál es su plan más económico?",
      plan: "¿Cuál es su plan más económico?",
      pagos: "¿Aceptan pagos con tarjeta?",
      tarjeta: "¿Aceptan pagos con tarjeta?"
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
          : 'Lo siento, solo puedo responder preguntas específicas. Por favor, selecciona una de las preguntas sugeridas o pregunta sobre horarios, ubicación, servicios, contacto, precios o métodos de pago.',
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
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

                    <p>{msg.content}</p>

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
                    onKeyDown={handleKeyDown}
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
                  <span className="topics-list"> horarios, ubicación, servicios, contacto, precios</span>
                </div>
              </footer>
            </main>
          )}
        </div>
      )}
    </>
  );
}