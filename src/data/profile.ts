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
  image?: string
  imageAlt?: string
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
  headline: 'Applied AI Engineer | Full-stack Software Engineer | Computer Vision PhD',
  location: 'Ryde, NSW, Australia',
  summary:
    'I bring 7+ years of production engineering experience together with a PhD in Computer Vision. I build applied AI products around RAG, tool-using agents, evaluation and structured knowledge pipelines, with clear source grounding, safe fallbacks and human review where it matters.',
  introduction: 'Applied AI, trustworthy RAG systems and computer vision research shaped into useful production software.',
  contact: {
    email: 'zhaolingyun1010@gmail.com',
    github: 'https://github.com/lingyun1010',
    linkedin: 'https://www.linkedin.com/in/lingyun-zhao-syd/',
  },
  focusAreas: [
    'LLM apps',
    'RAG systems',
    'AI agents',
    'Tool calling',
    'LLM evaluation',
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
      description: 'RAG applications, LLM workflows, tool-using agents, structured outputs, evaluation and human-in-the-loop routing.',
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
      items: ['Generative AI', 'RAG', 'AI agents', 'Tool calling', 'Structured outputs', 'Evaluation'],
    },
    {
      id: 'product-engineering',
      category: 'Product Engineering',
      items: ['Python', 'FastAPI', 'React', 'TypeScript', 'JavaScript', 'REST APIs'],
    },
    {
      id: 'data-platforms',
      category: 'Data Platforms',
      items: ['PostgreSQL', 'SQL', 'Solr', 'Airtable', 'Canonical schemas', 'Data pipelines'],
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
      technologies: ['React', 'JavaScript', 'Java', 'REST services', 'Solr', 'PostgreSQL'],
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
      shortDescription: 'A local-first content intelligence platform that turns CSV or Airtable data into validated metrics, strategy signals, drafts and an analyst chat grounded in one shared data source.',
      description: 'Includes deterministic analytics, provider-agnostic AI generation, visible tool traces and an offline evaluation harness.',
      technologies: ['Python', 'FastAPI', 'Airtable', 'LLM analysis', 'OpenAI', 'Claude'],
      links: [{ label: 'GitHub', url: 'https://github.com/lingyun1010/tiktok-content-agent' }],
      tags: ['Canonical data', 'Tool routing', 'Evaluation', 'Human review'],
      image: 'https://raw.githubusercontent.com/lingyun1010/tiktok-content-agent/main/docs/assets/dashboard-01-overview.png',
      imageAlt: 'TikTok Content Agent overview dashboard showing performance metrics and content signals',
    },
    {
      id: 'ecommerce-rag-support-agent',
      title: 'E-commerce RAG Support Agent',
      category: 'Retrieval augmented generation',
      shortDescription: 'A full-stack support assistant that routes requests between grounded RAG, mock commerce APIs and human escalation, with citations and controlled fallbacks.',
      description: 'A store URL can be transformed into product, policy and FAQ knowledge used by the FastAPI chat service.',
      technologies: ['Python', 'FastAPI', 'LlamaIndex', 'OpenAI', 'JavaScript'],
      links: [{ label: 'GitHub', url: 'https://github.com/lingyun1010/ecommerce-rag-agent' }],
      tags: ['Intent routing', 'Source attribution', 'Tool calling', 'Escalation'],
    },
    {
      id: 'lookatme-avatar',
      title: 'LookAtMe Avatar',
      category: 'Interactive web avatar',
      shortDescription: 'A reusable pointer-following avatar built from selected video frames, creating a lightweight pseudo-3D directional interaction without a rigged 3D model.',
      technologies: ['React', 'JavaScript', 'Frame extraction', 'Responsive UI'],
      links: [
        { label: 'Live demo', url: 'https://lingyun1010.github.io/lookatme-avatar/' },
        { label: 'GitHub', url: 'https://github.com/lingyun1010/lookatme-avatar' },
      ],
      tags: ['Pointer tracking', 'Frame mapping', 'Reusable runtime'],
      image: 'https://raw.githubusercontent.com/lingyun1010/lookatme-avatar/main/docs/interaction.png',
      imageAlt: 'LookAtMe Avatar directional pointer interaction demonstration',
    },
    {
      id: 'store2knowledge-skill',
      title: 'Store2Knowledge Skill',
      category: 'Structured knowledge pipeline',
      shortDescription: 'A reusable Codex skill that converts public e-commerce pages into structured product, policy and FAQ knowledge for agent and RAG workflows.',
      technologies: ['Codex skills', 'Markdown', 'Structured extraction'],
      links: [{ label: 'GitHub', url: 'https://github.com/lingyun1010/store2knowledge-skill' }],
      tags: ['Knowledge ingestion', 'Products', 'Policies', 'FAQs'],
    },
    {
      id: 'expression-atlas',
      title: 'Expression Atlas',
      category: 'Scientific data platform',
      shortDescription: 'Production search, exploration and visualisation workflows for a global scientific research platform at EMBL-EBI.',
      technologies: ['React', 'REST services', 'Solr', 'Data visualisation'],
      links: [{ label: 'Public site', url: 'https://www.ebi.ac.uk/gxa/home' }],
      tags: ['React', 'REST services', 'Solr', 'Data visualisation'],
    },
  ],
} satisfies Profile
