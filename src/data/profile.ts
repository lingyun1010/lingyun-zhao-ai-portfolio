export interface ProfileContact {
  email?: string
  linkedin?: string
  github?: string
}

export interface SkillGroup {
  id: string
  category: string
  items: string[]
}

export interface Service {
  id: string
  name: string
  description: string
}

export interface Highlight {
  id: string
  title: string
  description: string
}

export interface Experience {
  id: string
  role: string
  company: string
  location?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
  technologies?: string[]
}

export interface Education {
  id: string
  degree: string
  institution?: string
  startDate?: string
  endDate?: string
  description?: string
  honours?: string
}

export interface ProfileLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  category: string
  shortDescription: string
  description?: string
  technologies?: string[]
  links?: ProfileLink[]
  tags?: string[]
}

export interface Profile {
  name: string
  preferredName: string
  headline: string
  location?: string
  summary: string
  introduction: string
  contact?: ProfileContact
  focusAreas: string[]
  highlights: Highlight[]
  skills: SkillGroup[]
  services: Service[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
}

// Canonical structured profile for the portfolio UI and a future knowledge-generation pipeline.
export const profile = {
  name: 'Lingyun Zhao',
  preferredName: 'Lingyun',
  headline: 'AI Engineer | Full-stack Software Engineer | Computer Vision',
  location: 'Sydney, NSW, Australia',
  summary:
    'I bring 7+ years of production engineering experience together with a PhD in Computer Vision. My current focus is applied GenAI: RAG applications, AI agents, LLM workflows and structured knowledge pipelines that are clear enough to trust and robust enough to ship.',
  introduction: 'Applied GenAI, RAG systems and computer vision research shaped into useful production software.',
  contact: {
    email: 'zhaolingyun1010@gmail.com',
  },
  focusAreas: [
    'LLM apps',
    'RAG systems',
    'AI agents',
    'Vector search',
    'Computer vision',
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Solr',
    'WebGL',
    'AWS',
  ],
  highlights: [
    {
      id: 'applied-genai',
      title: 'Applied GenAI',
      description: 'RAG applications, LLM workflows, AI agents, structured outputs and tool-based routing.',
    },
    {
      id: 'production-systems',
      title: 'Production Systems',
      description: 'React, TypeScript, JavaScript, REST services, PostgreSQL, Solr, data pipelines and AWS.',
    },
    {
      id: 'vision-and-3d',
      title: 'Vision & 3D',
      description: 'PhD research in image processing, depth estimation, image dehazing, 3D reconstruction and WebGL.',
    },
  ],
  skills: [
    {
      id: 'ai-systems',
      category: 'AI Systems',
      items: ['Generative AI', 'LLM applications', 'RAG', 'Embeddings', 'Vector search', 'Tool calling'],
    },
    {
      id: 'product-engineering',
      category: 'Product Engineering',
      items: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Java', 'REST APIs'],
    },
    {
      id: 'data-platforms',
      category: 'Data Platforms',
      items: ['PostgreSQL', 'SQL', 'Solr', 'Data pipelines', 'Information retrieval'],
    },
    {
      id: 'vision-and-3d',
      category: 'Vision & 3D',
      items: ['Computer vision', 'Image processing', 'Depth estimation', 'Image dehazing', '3D reconstruction', 'WebGL'],
    },
  ],
  services: [
    {
      id: 'applied-genai',
      name: 'Applied GenAI',
      description: 'RAG applications, LLM-powered workflows, AI agents and structured outputs designed for reliable user-facing products.',
    },
    {
      id: 'full-stack-delivery',
      name: 'Full-stack Delivery',
      description: 'Production features across React, JavaScript, REST services, data flows, release practices and operational handover.',
    },
    {
      id: 'knowledge-systems',
      name: 'Knowledge Systems',
      description: 'Structured knowledge, retrieval, search and traceable AI workflows that make complex data easier to use.',
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision',
      description: 'Research-grounded image processing, depth estimation, dehazing, layered scene modelling and 3D visualisation.',
    },
  ],
  experience: [
    {
      id: 'embl-ebi-senior-software-engineer',
      role: 'Senior Software Engineer / Big Data Engineer',
      company: 'EMBL-EBI - European Bioinformatics Institute',
      location: 'Cambridge, UK',
      startDate: 'July 2018',
      endDate: 'September 2025',
      summary: 'Production software for data-intensive science',
      highlights: [
        'Built production features for Expression Atlas, a scientific data platform for global researchers.',
        'Delivered full-stack workflows across React, JavaScript, REST services, data systems and infrastructure.',
        'Worked with UX, biology, backend, data-production and infrastructure teams to translate complex requirements into usable products.',
        'Supported system design, documentation, testing, deployment and cross-functional agile delivery.',
      ],
      technologies: ['React', 'JavaScript', 'REST services'],
    },
  ],
  education: [
    {
      id: 'phd-computer-vision',
      degree: 'PhD, Computer Vision',
      institution: 'Queen Mary University of London',
      startDate: 'July 2014',
      endDate: 'July 2019',
      description: 'Scene Estimation and Modelling in Haze',
    },
    {
      id: 'bsc-telecommunications-and-management',
      degree: 'BSc, Telecommunications and Management',
      startDate: 'September 2010',
      endDate: 'July 2014',
      honours: 'First Class Honours',
    },
  ],
  projects: [
    {
      id: 'tiktok-content-agent',
      title: 'TikTok Content Agent',
      category: 'AI content intelligence',
      shortDescription: 'An analyst platform combining structured data, LLM analysis, routing and an interactive dashboard.',
      technologies: ['LLM analysis'],
      tags: ['Classification', 'Tool routing', 'Human review', 'Traceability'],
    },
    {
      id: 'ecommerce-rag-support-agent',
      title: 'E-commerce RAG Support Agent',
      category: 'Retrieval augmented generation',
      shortDescription: 'A customer-support system with intent routing, retrieval, grounded generation, source attribution and escalation logic.',
      technologies: ['Retrieval augmented generation'],
      tags: ['Intent routing', 'Source attribution', 'Controlled generation', 'Escalation'],
    },
    {
      id: 'expression-atlas',
      title: 'Expression Atlas',
      category: 'Scientific data platform',
      shortDescription: 'Production search, exploration and visualisation workflows for a global scientific research platform at EMBL-EBI.',
      technologies: ['React', 'REST services', 'Solr', 'Data visualisation'],
      tags: ['React', 'REST services', 'Solr', 'Data visualisation'],
    },
  ],
} satisfies Profile
