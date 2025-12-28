import type { Servicio } from './types';
import styles from"../style/Servicios.module.css"

const serviciosData: Servicio[] = [
  {
    id: 1,
    icono: '💻',
    titulo: 'Desarrollo Web Frontend',
    descripcion: 'Interfaces de usuario modernas, responsivas y optimizadas.',
    caracteristicas: ['React/Next.js', 'TypeScript', 'Tailwind CSS', 'Componentes reutilizables']
  },
  {
    id: 2,
    icono: '⚙️',
    titulo: 'Desarrollo Web Backend',
    descripcion: 'APIs robustas y servidores escalables para aplicaciones web.',
    caracteristicas: ['Node.js/Express', 'Bases de datos SQL/NoSQL', 'APIs REST/GraphQL', 'Autenticación JWT']
  },
  {
    id: 3,
    icono: '📱',
    titulo: 'Desarrollo Web Full Stack',
    descripcion: 'Soluciones completas integrando frontend y backend.',
    caracteristicas: ['Arquitectura MVC', 'DevOps básico', 'Despliegue continuo']
  },
  {
    id: 4,
    icono: '🔧',
    titulo: 'Mantenimiento Web',
    descripcion: 'Optimización, actualización y soporte técnico continuo.',
    caracteristicas: ['Optimización SEO', 'Mejora de rendimiento', 'Actualizaciones de seguridad', 'Backups']
  },
  {
    id: 5,
    icono: '🎨',
    titulo: 'Diseño Web UI/UX',
    descripcion: 'Diseño de interfaces centradas en la experiencia de usuario.',
    caracteristicas: ['Prototipado Figma', 'Diseño responsive', 'Accesibilidad web', 'Wireframes y mockups']
  }
];

export const Servicios = () => {
  return (
    <section className={styles.serviciosSection} id="servicios">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSubtitle}>Lo que ofrecemos</span>
          <h2 className={styles.sectionTitle}>
            Nuestros <span className={styles.highlight}>Servicios</span>
          </h2>
          <p className={styles.sectionDescription}>
            Soluciones tecnológicas integrales diseñadas para impulsar el crecimiento de tu negocio
          </p>
        </div>

        <div className={styles.serviciosGrid}>
          {serviciosData.map((servicio) => (
            <div 
              key={servicio.id} 
              className={styles.servicioCard}
            >
              <div className={styles.servicioIcon}>{servicio.icono}</div>
              <h3 className={styles.servicioTitle}>{servicio.titulo}</h3>
              <p className={styles.servicioDesc}>{servicio.descripcion}</p>
              
              <ul className={styles.servicioFeatures}>
                {servicio.caracteristicas.map((caracteristica, index) => (
                  <li key={index} className={styles.servicioFeature}>
                    <span className={styles.featureBullet}>✓</span>
                    {caracteristica}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};