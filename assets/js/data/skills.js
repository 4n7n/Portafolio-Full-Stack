export const skillsData = {
    frontend: [
        {
            name: 'React',
            level: 90,
            icon: 'assets/images/technologies/frontend/react.svg',
            description: 'Biblioteca de JavaScript para interfaces de usuario'
        },
        {
            name: 'Vue.js',
            level: 85,
            icon: 'assets/images/technologies/frontend/vue.svg',
            description: 'Framework progresivo de JavaScript'
        },
        {
            name: 'Angular',
            level: 75,
            icon: 'assets/images/technologies/frontend/angular.svg',
            description: 'Framework de aplicaciones web'
        },
        {
            name: 'TypeScript',
            level: 88,
            icon: 'assets/images/technologies/frontend/typescript.svg',
            description: 'Superset tipado de JavaScript'
        },
        {
            name: 'Next.js',
            level: 85,
            icon: 'assets/images/technologies/frontend/nextjs.svg',
            description: 'Framework de React para producción'
        },
        {
            name: 'Tailwind CSS',
            level: 92,
            icon: 'assets/images/technologies/frontend/tailwind.svg',
            description: 'Framework CSS utility-first'
        },
        {
            name: 'Sass/SCSS',
            level: 88,
            icon: 'assets/images/technologies/frontend/sass.svg',
            description: 'Preprocesador CSS con superpoderes'
        }
    ],
    
    backend: [
        {
            name: 'Node.js',
            level: 90,
            icon: 'assets/images/technologies/backend/nodejs.svg',
            description: 'Runtime de JavaScript del lado del servidor'
        },
        {
            name: 'Python',
            level: 85,
            icon: 'assets/images/technologies/backend/python.svg',
            description: 'Lenguaje de programación versátil'
        },
        {
            name: 'Express.js',
            level: 88,
            icon: 'assets/images/technologies/backend/express.svg',
            description: 'Framework web minimalista para Node.js'
        },
        {
            name: 'Django',
            level: 80,
            icon: 'assets/images/technologies/backend/django.svg',
            description: 'Framework web de alto nivel para Python'
        },
        {
            name: 'FastAPI',
            level: 82,
            icon: 'assets/images/technologies/backend/fastapi.svg',
            description: 'Framework moderno y rápido para APIs'
        },
        {
            name: 'Java',
            level: 75,
            icon: 'assets/images/technologies/backend/java.svg',
            description: 'Lenguaje de programación orientado a objetos'
        },
        {
            name: 'PHP',
            level: 70,
            icon: 'assets/images/technologies/backend/php.svg',
            description: 'Lenguaje de script del lado del servidor'
        }
    ],
    
    database: [
        {
            name: 'MongoDB',
            level: 88,
            icon: 'assets/images/technologies/databases/mongodb.svg',
            description: 'Base de datos NoSQL orientada a documentos'
        },
        {
            name: 'PostgreSQL',
            level: 85,
            icon: 'assets/images/technologies/databases/postgresql.svg',
            description: 'Sistema de gestión de bases de datos relacionales'
        },
        {
            name: 'MySQL',
            level: 82,
            icon: 'assets/images/technologies/databases/mysql.svg',
            description: 'Sistema de gestión de bases de datos relacionales'
        },
        {
            name: 'Redis',
            level: 78,
            icon: 'assets/images/technologies/databases/redis.svg',
            description: 'Base de datos en memoria para cache'
        },
        {
            name: 'Firebase',
            level: 80,
            icon: 'assets/images/technologies/databases/firebase.svg',
            description: 'Plataforma de desarrollo de aplicaciones'
        },
        {
            name: 'Supabase',
            level: 75,
            icon: 'assets/images/technologies/databases/supabase.svg',
            description: 'Alternativa open source a Firebase'
        }
    ],
    
    tools: [
        {
            name: 'Git',
            level: 92,
            icon: 'assets/images/technologies/tools/git.svg',
            description: 'Sistema de control de versiones distribuido'
        },
        {
            name: 'Docker',
            level: 85,
            icon: 'assets/images/technologies/tools/docker.svg',
            description: 'Plataforma de contenedores'
        },
        {
            name: 'AWS',
            level: 80,
            icon: 'assets/images/technologies/tools/aws.svg',
            description: 'Servicios de computación en la nube'
        },
        {
            name: 'Vercel',
            level: 88,
            icon: 'assets/images/technologies/tools/vercel.svg',
            description: 'Plataforma de despliegue para frontend'
        },
        {
            name: 'Webpack',
            level: 75,
            icon: 'assets/images/technologies/tools/webpack.svg',
            description: 'Bundler de módulos para JavaScript'
        },
        {
            name: 'Vite',
            level: 85,
            icon: 'assets/images/technologies/tools/vite.svg',
            description: 'Herramienta de construcción rápida'
        },
        {
            name: 'Jest',
            level: 80,
            icon: 'assets/images/technologies/tools/jest.svg',
            description: 'Framework de testing para JavaScript'
        },
        {
            name: 'Figma',
            level: 85,
            icon: 'assets/images/technologies/tools/figma.svg',
            description: 'Herramienta de diseño colaborativo'
        }
    ]
};

// Soft Skills Data
export const softSkillsData = [
    {
        name: 'Trabajo en Equipo',
        icon: 'icon-users',
        description: 'Colaboración efectiva en equipos multidisciplinarios'
    },
    {
        name: 'Resolución de Problemas',
        icon: 'icon-lightbulb',
        description: 'Análisis y solución creativa de desafíos técnicos'
    },
    {
        name: 'Gestión del Tiempo',
        icon: 'icon-clock',
        description: 'Organización y priorización eficiente de tareas'
    },
    {
        name: 'Comunicación',
        icon: 'icon-message-circle',
        description: 'Comunicación clara con stakeholders técnicos y no técnicos'
    }
];

// Certifications Data
export const certificationsData = [
    {
        title: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2024',
        image: 'assets/images/certificates/aws-cert.jpg',
        credentialId: 'AWS-SAA-123456',
        validUntil: '2027',
        skills: ['AWS', 'Cloud Architecture', 'Serverless']
    },
    {
        title: 'Google Cloud Developer',
        issuer: 'Google Cloud',
        date: '2024',
        image: 'assets/images/certificates/google-cert.jpg',
        credentialId: 'GCP-DEV-789012',
        validUntil: '2026',
        skills: ['GCP', 'Kubernetes', 'DevOps']
    }
];

// Skills Configuration
export const skillsConfig = {
    animationDelay: 100,
    progressDuration: 1500,
    observerThreshold: 0.3,
    categories: {
        frontend: {
            title: 'Frontend Development',
            icon: 'icon-code',
            color: '#3b82f6'
        },
        backend: {
            title: 'Backend Development', 
            icon: 'icon-server',
            color: '#10b981'
        },
        database: {
            title: 'Databases & Storage',
            icon: 'icon-database',
            color: '#f59e0b'
        },
        tools: {
            title: 'Tools & Others',
            icon: 'icon-tool',
            color: '#8b5cf6'
        }
    }
};