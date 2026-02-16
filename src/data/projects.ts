export interface Project {
  id: number
  name: string
  folder: string
  imagesCount: number
  category: 'web' | 'mobile' | 'branding'
  description: string
}

export const projects: Project[] = [
  { id: 1, name: 'Buddy', folder: 'buddy', imagesCount: 3, category: 'web', description: 'Plataforma web de adopción de mascotas' },
  { id: 2, name: 'Chelo Desktop', folder: 'chelo_desktop', imagesCount: 3, category: 'web', description: 'Plataforma web de gestión' },
  { id: 3, name: 'Chelo Mobile', folder: 'chelo_mobile', imagesCount: 3, category: 'mobile', description: 'Versión móvil de Chelo' },
  { id: 4, name: 'Contratando Personal', folder: 'contratando_personal', imagesCount: 2, category: 'web', description: 'Portal de reclutamiento' },
  { id: 5, name: 'Educa2', folder: 'educa2', imagesCount: 3, category: 'web', description: 'Plataforma educativa digital' },
  { id: 6, name: 'OJC', folder: 'ojc', imagesCount: 3, category: 'web', description: 'Sitio web corporativo' },
  { id: 7, name: 'Oxford App', folder: 'oxford_app', imagesCount: 3, category: 'mobile', description: 'Aplicación educativa Oxford' },
  { id: 8, name: 'Oxford en Línea', folder: 'oxford_en_linea', imagesCount: 3, category: 'web', description: 'Plataforma de aprendizaje en línea' },
  { id: 9, name: 'Oxford SRE', folder: 'oxford_sre', imagesCount: 3, category: 'web', description: 'Sistema de registro estudiantil' },
  { id: 10, name: 'Oxford SRE App', folder: 'oxford_sre_app', imagesCount: 3, category: 'mobile', description: 'App del sistema de registro' },
  { id: 11, name: 'Punicorp', folder: 'punicorp', imagesCount: 3, category: 'web', description: 'Sitio web corporativo' },
  { id: 12, name: 'QRWoof App', folder: 'qrwoof_app', imagesCount: 2, category: 'mobile', description: 'App de identificación de mascotas' },
  { id: 13, name: 'QRWoof Desktop', folder: 'qrwoof_desktop', imagesCount: 3, category: 'web', description: 'Plataforma web QRWoof' },
  { id: 14, name: 'Restaurante', folder: 'restaurante', imagesCount: 3, category: 'web', description: 'Menú digital para restaurante' },
  { id: 15, name: 'Saon App v1', folder: 'saon_app_1', imagesCount: 3, category: 'mobile', description: 'Primera versión de Saon' },
  { id: 16, name: 'Saon App v2', folder: 'saon_app_2', imagesCount: 3, category: 'mobile', description: 'Rediseño de Saon' },
  { id: 17, name: 'Saon Web', folder: 'saon_web', imagesCount: 3, category: 'web', description: 'Landing page de Saon' },
  { id: 18, name: 'Sermadre App', folder: 'sermadre_app', imagesCount: 3, category: 'mobile', description: 'Aplicación para madres' },
]
