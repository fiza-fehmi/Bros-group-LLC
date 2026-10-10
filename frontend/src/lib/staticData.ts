import { JobItem, TeamMemberItem, GalleryItemData } from '@/types';

export const STATIC_JOBS: JobItem[] = [
  {
    _id: 'job-1',
    title: 'Senior Enterprise AI & LLM Systems Engineer',
    department: 'Engineering',
    locationType: 'Hybrid',
    type: 'Full-time',
    skills: ['Python', 'TypeScript', 'LangChain', 'PyTorch', 'Vector DBs', 'RAG Architecture'],
    description: 'Lead the architecture and production deployment of autonomous AI agents, RAG pipelines, and multi-tenant LLM enterprise integrations.',
    requirements: [
      '5+ years of software engineering experience with 2+ years building production AI/ML applications.',
      'Extensive experience with OpenAI APIs, Anthropic Claude, custom fine-tuning, and vector databases (Pinecone, Qdrant).',
      'Strong background in distributed backend microservices and high-throughput API gateways.'
    ]
  },
  {
    _id: 'job-2',
    title: 'Lead Full-Stack Web3 & Cloud Architect',
    department: 'Engineering',
    locationType: 'Remote',
    type: 'Full-time',
    skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Smart Contracts'],
    description: 'Design and scale cloud-native web applications, distributed APIs, and resilient enterprise SaaS architectures.',
    requirements: [
      '6+ years of full-stack development experience using React, Next.js, Node.js, and TypeScript.',
      'Proven track record of architecting scalable AWS/GCP cloud environments with CI/CD automation.',
      'Solid expertise in database optimization, security compliance, and REST/GraphQL APIs.'
    ]
  },
  {
    _id: 'job-3',
    title: 'Principal Product UI/UX Designer',
    department: 'Design',
    locationType: 'Hybrid',
    type: 'Full-time',
    skills: ['Figma', 'Design Systems', 'Micro-Animations', 'User Research', 'Prototyping'],
    description: 'Craft world-class visual interfaces, design systems, and fluid user experiences for our enterprise products and client platforms.',
    requirements: [
      '4+ years experience designing complex web and mobile product interfaces.',
      'Mastery of Figma, interactive prototyping, micro-animations, and responsive design systems.',
      'Strong portfolio demonstrating high aesthetic standards and user-centric problem solving.'
    ]
  },
  {
    _id: 'job-4',
    title: 'Growth Marketing & Strategic Partnerships Manager',
    department: 'Marketing',
    locationType: 'On-Site',
    type: 'Full-time',
    skills: ['B2B Marketing', 'Growth Hacking', 'SEO', 'Lead Generation', 'Strategic Sales'],
    description: 'Drive strategic lead generation, international brand campaigns, corporate partnerships, and digital growth marketing initiatives.',
    requirements: [
      '3+ years experience in B2B technology growth marketing and enterprise outreach.',
      'Data-driven mindset with experience in SEO, performance marketing, content strategy, and sales funnels.',
      'Excellent verbal and written communication skills for partner and client alignment.'
    ]
  },
  {
    _id: 'job-5',
    title: 'Senior Graphic & Brand Identity Designer',
    department: 'Design',
    locationType: 'Hybrid',
    type: 'Full-time',
    skills: ['Graphic Design', 'Figma', 'Adobe Photoshop', 'Illustrator', 'Branding', 'Vector Art'],
    description: 'Create compelling visual assets, corporate brand identities, marketing collaterals, motion graphics, and digital media for Bros Group LLC and enterprise clients.',
    requirements: [
      '3+ years of professional graphic design and brand identity experience.',
      'Expert proficiency in Adobe Creative Cloud (Photoshop, Illustrator, InDesign) and Figma.',
      'Strong creative portfolio showcasing typography, layout, branding, and digital media design.'
    ]
  }
];

export const STATIC_TEAM: TeamMemberItem[] = [
  {
    _id: 'team-1',
    name: 'Muhammad Ali Zaheer',
    role: 'Chief Executive Officer (CEO)',
    department: 'Executive Leadership',
    tier: 'Tier 1: Executive Leadership',
    photoUrl: '/images/muhammad-ali.jpg',
    bio: 'Visionary tech entrepreneur leading Bros Group LLC into global software and AI excellence.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    order: 1
  },
  {
    _id: 'team-2',
    name: 'Anus Ahmad Khan',
    role: 'Chief Technology Officer (CTO)',
    department: 'Executive Leadership',
    tier: 'Tier 1: Executive Leadership',
    photoUrl: '/images/anus-ahmed-khan.jpg',
    bio: 'Tech architect specializing in enterprise AI solutions, scalable cloud systems, and engineering leadership.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    order: 2
  }
];

export const STATIC_GALLERY: GalleryItemData[] = [
  {
    _id: 'gal-1',
    title: 'Strategic MoU Signing & Corporate Partnership',
    category: 'MoU Signings',
    imageUrl: '/images/hero-poster.jpg',
    date: '2026-02-15',
    location: 'Global Business District, Technology Tower',
    description: 'Official signing ceremony cementing strategic tech partnerships and joint innovation initiatives.'
  },
  {
    _id: 'gal-2',
    title: 'Enterprise Tech Expo & AI Innovation Summit',
    category: 'Tech Expos & Summits',
    imageUrl: '/images/system-operation.jpg',
    date: '2026-01-20',
    location: 'International Convention Center',
    description: 'Bros Group LLC presenting next-generation enterprise AI agents and scalable digital architectures.'
  },
  {
    _id: 'gal-3',
    title: 'Annual Tech Vision & Steering Meeting',
    category: 'Corporate Events',
    imageUrl: '/images/company-architecture.jpg',
    date: '2025-12-10',
    location: 'Bros Group LLC HQ Executive Boardroom',
    description: 'Executive roadmap strategy session detailing upcoming product expansion and regional scaling.'
  },
  {
    _id: 'gal-4',
    title: 'Engineering & Creative Innovation Retreat',
    category: 'Team & Culture',
    imageUrl: '/images/about-hero.jpg',
    date: '2025-11-05',
    location: 'Serene Resort & Technology Hub',
    description: 'Fostering innovation, cross-department collaboration, and celebrating team achievements.'
  }
];
