import { Resume } from '../models/resume.model';

/**
 * Datos de ejemplo del currículum.
 * Reemplaza estos valores por la información real cuando esté disponible;
 * la estructura ya está tipada por la interfaz `Resume`.
 */
export const RESUME_DATA: Resume = {
  profile: {
    fullName: 'Nombre Apellido',
    role: 'Desarrollador Full Stack',
    location: 'Ciudad de México, México',
    summary:
      'Desarrollador apasionado por crear productos digitales limpios y ' +
      'escalables. Experiencia construyendo aplicaciones web modernas con ' +
      'foco en la experiencia de usuario y las buenas prácticas de ingeniería.',
    avatarUrl: 'https://placehold.co/240x240/2563eb/ffffff?text=NA',
    socials: [
      { label: 'GitHub', url: 'https://github.com/', icon: 'github' },
      { label: 'LinkedIn', url: 'https://linkedin.com/', icon: 'linkedin' },
      { label: 'correo@ejemplo.com', url: 'mailto:correo@ejemplo.com', icon: 'email' },
      { label: 'mi-sitio.dev', url: 'https://ejemplo.com', icon: 'website' },
    ],
  },
  experience: [
    {
      company: 'Tech Solutions S.A.',
      position: 'Senior Frontend Developer',
      startDate: 'Ene 2023',
      endDate: 'Presente',
      description:
        'Lidero el desarrollo de la interfaz de una plataforma SaaS usada por miles de usuarios.',
      highlights: [
        'Migré la aplicación a Angular standalone, reduciendo el bundle un 30%.',
        'Implementé un sistema de diseño reutilizable con Tailwind CSS.',
        'Mentoricé a un equipo de 4 desarrolladores junior.',
      ],
    },
    {
      company: 'Startup Innovadora',
      position: 'Full Stack Developer',
      startDate: 'Jun 2021',
      endDate: 'Dic 2022',
      description:
        'Desarrollé features de punta a punta en un producto de análisis de datos.',
      highlights: [
        'Construí APIs REST con Node.js y una base de datos PostgreSQL.',
        'Automaticé el pipeline de CI/CD reduciendo el tiempo de despliegue a la mitad.',
      ],
    },
    {
      company: 'Agencia Digital',
      position: 'Junior Web Developer',
      startDate: 'Ago 2019',
      endDate: 'May 2021',
      description: 'Creé sitios web responsivos para clientes de diversos sectores.',
      highlights: [
        'Entregué más de 20 proyectos web con alto índice de satisfacción.',
        'Optimicé el rendimiento y el SEO de los sitios entregados.',
      ],
    },
  ],
  education: [
    {
      institution: 'Universidad Nacional',
      degree: 'Ingeniería en Sistemas Computacionales',
      startDate: '2015',
      endDate: '2019',
      description:
        'Formación en desarrollo de software, algoritmos y estructuras de datos.',
    },
    {
      institution: 'Plataforma Online',
      degree: 'Certificación en Desarrollo Web Avanzado',
      startDate: '2020',
      endDate: '2020',
      description: 'Especialización en frameworks modernos y arquitecturas frontend.',
    },
  ],
  skillGroups: [
    {
      category: 'Frontend',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'RxJS', level: 75 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'REST APIs', level: 82 },
      ],
    },
    {
      category: 'Herramientas',
      skills: [
        { name: 'Git', level: 88 },
        { name: 'Docker', level: 65 },
        { name: 'CI/CD', level: 70 },
      ],
    },
  ],
  projects: [
    {
      name: 'Panel de Analítica',
      description:
        'Dashboard en tiempo real para visualizar métricas de negocio con gráficos interactivos.',
      tags: ['Angular', 'RxJS', 'Charts'],
      url: 'https://github.com/',
    },
    {
      name: 'API de Tareas',
      description:
        'Servicio REST para gestión de tareas con autenticación y roles de usuario.',
      tags: ['Node.js', 'PostgreSQL', 'JWT'],
      url: 'https://github.com/',
    },
    {
      name: 'Portafolio Personal',
      description:
        'Sitio web responsivo construido como este CV interactivo, desplegado en GitHub Pages.',
      tags: ['Angular', 'Tailwind CSS'],
      url: 'https://github.com/',
    },
  ],
};
