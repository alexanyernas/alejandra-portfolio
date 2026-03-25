export interface Project {
  id: number
  name: string
  folder: string
  imagesCount: number
  category: 'web' | 'mobile' | 'branding'
  description: string
  relatedGroup?: string
  featured?: boolean
}

export const projects: Project[] = [
  // ── Destacados ────────────────────────────────────────────────────────────
  { id: 1,  name: 'App de Envíos',                folder: 'app_envios',           imagesCount: 15, category: 'mobile', description: 'Aplicación móvil para gestión de envíos',                        featured: true },
  { id: 2,  name: 'Monitoreo de Dispositivos IoT', folder: 'monitoreo_iot',       imagesCount: 9,  category: 'mobile', description: 'App de monitoreo en tiempo real de dispositivos IoT',             featured: true },
  { id: 3,  name: 'Sermadre App',                 folder: 'sermadre_app',         imagesCount: 3,  category: 'mobile', description: 'Aplicación para madres',                                          featured: true },

  { id: 4,  name: 'Capazítate',                  folder: 'capazitate',           imagesCount: 9,  category: 'web',    description: 'Plataforma de capacitación y aprendizaje en línea',      featured: true },

  // ── Grupo Oxford ──────────────────────────────────────────────────────────
  { id: 5,  name: 'Oxford App',       folder: 'oxford_app',       imagesCount: 3,  category: 'mobile', description: 'Aplicación educativa Oxford',          relatedGroup: 'oxford' },
  { id: 6,  name: 'Oxford SRE App',   folder: 'oxford_sre_app',   imagesCount: 3,  category: 'mobile', description: 'App del sistema de registro',           relatedGroup: 'oxford' },
  { id: 7,  name: 'Oxford en Línea',  folder: 'oxford_en_linea',  imagesCount: 3,  category: 'web',    description: 'Plataforma de aprendizaje en línea',    relatedGroup: 'oxford' },
  { id: 8,  name: 'Oxford SRE',       folder: 'oxford_sre',       imagesCount: 3,  category: 'web',    description: 'Sistema de registro estudiantil',       relatedGroup: 'oxford' },

  // ── Grupo Chelo ───────────────────────────────────────────────────────────
  { id: 9,  name: 'Chelo Mobile',     folder: 'chelo_mobile',     imagesCount: 3,  category: 'mobile', description: 'Versión móvil de Chelo',                relatedGroup: 'chelo' },
  { id: 10, name: 'Chelo Desktop',    folder: 'chelo_desktop',    imagesCount: 3,  category: 'web',    description: 'Plataforma web de gestión',             relatedGroup: 'chelo' },

  // ── Grupo QRWoof ──────────────────────────────────────────────────────────
  { id: 11, name: 'QRWoof App',       folder: 'qrwoof_app',       imagesCount: 2,  category: 'mobile', description: 'App de identificación de mascotas',     relatedGroup: 'qrwoof' },
  { id: 12, name: 'QRWoof Desktop',   folder: 'qrwoof_desktop',   imagesCount: 3,  category: 'web',    description: 'Plataforma web QRWoof',                 relatedGroup: 'qrwoof' },

  // ── Grupo Saon ────────────────────────────────────────────────────────────
  { id: 13, name: 'Saon App v1',      folder: 'saon_app_1',       imagesCount: 3,  category: 'mobile', description: 'Primera versión de Saon',               relatedGroup: 'saon' },
  { id: 14, name: 'Saon App v2',      folder: 'saon_app_2',       imagesCount: 3,  category: 'mobile', description: 'Rediseño de Saon',                      relatedGroup: 'saon' },
  { id: 15, name: 'Saon Web',         folder: 'saon_web',         imagesCount: 3,  category: 'web',    description: 'Landing page de Saon',                  relatedGroup: 'saon' },

  // ── Grupo Bienes Raíces ───────────────────────────────────────────────────
  { id: 16, name: 'App de Bienes Raíces',   folder: 'app_bienes_raices',   imagesCount: 6,  category: 'mobile', description: 'App móvil para búsqueda de propiedades',           relatedGroup: 'bienes-raices' },
  { id: 17, name: 'Admin de Bienes Raíces', folder: 'admin_bienes_raices', imagesCount: 4,  category: 'web',    description: 'Panel de administración inmobiliaria',              relatedGroup: 'bienes-raices' },

  // ── Grupo Insumos en Barcos ───────────────────────────────────────────────
  { id: 18, name: 'ChatBot de Proveedores para Insumos en Barcos', folder: 'chatbot_proveedor_insumos_barcos', imagesCount: 9,  category: 'mobile', description: 'ChatBot móvil para proveedores de insumos navales',   relatedGroup: 'insumos-barcos' },
  { id: 19, name: 'Chat de Insumos en Barcos',                     folder: 'chat_insumos_barcos',             imagesCount: 4,  category: 'web',    description: 'Sistema de chat para gestión de insumos navales',    relatedGroup: 'insumos-barcos' },
  { id: 20, name: 'Entrenador de ChatBot para Proveedores',        folder: 'entrenador_chatbot',              imagesCount: 4,  category: 'web',    description: 'Herramienta de entrenamiento para ChatBot',          relatedGroup: 'insumos-barcos' },
  { id: 21, name: 'Sistema de Insumos en Barcos',                  folder: 'sistema_insumos_barcos',          imagesCount: 6,  category: 'web',    description: 'Plataforma de gestión de insumos para embarcaciones', relatedGroup: 'insumos-barcos' },

  // ── Web standalone ────────────────────────────────────────────────────────
  { id: 22, name: 'Buddy',                       folder: 'buddy',                imagesCount: 3,  category: 'web',    description: 'Plataforma web de adopción de mascotas' },
  { id: 23, name: 'Contratando Personal',        folder: 'contratando_personal', imagesCount: 2,  category: 'web',    description: 'Portal de reclutamiento' },
  { id: 24, name: 'Educa2',                      folder: 'educa2',               imagesCount: 3,  category: 'web',    description: 'Plataforma educativa digital' },
  { id: 25, name: 'Efectividad de Trabajadores', folder: 'efectividad_trabajadores', imagesCount: 6, category: 'web', description: 'Panel de seguimiento de rendimiento laboral' },
  { id: 26, name: 'Grupos de Extensión UCV',     folder: 'grupos_extension',     imagesCount: 6,  category: 'web',    description: 'Gestión de grupos de extensión universitaria' },
  { id: 27, name: 'Imajin',                      folder: 'imajin',               imagesCount: 8,  category: 'web',    description: 'Plataforma web creativa para generación de imágenes' },
  { id: 28, name: 'OJC',                         folder: 'ojc',                  imagesCount: 3,  category: 'web',    description: 'Sitio web corporativo' },
  { id: 29, name: 'Punicorp',                    folder: 'punicorp',             imagesCount: 3,  category: 'web',    description: 'Sitio web corporativo' },
  { id: 30, name: 'Registro de Ventas',          folder: 'registro_de_ventas',   imagesCount: 5,  category: 'web',    description: 'Sistema de registro y control de ventas' },
  { id: 31, name: 'Restaurante',                 folder: 'restaurante',          imagesCount: 3,  category: 'web',    description: 'Menú digital para restaurante' },
  { id: 32, name: 'TOTC',                        folder: 'totc',                 imagesCount: 4,  category: 'web',    description: 'Plataforma web para gestión de contenido' },
]
