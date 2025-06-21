/**
 * Sistema de iconos SVG para el portfolio
 * Manejo centralizado de todos los iconos con carga optimizada
 */

// Cache para SVGs cargados
const svgCache = new Map();

// Estructura de datos de iconos
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
    email: {
      path: './assets/images/icons/contact/chat.svg',
      color: '#2196F3',
      name: 'Email',
      fallback: '💬'
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
    external: {
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
    arrow_right: {
      path: './assets/images/icons/ui/right-arrow.svg',
      color: '#666666',
      name: 'Flecha derecha',
      fallback: '→'
    },
    arrow_down: {
      path: './assets/images/icons/ui/bottom-arrow.svg',
      color: '#666666',
      name: 'Flecha abajo',
      fallback: '↓'
    },
    dark_mode: {
      path: './assets/images/icons/ui/dark-mode.svg',
      color: '#333333',
      name: 'Modo oscuro',
      fallback: '🌙'
    }
  },

  // Tecnologías organizadas por categoría
  technologies: {
    // Frontend
    frontend: {
      react: {
        path: './assets/images/technologies/frontend/react.svg',
        color: '#61DAFB',
        name: 'React',
        fallback: '⚛️'
      },
      javascript: {
        path: './assets/images/technologies/frontend/javascript.svg',
        color: '#F7DF1E',
        name: 'JavaScript',
        fallback: '🟨'
      },
      html5: {
        path: './assets/images/technologies/frontend/html5.svg',
        color: '#E34F26',
        name: 'HTML5',
        fallback: '🌐'
      },
      css3: {
        path: './assets/images/technologies/frontend/css.svg',
        color: '#1572B6',
        name: 'CSS3',
        fallback: '🎨'
      },
      bootstrap: {
        path: './assets/images/technologies/frontend/bootstrap.svg',
        color: '#7952B3',
        name: 'Bootstrap',
        fallback: '🅱️'
      },
      sass: {
        path: './assets/images/technologies/frontend/sass.svg',
        color: '#CC6699',
        name: 'Sass',
        fallback: '💅'
      },
      babel: {
        path: './assets/images/technologies/frontend/babel.svg',
        color: '#F9DC3E',
        name: 'Babel',
        fallback: '🔄'
      },
      webpack: {
        path: './assets/images/technologies/frontend/webpack.svg',
        color: '#8DD6F9',
        name: 'Webpack',
        fallback: '📦'
      },
      chartjs: {
        path: './assets/images/technologies/frontend/chartdotjs.svg',
        color: '#FF6384',
        name: 'Chart.js',
        fallback: '📊'
      },
      d3: {
        path: './assets/images/technologies/frontend/d3.svg',
        color: '#F68E56',
        name: 'D3.js',
        fallback: '📈'
      },
      reactrouter: {
        path: './assets/images/technologies/frontend/reactrouter.svg',
        color: '#CA4245',
        name: 'React Router',
        fallback: '🛤️'
      }
    },

    // Backend
    backend: {
      nodejs: {
        path: './assets/images/technologies/backend/nodedotjs.svg',
        color: '#339933',
        name: 'Node.js',
        fallback: '🟢'
      },
      express: {
        path: './assets/images/technologies/backend/express.svg',
        color: '#000000',
        name: 'Express',
        fallback: '🚂'
      },
      jwt: {
        path: './assets/images/technologies/backend/jsonwebtokens.svg',
        color: '#000000',
        name: 'JWT',
        fallback: '🔐'
      },
      bcrypt: {
        path: './assets/images/technologies/backend/bcrypt.svg',
        color: '#8B4513',
        name: 'bcrypt',
        fallback: '🔒'
      },
      nodemon: {
        path: './assets/images/technologies/backend/nodemon.svg',
        color: '#76D04B',
        name: 'Nodemon',
        fallback: '👀'
      },
      npm: {
        path: './assets/images/technologies/backend/npm.svg',
        color: '#CB3837',
        name: 'npm',
        fallback: '📦'
      }
    },

    // Databases
    database: {
      mongodb: {
        path: './assets/images/technologies/databases/mongodb.svg',
        color: '#47A248',
        name: 'MongoDB',
        fallback: '🍃'
      },
      mysql: {
        path: './assets/images/technologies/databases/mysql.svg',
        color: '#4479A1',
        name: 'MySQL',
        fallback: '🐬'
      },
      sequelize: {
        path: './assets/images/technologies/databases/sequelize.svg',
        color: '#52B0E7',
        name: 'Sequelize',
        fallback: '🔗'
      }
    },

    // DevOps
    devops: {
      docker: {
        path: './assets/images/technologies/devops/docker.svg',
        color: '#2496ED',
        name: 'Docker',
        fallback: '🐳'
      },
      firebase: {
        path: './assets/images/technologies/devops/firebase.svg',
        color: '#FFCA28',
        name: 'Firebase',
        fallback: '🔥'
      },
      heroku: {
        path: './assets/images/technologies/devops/heroku.svg',
        color: '#430098',
        name: 'Heroku',
        fallback: '☁️'
      },
      jenkins: {
        path: './assets/images/technologies/devops/jenkins.svg',
        color: '#D33833',
        name: 'Jenkins',
        fallback: '🔧'
      },
      kubernetes: {
        path: './assets/images/technologies/devops/kubernetes.svg',
        color: '#326CE5',
        name: 'Kubernetes',
        fallback: '⚙️'
      }
    },

    // Tools
    tools: {
      git: {
        path: './assets/images/technologies/tools/git.svg',
        color: '#F05032',
        name: 'Git',
        fallback: '🌿'
      },
      github: {
        path: './assets/images/technologies/tools/github.svg',
        color: '#181717',
        name: 'GitHub',
        fallback: '🐙'
      },
      vscode: {
        path: './assets/images/technologies/tools/vscode.svg',
        color: '#007ACC',
        name: 'VS Code',
        fallback: '💻'
      },
      jest: {
        path: './assets/images/technologies/tools/jest.svg',
        color: '#C21325',
        name: 'Jest',
        fallback: '🃏'
      },
      postman: {
        path: './assets/images/technologies/tools/postman.svg',
        color: '#FF6C37',
        name: 'Postman',
        fallback: '📮'
      },
      swagger: {
        path: './assets/images/technologies/tools/swagger.svg',
        color: '#85EA2D',
        name: 'Swagger',
        fallback: '📝'
      },
      bash: {
        path: './assets/images/technologies/tools/gnubash.svg',
        color: '#4EAA25',
        name: 'Bash',
        fallback: '💻'
      },
      ssh: {
        path: './assets/images/technologies/tools/ssh.svg',
        color: '#000000',
        name: 'SSH',
        fallback: '🔑'
      },
      virtualbox: {
        path: './assets/images/technologies/tools/virtualbox.svg',
        color: '#183A61',
        name: 'VirtualBox',
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
    bbk: {
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
 * Función para cargar SVG con cache y manejo de errores
 */
export async function loadSVGIcon(path, size = 24, className = '') {
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
 * Crear elemento DOM desde texto SVG
 */
function createElementFromSVG(svgText, size = 24, className = '') {
  const div = document.createElement('div');
  div.className = `icon ${className}`.trim();
  div.style.width = `${size}px`;
  div.style.height = `${size}px`;
  div.style.display = 'inline-flex';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'center';
  div.innerHTML = svgText;
  
  // Ajustar el SVG interno
  const svg = div.querySelector('svg');
  if (svg) {
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.display = 'block';
  }
  
  return div;
}

/**
 * Obtener datos de icono por categoría y nombre
 */
export function getIcon(category, name) {
  // Manejo especial para tecnologías (estructura anidada)
  if (category === 'technologies') {
    // Buscar en todas las subcategorías de tecnologías
    for (const subCategory of Object.values(ICONS_DATA.technologies)) {
      if (subCategory[name]) {
        return subCategory[name];
      }
    }
    return null;
  }
  
  return ICONS_DATA[category]?.[name] || null;
}

/**
 * Obtener datos de tecnología por nombre (búsqueda en todas las categorías)
 */
export function getTechnologyIcon(techName) {
  const normalizedName = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const [subCategory, technologies] of Object.entries(ICONS_DATA.technologies)) {
    for (const [key, tech] of Object.entries(technologies)) {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalizedTechName = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (normalizedKey === normalizedName || normalizedTechName === normalizedName) {
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
  if (category === 'technologies') {
    // Aplanar todas las tecnologías
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
 * Crear elemento de icono con carga asíncrona
 */
export function createIconElement(category, name, size = 24, className = '') {
  const iconData = getIcon(category, name);
  
  if (!iconData) {
    console.warn(`Icono no encontrado: ${category}/${name}`);
    return createFallbackIcon(size, '❓', className);
  }

  const container = document.createElement('div');
  container.className = `icon-container ${className}`.trim();
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  container.style.display = 'inline-flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  
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
          // Fallback si falla la carga
          container.innerHTML = createFallbackIcon(size, iconData.fallback || '🔧').innerHTML;
        }
      })
      .catch(error => {
        console.error(`Error creando icono ${category}/${name}:`, error);
        container.innerHTML = createFallbackIcon(size, iconData.fallback || '❌').innerHTML;
      });
  } else {
    // Fallback inmediato si no hay path
    container.innerHTML = createFallbackIcon(size, iconData.fallback || '❓').innerHTML;
  }

  return container;
}

/**
 * Crear icono de fallback con emoji
 */
function createFallbackIcon(size, emoji, className = '') {
  const container = document.createElement('div');
  container.className = `icon-fallback ${className}`.trim();
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  container.style.display = 'inline-flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.fontSize = `${size * 0.7}px`;
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
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  container.style.display = 'inline-flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';

  if (iconData?.path) {
    // Intentar cargar SVG, pero mostrar fallback inmediatamente
    container.innerHTML = createFallbackIcon(size, fallbackEmoji).innerHTML;
    
    loadSVGIcon(iconData.path, size)
      .then(svgElement => {
        if (svgElement) {
          container.innerHTML = '';
          container.appendChild(svgElement);
        }
      })
      .catch(() => {
        // Mantener fallback si falla
        console.warn(`Fallback usado para: ${category}/${name}`);
      });
  } else {
    // Solo fallback
    container.innerHTML = createFallbackIcon(size, fallbackEmoji).innerHTML;
  }

  return container;
}

/**
 * Precargar iconos críticos
 */
export async function preloadCriticalIcons() {
  const criticalIcons = [
    ['social', 'github'],
    ['social', 'linkedin'],
    ['social', 'email'],
    ['ui', 'menu'],
    ['ui', 'close'],
    ['ui', 'download']
  ];

  const loadPromises = criticalIcons.map(([category, name]) => {
    const iconData = getIcon(category, name);
    if (iconData?.path) {
      return loadSVGIcon(iconData.path, 24).catch(() => null);
    }
    return Promise.resolve(null);
  });

  try {
    await Promise.all(loadPromises);
    console.log('✅ Iconos críticos precargados');
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
    keys: Array.from(svgCache.keys())
  };
}

/**
 * Utilidades para búsqueda de iconos
 */
export const iconUtils = {
  /**
   * Buscar iconos por nombre
   */
  searchIcons: (query) => {
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
                data: tech
              });
            }
          }
        }
      } else {
        for (const [key, icon] of Object.entries(icons)) {
          if (icon.name?.toLowerCase().includes(normalizedQuery) || 
              key.toLowerCase().includes(normalizedQuery)) {
            results.push({
              category,
              key,
              name: icon.name || key,
              data: icon
            });
          }
        }
      }
    }

    return results;
  },

  /**
   * Obtener todos los iconos disponibles
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
              path: tech.path
            });
          }
        }
      } else {
        for (const [key, icon] of Object.entries(icons)) {
          allIcons.push({
            category,
            key,
            name: icon.name || key,
            color: icon.color,
            path: icon.path
          });
        }
      }
    }
    
    return allIcons;
  }
};

// Auto-precargar iconos críticos cuando se carga el módulo
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalIcons();
  });
}

// Exportar por defecto
export default ICONS_DATA;