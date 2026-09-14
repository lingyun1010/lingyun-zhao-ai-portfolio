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
import { profile } from './data/profile'
import './styles.css'

type IconType = React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>

const skillIcons: Record<string, IconType> = {
  'ai-systems': BrainCircuit,
  'product-engineering': Code2,
  'data-platforms': DatabaseZap,
  'vision-and-3d': Orbit,
}

const projectIcons: Record<string, IconType> = {
  'tiktok-content-agent': Bot,
  'ecommerce-rag-support-agent': SearchCode,
  'expression-atlas': Sparkles,
}

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
    <a className={compact ? 'contact-button compact' : 'contact-button'} href={`mailto:${profile.contact?.email}`}>
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
      <img src="/avatar.jpeg" alt={`Cartoon portrait of ${profile.name}`} />
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
        <p className="hero-kicker">{profile.headline}</p>
        <h1 className="hero-heading">Hi, I am {profile.preferredName}</h1>
      </div>

      <AvatarWithTrackingEyes />

      <div className="hero-bottom">
        <p>{profile.introduction}</p>
        <ContactButton />
      </div>
    </section>
  )
}

function MarqueeSection() {
  const offset = useScrollOffset()
  const rowOne = [...profile.focusAreas.slice(0, 6), ...profile.focusAreas.slice(0, 6), ...profile.focusAreas.slice(0, 6)]
  const rowTwo = [...profile.focusAreas.slice(6), ...profile.focusAreas.slice(6), ...profile.focusAreas.slice(6)]

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
  const [activeSkill, setActiveSkill] = useState(profile.skills[0].id)
  const selected = profile.skills.find((group) => group.id === activeSkill) ?? profile.skills[0]

  return (
    <section className="about section-dark" id="about">
      <div className="floating-shape shape-one" aria-hidden />
      <div className="floating-shape shape-two" aria-hidden />
      <div className="floating-shape shape-three" aria-hidden />

      <div className="section-head centered">
        <h2 className="hero-heading">About me</h2>
        <p>{profile.summary}</p>
      </div>

      <div className="skill-console">
        <div className="skill-tabs" role="tablist" aria-label="Skill groups">
          {profile.skills.map((group) => {
            const Icon = skillIcons[group.id]
            return (
              <button
                key={group.id}
                className={group.id === activeSkill ? 'active' : ''}
                type="button"
                role="tab"
                aria-selected={group.id === activeSkill}
                onClick={() => setActiveSkill(group.id)}
              >
                <Icon size={19} aria-hidden />
                {group.category}
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
        {profile.services.map((service, index) => (
          <article className="service-item" key={service.id}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
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
        {profile.projects.map((project, index) => {
          const Icon = projectIcons[project.id]
          return (
            <article className="project-card" style={{ top: `${96 + index * 26}px` }} key={project.id}>
              <div className="project-card-top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <a href="#contact">Discuss work</a>
              </div>
              <div className="project-card-body">
                <div className="project-visual">
                  <Icon size={78} aria-hidden />
                  <MousePointer2 className="cursor-mark" size={34} aria-hidden />
                </div>
                <div className="project-copy">
                  <p>{project.shortDescription}</p>
                  <div className="tag-list">
                    {project.tags?.map((tag) => (
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
  const experience = profile.experience[0]

  return (
    <section className="experience">
      <div className="experience-grid">
        <div>
          <p className="eyebrow">Professional experience</p>
          <h2>{experience.summary}</h2>
        </div>
        <article>
          <p className="period">{experience.startDate} - {experience.endDate} | {experience.location}</p>
          <h3>{experience.role}</h3>
          <p className="org">{experience.company}</p>
          <ul>
            {experience.highlights?.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </article>
      </div>
    </section>
  )
}

function ContactSection() {
  const [phd, bachelors] = profile.education

  return (
    <section className="contact" id="contact">
      <div>
        <p className="eyebrow">Education</p>
        <h2>{phd.degree}</h2>
        <p>{phd.institution} | {phd.description} | {phd.startDate} - {phd.endDate}</p>
        <p>{bachelors.degree} | {bachelors.honours} | {bachelors.startDate} - {bachelors.endDate}</p>
      </div>
      <div className="contact-panel">
        <p className="eyebrow">Contact</p>
        <h2>Let us build useful AI with a little visual magic.</h2>
        <a href={`mailto:${profile.contact?.email}`}>
          <Mail size={20} aria-hidden />
          {profile.contact?.email}
        </a>
        <span>
          <MapPin size={20} aria-hidden />
          {profile.location}
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
