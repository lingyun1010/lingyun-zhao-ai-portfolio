import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Bot,
  BrainCircuit,
  Code2,
  DatabaseZap,
  Mail,
  MapPin,
  MousePointer2,
  Orbit,
  SearchCode,
  Sparkles,
} from 'lucide-react'
import './styles.css'

type IconType = React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>

type SkillGroup = {
  title: string
  icon: IconType
  items: string[]
}

const marqueeItems = [
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
]

const skillGroups: SkillGroup[] = [
  {
    title: 'AI Systems',
    icon: BrainCircuit,
    items: ['Generative AI', 'LLM applications', 'RAG', 'Embeddings', 'Vector search', 'Tool calling', 'AI agents'],
  },
  {
    title: 'Product Engineering',
    icon: Code2,
    items: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Java', 'REST APIs', 'Automated testing'],
  },
  {
    title: 'Data Platforms',
    icon: DatabaseZap,
    items: ['PostgreSQL', 'SQL', 'Solr', 'Data pipelines', 'Information retrieval', 'Structured knowledge'],
  },
  {
    title: 'Vision & 3D',
    icon: Orbit,
    items: ['Computer vision', 'Image processing', 'Depth estimation', 'Image dehazing', '3D scene reconstruction', 'WebGL'],
  },
]

const services = [
  {
    number: '01',
    name: 'Applied GenAI',
    text: 'RAG applications, LLM-powered workflows, AI agents and structured outputs designed for reliable user-facing products.',
  },
  {
    number: '02',
    name: 'Full-stack Delivery',
    text: 'Production features across React, JavaScript, REST services, data flows, release practices and operational handover.',
  },
  {
    number: '03',
    name: 'Knowledge Systems',
    text: 'Structured knowledge, retrieval, search and traceable AI workflows that make complex data easier to use.',
  },
  {
    number: '04',
    name: 'Computer Vision',
    text: 'Research-grounded image processing, depth estimation, dehazing, layered scene modelling and 3D visualisation.',
  },
]

const projects = [
  {
    number: '01',
    category: 'AI content intelligence',
    name: 'TikTok Content Agent',
    text: 'An analyst platform combining structured data, LLM analysis, routing and an interactive dashboard.',
    tags: ['Classification', 'Tool-based routing', 'Human review', 'Traceability'],
    icon: Bot,
  },
  {
    number: '02',
    category: 'Retrieval augmented generation',
    name: 'E-commerce RAG Support Agent',
    text: 'A customer-support system with intent routing, retrieval, grounded generation, source attribution and escalation logic.',
    tags: ['Intent routing', 'Source attribution', 'Controlled generation', 'Escalation'],
    icon: SearchCode,
  },
  {
    number: '03',
    category: 'Scientific data platform',
    name: 'Expression Atlas',
    text: 'Production search, exploration and visualisation workflows for a global scientific research platform at EMBL-EBI.',
    tags: ['React', 'REST services', 'Solr', 'Data visualisation'],
    icon: Sparkles,
  },
]

function useScrollOffset() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const update = () => setOffset(window.scrollY)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return offset
}

function ContactButton({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? 'contact-button compact' : 'contact-button'} href="mailto:zhaolingyun1010@gmail.com">
      <Mail size={18} aria-hidden />
      Contact me
    </a>
  )
}

function AvatarWithTrackingEyes() {
  const [pupil, setPupil] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const update = (event: PointerEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight * 0.52
      const rawX = (event.clientX - centerX) / centerX
      const rawY = (event.clientY - centerY) / centerY
      setPupil({
        x: Math.max(-1, Math.min(1, rawX)) * 9,
        y: Math.max(-1, Math.min(1, rawY)) * 6,
      })
    }

    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [])

  const pupilStyle = {
    transform: `translate3d(${pupil.x}px, ${pupil.y}px, 0)`,
  }

  return (
    <div className="portrait-stage" aria-label="Cartoon portrait with eyes following the pointer">
      <div className="portrait-glow" aria-hidden />
      <img src="/avatar.jpeg" alt="Cartoon portrait of Lingyun Zhao" />
      <span className="tracked-eye left-eye" aria-hidden>
        <span className="tracked-pupil" style={pupilStyle} />
      </span>
      <span className="tracked-eye right-eye" aria-hidden>
        <span className="tracked-pupil" style={pupilStyle} />
      </span>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="hero" id="home">
      <nav className="nav" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="hero-title-wrap">
        <p className="hero-kicker">AI Engineer | Full-stack Software Engineer | Computer Vision</p>
        <h1 className="hero-heading">Hi, I am Lingyun</h1>
      </div>

      <AvatarWithTrackingEyes />

      <div className="hero-bottom">
        <p>Applied GenAI, RAG systems and computer vision research shaped into useful production software.</p>
        <ContactButton />
      </div>
    </section>
  )
}

function MarqueeSection() {
  const offset = useScrollOffset()
  const rowOne = [...marqueeItems.slice(0, 6), ...marqueeItems.slice(0, 6), ...marqueeItems.slice(0, 6)]
  const rowTwo = [...marqueeItems.slice(6), ...marqueeItems.slice(6), ...marqueeItems.slice(6)]

  return (
    <section className="marquee-section" aria-label="Technical focus areas">
      <div className="marquee-row" style={{ transform: `translateX(${(offset * 0.16) % 260 - 220}px)` }}>
        {rowOne.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
      <div className="marquee-row reverse" style={{ transform: `translateX(${-((offset * 0.16) % 260)}px)` }}>
        {rowTwo.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  )
}

function AboutSection() {
  const [activeSkill, setActiveSkill] = useState(skillGroups[0].title)
  const selected = skillGroups.find((group) => group.title === activeSkill) ?? skillGroups[0]

  return (
    <section className="about section-dark" id="about">
      <div className="floating-shape shape-one" aria-hidden />
      <div className="floating-shape shape-two" aria-hidden />
      <div className="floating-shape shape-three" aria-hidden />

      <div className="section-head centered">
        <h2 className="hero-heading">About me</h2>
        <p>
          I bring 7+ years of production engineering experience together with a PhD in Computer Vision.
          My current focus is applied GenAI: RAG applications, AI agents, LLM workflows and structured
          knowledge pipelines that are clear enough to trust and robust enough to ship.
        </p>
      </div>

      <div className="skill-console">
        <div className="skill-tabs" role="tablist" aria-label="Skill groups">
          {skillGroups.map((group) => {
            const Icon = group.icon
            return (
              <button
                key={group.title}
                className={group.title === activeSkill ? 'active' : ''}
                type="button"
                role="tab"
                aria-selected={group.title === activeSkill}
                onClick={() => setActiveSkill(group.title)}
              >
                <Icon size={19} aria-hidden />
                {group.title}
              </button>
            )
          })}
        </div>
        <div className="skill-panel" role="tabpanel">
          {selected.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="services" id="services">
      <h2>Services</h2>
      <div className="service-list">
        {services.map((service) => (
          <article className="service-item" key={service.number}>
            <span>{service.number}</span>
            <div>
              <h3>{service.name}</h3>
              <p>{service.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section className="projects section-dark" id="projects">
      <div className="section-head centered">
        <h2 className="hero-heading">Projects</h2>
      </div>
      <div className="project-stack">
        {projects.map((project, index) => {
          const Icon = project.icon
          return (
            <article className="project-card" style={{ top: `${96 + index * 26}px` }} key={project.name}>
              <div className="project-card-top">
                <span>{project.number}</span>
                <p>{project.category}</p>
                <h3>{project.name}</h3>
                <a href="#contact">Discuss work</a>
              </div>
              <div className="project-card-body">
                <div className="project-visual">
                  <Icon size={78} aria-hidden />
                  <MousePointer2 className="cursor-mark" size={34} aria-hidden />
                </div>
                <div className="project-copy">
                  <p>{project.text}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="experience">
      <div className="experience-grid">
        <div>
          <p className="eyebrow">Professional experience</p>
          <h2>Production software for data-intensive science</h2>
        </div>
        <article>
          <p className="period">July 2018 - September 2025 | Cambridge, UK</p>
          <h3>Senior Software Engineer / Big Data Engineer</h3>
          <p className="org">EMBL-EBI - European Bioinformatics Institute</p>
          <ul>
            <li>Built production features for Expression Atlas, a scientific data platform for global researchers.</li>
            <li>Delivered full-stack workflows across React, JavaScript, REST services, data systems and infrastructure.</li>
            <li>Worked with UX, biology, backend, data-production and infrastructure teams to translate complex requirements into usable products.</li>
            <li>Supported system design, documentation, testing, deployment and cross-functional agile delivery.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div>
        <p className="eyebrow">Education</p>
        <h2>PhD, Computer Vision</h2>
        <p>Queen Mary University of London | Scene Estimation and Modelling in Haze | July 2014 - July 2019</p>
        <p>BSc, Telecommunications and Management | First Class Honours | September 2010 - July 2014</p>
      </div>
      <div className="contact-panel">
        <p className="eyebrow">Contact</p>
        <h2>Let us build useful AI with a little visual magic.</h2>
        <a href="mailto:zhaolingyun1010@gmail.com">
          <Mail size={20} aria-hidden />
          zhaolingyun1010@gmail.com
        </a>
        <span>
          <MapPin size={20} aria-hidden />
          Sydney, NSW, Australia
        </span>
      </div>
    </section>
  )
}

function App() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
