/**
 * Sistema optimizado de iconos SVG para el portfolio
 * Manejo centralizado de todos los iconos con carga optimizada
 * Incluye stack tecnológico completo con tamaños uniformes
 */

// Cache para SVGs cargados
const svgCache = new Map();

// Estructura completa de datos de iconos
export const ICONS_DATA = {
  // Iconos de redes sociales
  social: {
    github: {
      path: './assets/images/icons/social/github.svg',
      color: '#181717',
      name: 'GitHub',
      fallback: '🐙'
    },
    linkedin: {
      path: './assets/images/icons/social/linkedin.svg',
      color: '#0A66C2',
      name: 'LinkedIn',
      fallback: '💼'
    },
    twitter: {
      path: './assets/images/icons/social/x.svg',
      color: '#000000',
      name: 'X (Twitter)',
      fallback: '🐦'
    },
    instagram: {
      path: './assets/images/icons/social/instagram.svg',
      color: '#E4405F',
      name: 'Instagram',
      fallback: '📷'
    },
    gmail: {
      path: './assets/images/icons/social/gmail.svg',
      color: '#EA4335',
      name: 'Gmail',
      fallback: '📧'
    },
    email: {
      path: './assets/images/icons/social/gmail.svg',
      color: '#EA4335',
      name: 'Email',
      fallback: '📧'
    }
  },

  // Iconos de contacto
  contact: {
    phone: {
      path: './assets/images/icons/contact/phone.svg',
      color: '#4CAF50',
      name: 'Teléfono',
      fallback: '📞'
    },
    chat: {
      path: './assets/images/icons/contact/chat.svg',
      color: '#2196F3',
      name: 'Chat',
      fallback: '💬'
    },
    email: {
      path: './assets/images/icons/contact/chat.svg',
      color: '#2196F3',
      name: 'Email',
      fallback: '💬'
    },
    placeholder: {
      path: './assets/images/icons/contact/placeholder.svg',
      color: '#FF5722',
      name: 'Ubicación',
      fallback: '📍'
    },
    location: {
      path: './assets/images/icons/contact/placeholder.svg',
      color: '#FF5722',
      name: 'Ubicación',
      fallback: '📍'
    },
    calendar: {
      path: './assets/images/icons/contact/calendar.svg',
      color: '#FF9800',
      name: 'Calendario',
      fallback: '📅'
    }
  },

  // Iconos de UI
  ui: {
    download: {
      path: './assets/images/icons/ui/download-button.svg',
      color: '#4CAF50',
      name: 'Descargar',
      fallback: '⬇️'
    },
    'download-button': {
      path: './assets/images/icons/ui/download-button.svg',
      color: '#4CAF50',
      name: 'Descargar',
      fallback: '⬇️'
    },
    external: {
      path: './assets/images/icons/ui/external-link.svg',
      color: '#2196F3',
      name: 'Enlace externo',
      fallback: '🔗'
    },
    'external-link': {
      path: './assets/images/icons/ui/external-link.svg',
      color: '#2196F3',
      name: 'Enlace externo',
      fallback: '🔗'
    },
    menu: {
      path: './assets/images/icons/ui/menu.svg',
      color: '#333333',
      name: 'Menú',
      fallback: '☰'
    },
    close: {
      path: './assets/images/icons/ui/close-x.svg',
      color: '#F44336',
      name: 'Cerrar',
      fallback: '❌'
    },
    'close-x': {
      path: './assets/images/icons/ui/close-x.svg',
      color: '#F44336',
      name: 'Cerrar',
      fallback: '❌'
    },
    'right-arrow': {
      path: './assets/images/icons/ui/right-arrow.svg',
      color: '#666666',
      name: 'Flecha derecha',
      fallback: '→'
    },
    arrow_right: {
      path: './assets/images/icons/ui/right-arrow.svg',
      color: '#666666',
      name: 'Flecha derecha',
      fallback: '→'
    },
    'bottom-arrow': {
      path: './assets/images/icons/ui/bottom-arrow.svg',
      color: '#666666',
      name: 'Flecha abajo',
      fallback: '↓'
    },
    arrow_down: {
      path: './assets/images/icons/ui/bottom-arrow.svg',
      color: '#666666',
      name: 'Flecha abajo',
      fallback: '↓'
    },
    'dark-mode': {
      path: './assets/images/icons/ui/dark-mode.svg',
      color: '#333333',
      name: 'Modo oscuro',
      fallback: '🌙'
    },
    dark_mode: {
      path: './assets/images/icons/ui/dark-mode.svg',
      color: '#333333',
      name: 'Modo oscuro',
      fallback: '🌙'
    }
  },

  // Stack tecnológico completo y organizado
  technologies: {
    // Frontend Technologies
    frontend: {
      react: {
        path: './assets/images/technologies/frontend/react.svg',
        color: '#61DAFB',
        name: 'React',
        level: 90,
        fallback: '⚛️'
      },
      javascript: {
        path: './assets/images/technologies/frontend/javascript.svg',
        color: '#F7DF1E',
        name: 'JavaScript',
        level: 85,
        fallback: '🟨'
      },
      html5: {
        path: './assets/images/technologies/frontend/html5.svg',
        color: '#E34F26',
        name: 'HTML5',
        level: 95,
        fallback: '🌐'
      },
      css: {
        path: './assets/images/technologies/frontend/css.svg',
        color: '#1572B6',
        name: 'CSS3',
        level: 90,
        fallback: '🎨'
      },
      css3: {
        path: './assets/images/technologies/frontend/css.svg',
        color: '#1572B6',
        name: 'CSS3',
        level: 90,
        fallback: '🎨'
      },
      bootstrap: {
        path: './assets/images/technologies/frontend/bootstrap.svg',
        color: '#7952B3',
        name: 'Bootstrap',
        level: 80,
        fallback: '🅱️'
      },
      sass: {
        path: './assets/images/technologies/frontend/sass.svg',
        color: '#CC6699',
        name: 'Sass',
        level: 75,
        fallback: '💅'
      },
      babel: {
        path: './assets/images/technologies/frontend/babel.svg',
        color: '#F9DC3E',
        name: 'Babel',
        level: 70,
        fallback: '🔄'
      },
      webpack: {
        path: './assets/images/technologies/frontend/webpack.svg',
        color: '#8DD6F9',
        name: 'Webpack',
        level: 65,
        fallback: '📦'
      },
      chartdotjs: {
        path: './assets/images/technologies/frontend/chartdotjs.svg',
        color: '#FF6384',
        name: 'Chart.js',
        level: 75,
        fallback: '📊'
      },
      chartjs: {
        path: './assets/images/technologies/frontend/chartdotjs.svg',
        color: '#FF6384',
        name: 'Chart.js',
        level: 75,
        fallback: '📊'
      },
      d3: {
        path: './assets/images/technologies/frontend/d3.svg',
        color: '#F68E56',
        name: 'D3.js',
        level: 60,
        fallback: '📈'
      },
      reactrouter: {
        path: './assets/images/technologies/frontend/reactrouter.svg',
        color: '#CA4245',
        name: 'React Router',
        level: 80,
        fallback: '🛤️'
      }
    },

    // Backend Technologies
    backend: {
      nodedotjs: {
        path: './assets/images/technologies/backend/nodedotjs.svg',
        color: '#339933',
        name: 'Node.js',
        level: 85,
        fallback: '🟢'
      },
      nodejs: {
        path: './assets/images/technologies/backend/nodedotjs.svg',
        color: '#339933',
        name: 'Node.js',
        level: 85,
        fallback: '🟢'
      },
      express: {
        path: './assets/images/technologies/backend/express.svg',
        color: '#000000',
        name: 'Express',
        level: 80,
        fallback: '🚂'
      },
      jsonwebtokens: {
        path: './assets/images/technologies/backend/jsonwebtokens.svg',
        color: '#000000',
        name: 'JWT',
        level: 75,
        fallback: '🔐'
      },
      jwt: {
        path: './assets/images/technologies/backend/jsonwebtokens.svg',
        color: '#000000',
        name: 'JWT',
        level: 75,
        fallback: '🔐'
      },
      bcrypt: {
        path: './assets/images/technologies/backend/bcrypt.svg',
        color: '#8B4513',
        name: 'bcrypt',
        level: 70,
        fallback: '🔒'
      },
      nodemon: {
        path: './assets/images/technologies/backend/nodemon.svg',
        color: '#76D04B',
        name: 'Nodemon',
        level: 80,
        fallback: '👀'
      },
      npm: {
        path: './assets/images/technologies/backend/npm.svg',
        color: '#CB3837',
        name: 'npm',
        level: 85,
        fallback: '📦'
      }
    },

    // Database Technologies
    databases: {
      mongodb: {
        path: './assets/images/technologies/databases/mongodb.svg',
        color: '#47A248',
        name: 'MongoDB',
        level: 80,
        fallback: '🍃'
      },
      mysql: {
        path: './assets/images/technologies/databases/mysql.svg',
        color: '#4479A1',
        name: 'MySQL',
        level: 75,
        fallback: '🐬'
      },
      sequelize: {
        path: './assets/images/technologies/databases/sequelize.svg',
        color: '#52B0E7',
        name: 'Sequelize',
        level: 70,
        fallback: '🔗'
      },
      mongoose: {
        path: './assets/images/technologies/databases/mongoose.svg',
        color: '#880000',
        name: 'Mongoose',
        level: 75,
        fallback: '🦫'
      }
    },

    // DevOps Technologies
    devops: {
      docker: {
        path: './assets/images/technologies/devops/docker.svg',
        color: '#2496ED',
        name: 'Docker',
        level: 70,
        fallback: '🐳'
      },
      firebase: {
        path: './assets/images/technologies/devops/firebase.svg',
        color: '#FFCA28',
        name: 'Firebase',
        level: 65,
        fallback: '🔥'
      },
      heroku: {
        path: './assets/images/technologies/devops/heroku.svg',
        color: '#430098',
        name: 'Heroku',
        level: 75,
        fallback: '☁️'
      },
      jenkins: {
        path: './assets/images/technologies/devops/jenkins.svg',
        color: '#D33833',
        name: 'Jenkins',
        level: 60,
        fallback: '🔧'
      },
      kubernetes: {
        path: './assets/images/technologies/devops/kubernetes.svg',
        color: '#326CE5',
        name: 'Kubernetes',
        level: 55,
        fallback: '⚙️'
      }
    },

    // Development Tools
    tools: {
      git: {
        path: './assets/images/technologies/tools/git.svg',
        color: '#F05032',
        name: 'Git',
        level: 85,
        fallback: '🌿'
      },
      github: {
        path: './assets/images/technologies/tools/github.svg',
        color: '#181717',
        name: 'GitHub',
        level: 85,
        fallback: '🐙'
      },
      vscode: {
        path: './assets/images/technologies/tools/vscode.svg',
        color: '#007ACC',
        name: 'VS Code',
        level: 90,
        fallback: '💻'
      },
      jest: {
        path: './assets/images/technologies/tools/jest.svg',
        color: '#C21325',
        name: 'Jest',
        level: 70,
        fallback: '🃏'
      },
      postman: {
        path: './assets/images/technologies/tools/postman.svg',
        color: '#FF6C37',
        name: 'Postman',
        level: 80,
        fallback: '📮'
      },
      swagger: {
        path: './assets/images/technologies/tools/swagger.svg',
        color: '#85EA2D',
        name: 'Swagger',
        level: 70,
        fallback: '📝'
      },
      figma: {
        path: './assets/images/technologies/tools/figma.svg',
        color: '#F24E1E',
        name: 'Figma',
        level: 65,
        fallback: '🎨'
      },
      netlify: {
        path: './assets/images/technologies/tools/netlify.svg',
        color: '#00C7B7',
        name: 'Netlify',
        level: 70,
        fallback: '🌐'
      },
      bash: {
        path: './assets/images/technologies/tools/gnubash.svg',
        color: '#4EAA25',
        name: 'Bash',
        level: 75,
        fallback: '💻'
      },
      gnubash: {
        path: './assets/images/technologies/tools/gnubash.svg',
        color: '#4EAA25',
        name: 'Bash',
        level: 75,
        fallback: '💻'
      },
      ssh: {
        path: './assets/images/technologies/tools/ssh.svg',
        color: '#000000',
        name: 'SSH',
        level: 80,
        fallback: '🔑'
      },
      virtualbox: {
        path: './assets/images/technologies/tools/virtualbox.svg',
        color: '#183A61',
        name: 'VirtualBox',
        level: 65,
        fallback: '📦'
      }
    }
  },

  // Instituciones
  institutions: {
    thebridge: {
      path: './assets/images/institutions/The_Bridge.svg',
      color: '#FF6B35',
      name: 'The Bridge',
      fallback: '🌉'
    },
    'The_Bridge': {
      path: './assets/images/institutions/The_Bridge.svg',
      color: '#FF6B35',
      name: 'The Bridge',
      fallback: '🌉'
    },
    bbk: {
      path: './assets/images/institutions/BBK.svg',
      color: '#00A0B0',
      name: 'BBK',
      fallback: '🏛️'
    },
    'BBK': {
      path: './assets/images/institutions/BBK.svg',
      color: '#00A0B0',
      name: 'BBK',
      fallback: '🏛️'
    }
  },

  // Certificados (imágenes, no SVG)
  certificates: {
    thebridge: {
      path: './assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg',
      type: 'image',
      name: 'Certificado The Bridge',
      fallback: '🏆'
    }
  }
};

/**
 * Configuración de tamaños uniformes
 */
export const ICON_SIZES = {
  tech: {
    desktop: 28,
    tablet: 24,
    mobile: 20,
    timeline: 18,
    project: 18
  },
  social: {
    hero: 20,
    contact: 16,
    floating: 24
  },
  ui: {
    button: 16,
    hero_button: 18,
    small: 14
  }
};

/**
 * Función optimizada para cargar SVG con cache y manejo de errores
 */
export async function loadSVGIcon(path, size = 24, className = '') {
  if (!path) {
    console.warn('loadSVGIcon: path is required');
    return null;
  }

  // Verificar cache primero
  if (svgCache.has(path)) {
    const cachedSVG = svgCache.get(path);
    return createElementFromSVG(cachedSVG, size, className);
  }

  try {
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const svgText = await response.text();
    
    // Validar que es SVG válido
    if (!svgText.includes('<svg')) {
      throw new Error('El archivo no contiene SVG válido');
    }
    
    // Guardar en cache
    svgCache.set(path, svgText);
    
    return createElementFromSVG(svgText, size, className);
  } catch (error) {
    console.warn(`Error cargando SVG: ${path}`, error);
    return null;
  }
}

/**
 * Crear elemento DOM desde texto SVG con tamaños uniformes
 */
function createElementFromSVG(svgText, size = 24, className = '') {
  const div = document.createElement('div');
  div.className = `icon ${className}`.trim();
  div.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    max-width: ${size}px;
    max-height: ${size}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `;
  div.innerHTML = svgText;
  
  // Ajustar el SVG interno para tamaños uniformes
  const svg = div.querySelector('svg');
  if (svg) {
    svg.style.cssText = `
      width: 100% !important;
      height: 100% !important;
      max-width: ${size}px !important;
      max-height: ${size}px !important;
      object-fit: contain;
      display: block;
    `;
  }
  
  return div;
}

/**
 * Obtener datos de icono por categoría y nombre con aliases
 */
export function getIcon(category, name) {
  if (!category || !name) {
    console.warn('getIcon: category and name are required');
    return null;
  }

  // Normalizar nombres para búsqueda
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Manejo especial para tecnologías (estructura anidada)
  if (category === 'technologies') {
    for (const subCategory of Object.values(ICONS_DATA.technologies)) {
      // Búsqueda exacta
      if (subCategory[name]) {
        return subCategory[name];
      }
      
      // Búsqueda normalizada
      for (const [key, tech] of Object.entries(subCategory)) {
        const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normalizedKey === normalizedName) {
          return tech;
        }
      }
    }
    return null;
  }
  
  const categoryData = ICONS_DATA[category];
  if (!categoryData) return null;

  // Búsqueda exacta
  if (categoryData[name]) {
    return categoryData[name];
  }

  // Búsqueda normalizada
  for (const [key, icon] of Object.entries(categoryData)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalizedKey === normalizedName) {
      return icon;
    }
  }

  return null;
}

/**
 * Obtener datos de tecnología por nombre (búsqueda mejorada)
 */
export function getTechnologyIcon(techName) {
  if (!techName) return null;
  
  const normalizedName = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const [subCategory, technologies] of Object.entries(ICONS_DATA.technologies)) {
    for (const [key, tech] of Object.entries(technologies)) {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalizedTechName = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (normalizedKey === normalizedName || 
          normalizedTechName === normalizedName ||
          key === techName ||
          tech.name === techName) {
        return { ...tech, key, subCategory };
      }
    }
  }
  
  return null;
}

/**
 * Obtener todos los iconos de una categoría
 */
export function getCategoryIcons(category) {
  if (!category) return {};
  
  if (category === 'technologies') {
    const allTechs = {};
    for (const [subCategory, technologies] of Object.entries(ICONS_DATA.technologies)) {
      for (const [key, tech] of Object.entries(technologies)) {
        allTechs[key] = { ...tech, subCategory };
      }
    }
    return allTechs;
  }
  
  return ICONS_DATA[category] || {};
}

/**
 * Crear elemento de icono con carga asíncrona y tamaños uniformes
 */
export function createIconElement(category, name, size = 24, className = '') {
  const iconData = getIcon(category, name);
  
  if (!iconData) {
    console.warn(`Icono no encontrado: ${category}/${name}`);
    return createFallbackIcon(size, '❓', className);
  }

  const container = document.createElement('div');
  container.className = `icon-container ${className}`.trim();
  container.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    max-width: ${size}px;
    max-height: ${size}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `;
  
  // Mostrar loading inicialmente
  container.innerHTML = `<span style="font-size: ${size * 0.6}px; color: #999;">⏳</span>`;
  
  // Cargar SVG de forma asíncrona
  if (iconData.path) {
    loadSVGIcon(iconData.path, size, className)
      .then(svgElement => {
        if (svgElement) {
          container.innerHTML = '';
          container.appendChild(svgElement);
        } else {
          container.innerHTML = createFallbackIcon(size, iconData.fallback || '🔧').innerHTML;
        }
      })
      .catch(error => {
        console.error(`Error creando icono ${category}/${name}:`, error);
        container.innerHTML = createFallbackIcon(size, iconData.fallback || '❌').innerHTML;
      });
  } else {
    container.innerHTML = createFallbackIcon(size, iconData.fallback || '❓').innerHTML;
  }

  return container;
}

/**
 * Crear icono de fallback con emoji y tamaño uniforme
 */
function createFallbackIcon(size, emoji, className = '') {
  const container = document.createElement('div');
  container.className = `icon-fallback ${className}`.trim();
  container.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    max-width: ${size}px;
    max-height: ${size}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: ${size * 0.7}px;
  `;
  container.innerHTML = `<span role="img" aria-label="icono">${emoji}</span>`;
  
  return container;
}

/**
 * Crear icono síncrono con fallback inmediato
 */
export function createIconWithFallback(category, name, size = 24, customFallback = null) {
  const iconData = getIcon(category, name);
  const fallbackEmoji = customFallback || iconData?.fallback || '🔧';
  
  const container = document.createElement('div');
  container.className = 'icon-container';
  container.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    max-width: ${size}px;
    max-height: ${size}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `;

  if (iconData?.path) {
    container.innerHTML = createFallbackIcon(size, fallbackEmoji).innerHTML;
    
    loadSVGIcon(iconData.path, size)
      .then(svgElement => {
        if (svgElement) {
          container.innerHTML = '';
          container.appendChild(svgElement);
        }
      })
      .catch(() => {
        console.warn(`Fallback usado para: ${category}/${name}`);
      });
  } else {
    container.innerHTML = createFallbackIcon(size, fallbackEmoji).innerHTML;
  }

  return container;
}

/**
 * Precargar iconos críticos para mejor performance
 */
export async function preloadCriticalIcons() {
  const criticalIcons = [
    // Iconos sociales
    ['social', 'github'],
    ['social', 'linkedin'],
    ['social', 'gmail'],
    // Iconos UI críticos
    ['ui', 'menu'],
    ['ui', 'close'],
    ['ui', 'download-button'],
    ['ui', 'external-link'],
    ['ui', 'right-arrow'],
    ['ui', 'bottom-arrow'],
    // Tecnologías principales MERN
    ['technologies', 'react'],
    ['technologies', 'nodedotjs'],
    ['technologies', 'express'],
    ['technologies', 'mongodb'],
    // Contacto
    ['contact', 'phone'],
    ['contact', 'chat'],
    ['contact', 'placeholder'],
    ['contact', 'calendar']
  ];

  const loadPromises = criticalIcons.map(([category, name]) => {
    const iconData = getIcon(category, name);
    if (iconData?.path) {
      return loadSVGIcon(iconData.path, 24).catch(() => null);
    }
    return Promise.resolve(null);
  });

  try {
    const results = await Promise.all(loadPromises);
    const loaded = results.filter(Boolean).length;
    console.log(`✅ ${loaded}/${criticalIcons.length} iconos críticos precargados`);
  } catch (error) {
    console.warn('⚠️ Error precargando iconos:', error);
  }
}

/**
 * Limpiar cache de iconos
 */
export function clearIconCache() {
  svgCache.clear();
  console.log('🧹 Cache de iconos limpiado');
}

/**
 * Obtener estadísticas del cache
 */
export function getCacheStats() {
  return {
    size: svgCache.size,
    keys: Array.from(svgCache.keys()),
    memoryUsage: `~${(svgCache.size * 2)}KB` // Estimación aproximada
  };
}

/**
 * Utilidades mejoradas para búsqueda de iconos
 */
export const iconUtils = {
  /**
   * Buscar iconos por nombre
   */
  searchIcons: (query) => {
    if (!query) return [];
    
    const results = [];
    const normalizedQuery = query.toLowerCase();

    for (const [category, icons] of Object.entries(ICONS_DATA)) {
      if (category === 'technologies') {
        for (const [subCategory, techs] of Object.entries(icons)) {
          for (const [key, tech] of Object.entries(techs)) {
            if (tech.name.toLowerCase().includes(normalizedQuery) || 
                key.toLowerCase().includes(normalizedQuery)) {
              results.push({
                category: 'technologies',
                subCategory,
                key,
                name: tech.name,
                data: tech,
                level: tech.level || null
              });
            }
          }
        }
      } else {
        for (const [key, icon] of Object.entries(icons)) {
          if ((icon.name?.toLowerCase().includes(normalizedQuery) || 
              key.toLowerCase().includes(normalizedQuery)) && icon.name) {
            results.push({
              category,
              key,
              name: icon.name,
              data: icon,
              level: null
            });
          }
        }
      }
    }

    return results.sort((a, b) => {
      // Priorizar coincidencias exactas
      const aExact = a.name.toLowerCase() === normalizedQuery || a.key.toLowerCase() === normalizedQuery;
      const bExact = b.name.toLowerCase() === normalizedQuery || b.key.toLowerCase() === normalizedQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Luego por nivel (si existe)
      if (a.level && b.level) return b.level - a.level;
      if (a.level && !b.level) return -1;
      if (!a.level && b.level) return 1;
      
      // Finalmente alfabético
      return a.name.localeCompare(b.name);
    });
  },

  /**
   * Obtener todos los iconos disponibles organizados
   */
  getAllIcons: () => {
    const allIcons = [];
    
    for (const [category, icons] of Object.entries(ICONS_DATA)) {
      if (category === 'technologies') {
        for (const [subCategory, techs] of Object.entries(icons)) {
          for (const [key, tech] of Object.entries(techs)) {
            allIcons.push({
              category: 'technologies',
              subCategory,
              key,
              name: tech.name,
              color: tech.color,
              path: tech.path,
              level: tech.level || null,
              fallback: tech.fallback
            });
          }
        }
      } else {
        for (const [key, icon] of Object.entries(icons)) {
          if (icon.name) {
            allIcons.push({
              category,
              key,
              name: icon.name,
              color: icon.color,
              path: icon.path,
              level: null,
              fallback: icon.fallback
            });
          }
        }
      }
    }
    
    return allIcons;
  },

  /**
   * Obtener tecnologías por categoría con niveles
   */
  getTechByCategory: (subCategory) => {
    if (!subCategory || !ICONS_DATA.technologies[subCategory]) return [];
    
    return Object.entries(ICONS_DATA.technologies[subCategory]).map(([key, tech]) => ({
      key,
      name: tech.name,
      color: tech.color,
      path: tech.path,
      level: tech.level || 0,
      fallback: tech.fallback
    })).sort((a, b) => (b.level || 0) - (a.level || 0));
  },

  /**
   * Obtener estadísticas del stack tecnológico
   */
  getTechStats: () => {
    const stats = {
      frontend: 0,
      backend: 0,
      databases: 0,
      devops: 0,
      tools: 0,
      total: 0
    };

    for (const [subCategory, techs] of Object.entries(ICONS_DATA.technologies)) {
      const count = Object.keys(techs).length;
      stats[subCategory] = count;
      stats.total += count;
    }

    return stats;
  },

  /**
   * Obtener nivel promedio por categoría
   */
  getAverageLevels: () => {
    const averages = {};

    for (const [subCategory, techs] of Object.entries(ICONS_DATA.technologies)) {
      const levels = Object.values(techs)
        .map(tech => tech.level)
        .filter(level => level && typeof level === 'number');
      
      if (levels.length > 0) {
        averages[subCategory] = Math.round(
          levels.reduce((sum, level) => sum + level, 0) / levels.length
        );
      } else {
        averages[subCategory] = 0;
      }
    }

    return averages;
  },

  /**
   * Validar que todos los iconos tienen sus archivos
   */
  validateIconPaths: async () => {
    const results = {
      valid: [],
      invalid: [],
      total: 0
    };

    const allIcons = iconUtils.getAllIcons();
    results.total = allIcons.length;

    for (const icon of allIcons) {
      if (icon.path && !icon.path.includes('certificates')) { // Skip image files
        try {
          const response = await fetch(icon.path, { method: 'HEAD' });
          if (response.ok) {
            results.valid.push(icon);
          } else {
            results.invalid.push({ ...icon, error: `HTTP ${response.status}` });
          }
        } catch (error) {
          results.invalid.push({ ...icon, error: error.message });
        }
      }
    }

    return results;
  }
};

/**
 * Funciones de conveniencia para crear iconos específicos
 */
export const iconCreators = {
  /**
   * Crear icono social con enlace
   */
  social: (platform, url, size = 20) => {
    const iconData = getIcon('social', platform);
    if (!iconData || !url) return null;

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = `social-link ${platform}-link`;
    link.title = `Visitar ${iconData.name}`;

    const iconElement = createIconWithFallback('social', platform, size);
    if (iconElement) {
      link.appendChild(iconElement);
      return link;
    }

    return null;
  },

  /**
   * Crear icono de tecnología
   */
  tech: (techName, size = 28, showTooltip = true) => {
    const techData = getTechnologyIcon(techName);
    if (!techData) return null;

    const container = createIconWithFallback('technologies', techName, size);
    if (container && showTooltip) {
      const tooltipText = `${techData.name}${techData.level ? ` - ${techData.level}%` : ''}`;
      container.title = tooltipText;
      container.setAttribute('data-tech', techName);
      container.setAttribute('data-level', techData.level || 0);
    }

    return container;
  },

  /**
   * Crear botón con icono
   */
  button: (category, name, text = '', size = 16) => {
    const button = document.createElement('button');
    button.className = text ? 'btn btn-icon' : 'btn-icon-only';
    button.type = 'button';

    const iconElement = createIconWithFallback(category, name, size);
    if (iconElement) {
      iconElement.style.marginRight = text ? '6px' : '0';
      button.appendChild(iconElement);

      if (text) {
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        button.appendChild(textSpan);
      }

      return button;
    }

    return null;
  },

  /**
   * Crear grid de tecnologías
   */
  techGrid: (technologies, containerClass = 'tech-grid') => {
    if (!Array.isArray(technologies) || technologies.length === 0) return null;

    const grid = document.createElement('div');
    grid.className = containerClass;

    technologies.forEach(techName => {
      const techIcon = iconCreators.tech(techName, 28, true);
      if (techIcon) {
        const techData = getTechnologyIcon(techName);
        
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';
        techItem.appendChild(techIcon);

        const label = document.createElement('span');
        label.textContent = techData?.name || techName;
        label.style.cssText = `
          font-size: 11px;
          color: var(--gray-light, #e5e5e5);
          font-weight: 500;
          line-height: 1.2;
          margin-top: 6px;
        `;
        techItem.appendChild(label);

        grid.appendChild(techItem);
      }
    });

    return grid.children.length > 0 ? grid : null;
  }
};

/**
 * Sistema de temas para iconos
 */
export const iconThemes = {
  dark: {
    primary: '#ef4444',
    secondary: '#e5e5e5',
    background: 'rgba(42, 42, 42, 0.6)',
    hover: 'rgba(220, 38, 38, 0.3)'
  },
  light: {
    primary: '#dc2626',
    secondary: '#333333',
    background: 'rgba(255, 255, 255, 0.8)',
    hover: 'rgba(220, 38, 38, 0.2)'
  },

  /**
   * Aplicar tema a los iconos
   */
  apply: (theme = 'dark') => {
    const colors = iconThemes[theme] || iconThemes.dark;
    const root = document.documentElement;
    
    root.style.setProperty('--icon-primary', colors.primary);
    root.style.setProperty('--icon-secondary', colors.secondary);
    root.style.setProperty('--icon-background', colors.background);
    root.style.setProperty('--icon-hover', colors.hover);

    // Actualizar iconos existentes
    const iconContainers = document.querySelectorAll('.icon-container, .social-link');
    iconContainers.forEach(container => {
      if (container.classList.contains('social-link')) {
        container.style.background = colors.background;
        container.style.borderColor = `${colors.primary}40`;
      }
    });
  }
};

// Auto-precargar iconos críticos cuando se carga el módulo
if (typeof document !== 'undefined') {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => preloadCriticalIcons(), 100);
    });
  } else {
    setTimeout(() => preloadCriticalIcons(), 100);
  }
}

// Exportar por defecto
export default ICONS_DATA;