🚀 Portfolio Personal - Anthony Bonilla
Un portfolio web moderno y responsivo desarrollado con tecnologías web nativas, diseñado para mostrar habilidades, proyectos y experiencia profesional de manera elegante e interactiva.
📋 Tabla de Contenidos

Características
Tecnologías Utilizadas
Estructura del Proyecto
Instalación y Configuración
Uso
Personalización
Contribución
Licencia
Contacto

✨ Características
🎨 Diseño y UX

Diseño Responsivo: Adaptado para dispositivos móviles, tablets y desktop
Sistema de Temas: Modo claro/oscuro con transiciones suaves
Animaciones Fluidas: Scroll animations y efectos de transición modernos
Tipografía Profesional: Múltiples fuentes optimizadas (Inter, Fira Code, JetBrains Mono)

🛠️ Funcionalidades

Navegación Inteligente: Sistema de navegación dinámico y responsivo
Galería de Proyectos: Showcase interactivo de proyectos con enlaces externos
Timeline de Experiencia: Visualización cronológica de experiencia laboral
Skills Visualization: Gráficos interactivos de habilidades técnicas
Formulario de Contacto: Sistema de contacto integrado
Certificaciones: Visualización de certificados y logros académicos

🔧 Técnicas

Arquitectura Modular: Componentes reutilizables y mantenibles
Performance Optimizada: Carga rápida y eficiente de recursos
SEO Friendly: Optimizado para motores de búsqueda
Accesibilidad: Cumple con estándares de accesibilidad web

🛠️ Tecnologías Utilizadas
Frontend Core

HTML5: Estructura semántica moderna
CSS3: Flexbox, Grid, Variables CSS, Animaciones
JavaScript ES6+: Funcionalidades interactivas nativas

Herramientas y Librerías

Chart.js: Visualización de datos y habilidades
D3.js: Gráficos avanzados y manipulación de datos
Font Awesome: Iconografía profesional
Google Fonts: Tipografía web optimizada

Metodologías

BEM: Nomenclatura CSS estructurada
Mobile First: Diseño responsivo desde móvil
Progressive Enhancement: Mejora progresiva de funcionalidades

📁 Estructura del Proyecto
C:.
│   .gitignore
│   CHANGELOG.md
│   index.html
│   README.md
│   
└───assets
    ├───components
    │       about-us.html
    │       contact-info.html
    │       experience-work.html
    │       project-card.html
    │       skill-bar.html
    │       
    ├───css
    │   │   main.css
    │   │   
    │   ├───components
    │   │       about.css
    │   │       contact.css
    │   │       experience.css
    │   │       hero.css
    │   │       icons.css
    │   │       modal.css
    │   │       projects.css
    │   │       scroll-animations.css
    │   │       skills.css
    │   │       tech-showcase.css
    │   │
    │   └───utils
    │           animations.css
    │           fonts.css
    │           reset.css
    │           responsive.css
    │           themes.css
    │           variables.css
    │
    ├───docs
    │       Feature-1--foundation-setup.md
    │       Feature-10--'''-'''.md
    │       Feature-2--navigation-system.md
    │       Feature-3--hero-about-sections.md
    │       Feature-4--skills-display.md
    │       Feature-5--projects-gallery-scalable.md
    │       Feature-6--contact-final-polish.md
    │       Feature-7--theme-system-advanced.md
    │       Feature-8--scroll-animations.md
    │       Feature-9--responsive-optimization.md
    │
    ├───fonts
    │   ├───FiraCode
    │   │       FiraCode-Bold.ttf
    │   │       FiraCode-Medium.ttf
    │   │       FiraCode-Regular.ttf
    │   │
    │   ├───Inter
    │   │       Inter-Bold.ttf
    │   │       Inter-Medium.ttf
    │   │       Inter-Regular.ttf
    │   │
    │   ├───JetBrainsMono
    │   │       JetBrainsMono-Bold.ttf
    │   │       JetBrainsMonoNL-Regular.ttf
    │   │
    │   ├───Roboto
    │   │       Roboto_Condensed-Medium.ttf
    │   │       Roboto_Condensed-Regular.ttf
    │   │       Roboto_SemiCondensed-Bold.ttf
    │   │
    │   └───SquareOne
    │           Square One Bold Italic.ttf
    │           Square One Bold.ttf
    │           Square One Italic.ttf
    │           Square One.ttf
    │
    ├───images
    │   ├───certificates
    │   │       Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg
    │   │       The_Bridge.svg
    │   │
    │   ├───documents
    │   │       Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf
    │   │
    │   ├───icons
    │   │   ├───contact
    │   │   │       calendar.svg
    │   │   │       chat.svg
    │   │   │       phone.svg
    │   │   │       placeholder.svg
    │   │   │
    │   │   ├───social
    │   │   │       github.svg
    │   │   │       gmail.svg
    │   │   │       instagram.svg
    │   │   │       linkedin.svg
    │   │   │       x.svg
    │   │   │
    │   │   └───ui
    │   │           bottom-arrow.svg
    │   │           close-x.svg
    │   │           dark-mode.svg
    │   │           download-button.svg
    │   │           external-link.svg
    │   │           menu.svg
    │   │           right-arrow.svg
    │   │
    │   ├───institutions
    │   │       BBK.svg
    │   │       The_Bridge.svg
    │   │
    │   ├───profile
    │   ├───projects
    │   └───technologies
    │       ├───backend
    │       │       bcrypt.svg
    │       │       express.svg
    │       │       jsonwebtokens.svg
    │       │       nodedotjs.svg
    │       │       nodemon.svg
    │       │       npm.svg
    │       │
    │       ├───databases
    │       │       mongodb.svg
    │       │       mysql.svg
    │       │       sequelize.svg
    │       │
    │       ├───devops
    │       │       docker.svg
    │       │       firebase.svg
    │       │       heroku.svg
    │       │       jenkins.svg
    │       │       kubernetes.svg
    │       │
    │       ├───frontend
    │       │       babel.svg
    │       │       bootstrap.svg
    │       │       chartdotjs.svg
    │       │       css.svg
    │       │       d3.svg
    │       │       html5.svg
    │       │       javascript.svg
    │       │       react.svg
    │       │       reactrouter.svg
    │       │       sass.svg
    │       │       webpack.svg
    │       │
    │       └───tools
    │               git.svg
    │               github.svg
    │               gnubash.svg
    │               jest.svg
    │               postman.svg
    │               ssh.svg
    │               swagger.svg
    │               virtualbox.svg
    │               vscode.svg
    │
    └───js
        │   app.js
        │
        ├───components
        │       contact-form.js
        │       experience-timeline.js
        │       icon-helper.js
        │       progress-indicators.js
        │       scroll-animations.js
        │       skills-chart.js
        │       tech-showcase.js
        │       theme-switcher.js
        │       typing-effect.js
        │
        ├───config
        │       navigation-config.js
        │       portfolio-config.js
        │       technologies-config.js
        │
        ├───data
        │       experience.js
        │       icons-data.js
        │       projects.js
        │       skills.js
        │       testimonials.js
        │
        ├───services
        │       contact-data.js
        │       email-service.js
        │       github-api.js
        │
        └───utils
                dom-helpers.js
                form-validator.js
                notifications.js

🚀 Instalación y Configuración
Prerrequisitos

Navegador web moderno (Chrome, Firefox, Safari, Edge)
Servidor web local (opcional para desarrollo)

Instalación

Clonar el repositorio

git clone git@github.com:4n7n/Portafolio-Full-Stack.git
cd portfolio

Abrir en navegador

Directo: Abrir index.html en tu navegador
Servidor local: http://localhost:8000



🎯 Uso
Navegación

Header Navigation: Navegación principal con scroll suave a secciones
Mobile Menu: Menú hamburguesa para dispositivos móviles
Theme Toggle: Alternador de tema claro/oscuro

Secciones Principales

Hero: Presentación principal con efecto de escritura
About: Información personal y profesional
Skills: Visualización interactiva de habilidades técnicas
Experience: Timeline de experiencia laboral
Projects: Galería de proyectos con enlaces y detalles
Contact: Formulario de contacto y información

Estándares de Código

Seguir nomenclatura BEM para CSS
Usar ES6+ para JavaScript
Comentar código complejo
Mantener estructura modular

📝 Licencia
Este proyecto está bajo la Licencia MIT. Ver LICENSE para más detalles.
📞 Contacto
Anthony Bonilla

📧 Email: tu-email@ejemplo.com
💼 LinkedIn: tu-linkedin
🐱 GitHub: tu-github
🌐 Portfolio: tu-portfolio.com


🙏 Agradecimientos

Inspiración en diseños modernos de portfolio
Iconografía de Font Awesome y custom SVGs
Fuentes tipográficas de Google Fonts

📊 Estadísticas del Proyecto

![alt text](_92d2d4b2-5d0f-4ed8-b1e9-4be65b9124c6.jpeg)

