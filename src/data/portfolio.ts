export type Project = {
  title: string
  category: string
  service: string
  description: string
  assetFolder: string
  tags: string[]
}

export type Education = {
  degree: string
  institution: string
  years: string
  focus?: string[]
}

export const profile = {
  name: 'Hari Harsha Ummidi',
  role: 'AI-Native Developer, Designer Lead, Data Science Student',
  location: 'Visakhapatnam, India',
  intro:
    'I build futuristic digital experiences at the intersection of AI, software engineering, data science, and modern design.',
  about:
    'I am a Computer Science and Data Science student focused on AI systems, full-stack applications, developer productivity, and immersive UI/UX experiences. I like understanding technology deeply, from APIs and model workflows to computer architecture fundamentals and design systems.',
  currentRole:
    'Currently serving as Designer Lead at Skill Forge, a college technical club where I contribute to branding, creative direction, UI/UX concepts, design systems, event promotion creatives, visual storytelling, and team coordination.',
  links: [
    { label: 'GitHub', href: 'https://github.com/hariharsha26' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/hari-harsha-ummidi-9329a7382/',
    },
    { label: 'CodeChef', href: 'https://www.codechef.com/users/dynamaxgamer26' },
  ],
}

export const interests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Developer Tools',
  'Full Stack Development',
  'Computer Architecture',
  'UI/UX Design',
  'AI Coding Workflows',
  'Design Systems',
  'Data Science',
  'Prompt Engineering',
  'Future Technologies',
]

export const explorations = [
  'AI coding assistants',
  'Claude Code workflows',
  'LLM ecosystems',
  'AI APIs and billing systems',
  'model switching and optimization',
  'token systems and inference costs',
  'modern AI engineering workflows',
  'emerging technology trends',
]

export const skills = [
  {
    group: 'Programming',
    items: ['Python', 'SQL', 'Java', 'TypeScript'],
  },
  {
    group: 'Full Stack',
    items: ['React', 'Tailwind CSS', 'Vite', 'Appwrite', 'Frontend Development'],
  },
  {
    group: 'AI & Data Science',
    items: [
      'Machine Learning',
      'Data Visualization',
      'Power BI',
      'Excel',
      'Data Cleaning',
      'Deep Learning Basics',
    ],
  },
  {
    group: 'AI Ecosystem',
    items: [
      'Claude Code',
      'AI Coding Assistants',
      'APIs',
      'Prompt Engineering',
      'LLM Workflows',
      'Tokens & Billing Systems',
      'AI Tooling',
      'Model Switching Concepts',
    ],
  },
  {
    group: 'Tools',
    items: ['Git', 'GitHub', 'MySQL', 'Power BI', 'VS Code'],
  },
]

export const projects: Project[] = [
  {
    title: 'SnapToSolve',
    category: 'Civic AI Platform',
    service: 'AI Diagnostics, Reporting, Community Impact',
    description:
      'AI-powered civic engagement platform that lets users identify, report, and solve community infrastructure problems by capturing a photo, then receiving diagnostic results, resolution guides, report tracking, and contribution rewards.',
    assetFolder: 'snaptosolve',
    tags: ['Civic Tech', 'AI Diagnostics', 'Issue Tracking'],
  },
  {
    title: 'PromptShield',
    category: 'AI Security',
    service: 'Hackathon Prototype',
    description:
      'Prompt injection firewall concept built during a hackathon to explore AI safety, intelligent filtering, and secure LLM workflows.',
    assetFolder: 'promptshield',
    tags: ['AI Safety', 'Prompt Injection', 'Security'],
  },
  {
    title: 'Fruit Image Classification',
    category: 'Deep Learning',
    service: 'MobileNetV2, Transfer Learning',
    description:
      'Image classification system using transfer learning with preprocessing, augmentation, fine-tuning, and optimization to improve accuracy and reduce overfitting.',
    assetFolder: 'fruit-classification',
    tags: ['Computer Vision', 'MobileNetV2', 'Model Tuning'],
  },
]

export const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science & Engineering (Data Science)',
    institution: "Vignan's Institute of Information Technology",
    years: '2025 - 2028',
    focus: [
      'Data Science',
      'AI & Machine Learning',
      'Software Development',
      'Programming',
      'Problem Solving',
      'Data Analytics',
    ],
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'Sai Ganapathi Engineering College',
    years: '2022 - 2025',
  },
]

export const achievements = [
  'Shortlisted for the Google Ambassador Program, awaiting final response',
  'Designer Lead at Skill Forge',
  'Active participant in hackathons and technical events',
  'Built multiple AI and full-stack projects',
  'Regularly explores AI tools and developer ecosystems',
  'Active GitHub contributor',
  'Competitive programming learner on CodeChef',
  'Passionate about learning future technologies deeply',
]

export const certifications = [
  'Cisco Networking Academy - Programming & Networking Fundamentals',
  'IBM SkillsBuild - Artificial Intelligence Fundamentals',
  'IBM SkillsBuild - Customer Engagement: Communication and Personality Dynamics',
  'IBM SkillsBuild - Customer Engagement: Problem Solving and Process Controls',
]

export const workStyle = [
  'Curious learner',
  'Analytical thinker',
  'Creative problem solver',
  'Team collaborator',
  'Design-oriented developer',
  'Technology enthusiast',
  'Startup-minded builder',
]
