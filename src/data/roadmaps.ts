export interface RoadmapItem {
  id: string;
  title: string;
  category: 'Web Dev' | 'App Dev' | 'Cloud & DevOps' | 'AI & ML' | 'Data Analytics' | 'Business & Product' | 'Security & Testing';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  keyMilestones: string[];
  redirectUrl: string;
  iconName: string;
  popular: boolean;
}

export const CAREER_ROADMAPS: RoadmapItem[] = [
  {
    id: 'web-frontend',
    title: 'Frontend Web Developer',
    category: 'Web Dev',
    level: 'Beginner',
    duration: '3 - 6 Months',
    description: 'Step-by-step path to master HTML5, CSS3, JavaScript, React, Next.js, Tailwind CSS and modern web performance.',
    keyMilestones: ['HTML/CSS Basics & Flexbox', 'JavaScript ES6+ & DOM', 'Git & GitHub', 'React.js & Hooks', 'Tailwind CSS', 'Next.js & SSR'],
    redirectUrl: 'https://roadmap.sh/frontend',
    iconName: 'Code',
    popular: true
  },
  {
    id: 'web-backend',
    title: 'Backend Web Developer',
    category: 'Web Dev',
    level: 'Intermediate',
    duration: '4 - 6 Months',
    description: 'Master Node.js, Express, Python, PostgreSQL, REST APIs, Microservices, Caching, and Server Security.',
    keyMilestones: ['Node.js & Express', 'Relational DBs (PostgreSQL)', 'NoSQL (MongoDB)', 'REST & GraphQL APIs', 'JWT Auth & Security', 'Docker & Deployment'],
    redirectUrl: 'https://roadmap.sh/backend',
    iconName: 'Server',
    popular: true
  },
  {
    id: 'web-fullstack',
    title: 'Full Stack Web Developer',
    category: 'Web Dev',
    level: 'Intermediate',
    duration: '6 - 8 Months',
    description: 'Complete MERN/PERN stack path covering client interfaces, server logic, database management, and cloud hosting.',
    keyMilestones: ['Frontend Fundamentals', 'React / Next.js', 'Node.js Backend', 'PostgreSQL / MongoDB', 'CI/CD Pipelines', 'System Architecture'],
    redirectUrl: 'https://roadmap.sh/full-stack',
    iconName: 'Layers',
    popular: true
  },
  {
    id: 'app-android',
    title: 'Android App Developer',
    category: 'App Dev',
    level: 'Beginner',
    duration: '4 - 6 Months',
    description: 'Build native Android apps using Kotlin, Jetpack Compose, MVVM architecture, Retrofit, and Google Play Store publishing.',
    keyMilestones: ['Kotlin Programming', 'Android Studio IDE', 'Jetpack Compose UI', 'MVVM Architecture', 'Retrofit & REST APIs', 'Play Store Publishing'],
    redirectUrl: 'https://roadmap.sh/android',
    iconName: 'Smartphone',
    popular: true
  },
  {
    id: 'app-flutter',
    title: 'Flutter / Cross-Platform App Dev',
    category: 'App Dev',
    level: 'Beginner',
    duration: '3 - 5 Months',
    description: 'Create high-performance iOS and Android apps from a single codebase using Dart, Flutter, State Management, and Firebase.',
    keyMilestones: ['Dart Language', 'Flutter Widgets & Layouts', 'Provider / Riverpod / Bloc', 'Firebase Integration', 'Native Device APIs', 'App Store & Play Store Release'],
    redirectUrl: 'https://roadmap.sh/flutter',
    iconName: 'Smartphone',
    popular: true
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer (AWS & Azure)',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    duration: '5 - 7 Months',
    description: 'Master Amazon Web Services (AWS), Cloud Networking, IAM, S3, EC2, Kubernetes, and Infrastructure as Code (Terraform).',
    keyMilestones: ['Networking & Linux CLI', 'AWS IAM & Core Services', 'EC2, S3 & CloudFront', 'Docker Containers', 'Terraform Infrastructure', 'Cloud Security'],
    redirectUrl: 'https://roadmap.sh/aws',
    iconName: 'Cloud',
    popular: true
  },
  {
    id: 'devops-engineer',
    title: 'DevOps & CI/CD Engineer',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    duration: '6 - 9 Months',
    description: 'Automate software delivery pipelines using Linux, Shell Scripting, Docker, Kubernetes, Jenkins, Ansible, and Prometheus.',
    keyMilestones: ['Linux Administration', 'Git Branching Strategies', 'Docker & Containerization', 'Kubernetes Orchestration', 'CI/CD Pipelines (GitHub Actions)', 'Monitoring & Observability'],
    redirectUrl: 'https://roadmap.sh/devops',
    iconName: 'Terminal',
    popular: true
  },
  {
    id: 'ai-engineer',
    title: 'AI & Generative AI Engineer',
    category: 'AI & ML',
    level: 'Intermediate',
    duration: '6 - 8 Months',
    description: 'Build AI applications with Python, PyTorch, OpenAI APIs, LangChain, LlamaIndex, Vector Databases, and RAG Architecture.',
    keyMilestones: ['Python & Math Fundamentals', 'Machine Learning Essentials', 'Deep Learning & PyTorch', 'Large Language Models (LLMs)', 'LangChain & RAG Framework', 'Vector Databases (Pinecone/Chroma)'],
    redirectUrl: 'https://roadmap.sh/ai-data-scientist',
    iconName: 'Cpu',
    popular: true
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst Specialist',
    category: 'Data Analytics',
    level: 'Beginner',
    duration: '3 - 5 Months',
    description: 'Transform raw data into actionable business insights using SQL, Excel, Python (Pandas/NumPy), Power BI, and Tableau.',
    keyMilestones: ['Advanced Excel & Formulas', 'SQL Queries & Joins', 'Data Cleaning with Python', 'Pandas & Matplotlib', 'Power BI Dashboarding', 'Business Storytelling'],
    redirectUrl: 'https://roadmap.sh/data-analyst',
    iconName: 'BarChart3',
    popular: true
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst (BA)',
    category: 'Business & Product',
    level: 'Beginner',
    duration: '3 - 5 Months',
    description: 'Bridge business needs and technical solutions using Agile/Scrum, Requirements Gathering, JIRA, SQL, and Process Mapping.',
    keyMilestones: ['Requirements Elicitation', 'Agile & Scrum Frameworks', 'JIRA & Confluence', 'UML Diagrams & BPMN', 'SQL Data Analysis', 'Stakeholder Management'],
    redirectUrl: 'https://roadmap.sh/business-analyst',
    iconName: 'Briefcase',
    popular: true
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security & Ethical Hacking',
    category: 'Security & Testing',
    level: 'Intermediate',
    duration: '6 - 9 Months',
    description: 'Protect systems and networks against cyber threats. Master Linux, Networking, Wireshark, OWASP Top 10, and Penetration Testing.',
    keyMilestones: ['Networking Protocols (TCP/IP)', 'Linux Security & Scripting', 'Ethical Hacking Tools (Burp Suite)', 'OWASP Top 10 Vulnerabilities', 'Penetration Testing Methods', 'Incident Response'],
    redirectUrl: 'https://roadmap.sh/cyber-security',
    iconName: 'Shield',
    popular: false
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Designer',
    category: 'Business & Product',
    level: 'Beginner',
    duration: '3 - 5 Months',
    description: 'Design intuitive digital experiences using User Research, Wireframing, Figma, Prototyping, Usability Testing, and Design Systems.',
    keyMilestones: ['User Research & Personas', 'Information Architecture', 'Wireframing & Low-Fi Mocks', 'Figma Mastery', 'Design Systems & Tokens', 'High-Fi Prototyping'],
    redirectUrl: 'https://roadmap.sh/ux-design',
    iconName: 'Palette',
    popular: false
  }
];
