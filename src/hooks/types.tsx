// types/index.ts

export interface Servicio {
  id: number;
  icono: string;
  titulo: string;
  descripcion: string;
  caracteristicas: string[];
}

export interface Proyecto {
  id: number;
  titulo: string;
  categoria: string;
  imagen: string;
  tecnologias: string[];
  enlace?: string;
  descripcion?: string;
  estado: 'disponible' | 'proximamente';
  destacado?: boolean;
  fecha?: string;
}

export interface Skill {
  nombre: string;
  nivel: number;
  categoria: 'frontend' | 'backend' | 'devops' | 'tools';
}

export interface Experiencia {
  id: number;
  puesto: string;
  empresa: string;
  periodo: string;
  descripcion: string;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}