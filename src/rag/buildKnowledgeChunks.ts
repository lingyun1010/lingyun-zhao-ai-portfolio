import type { Profile } from '../data/profile.ts'
import type { KnowledgeChunk } from './types.ts'

const compact = (values: Array<string | undefined>) => values.filter(Boolean).join(' | ')

export function buildKnowledgeChunks(profile: Profile): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    {
      id: 'summary-profile',
      type: 'summary',
      title: `${profile.name} — Professional profile`,
      content: compact([
        `${profile.name} is ${profile.headline}.`,
        profile.location ? `${profile.name} is based in ${profile.location}.` : undefined,
        profile.summary,
        `Current focus areas: ${profile.focusAreas.join(', ')}.`,
      ]),
      metadata: { sourceId: 'profile' },
    },
  ]

  for (const skill of profile.skills) {
    chunks.push({
      id: `skill-${skill.id}`,
      type: 'skill',
      title: `${skill.category} skills`,
      content: `${profile.name}'s ${skill.category} skills include ${skill.items.join(', ')}.`,
      metadata: { sourceId: skill.id, category: skill.category, technologies: skill.items },
    })
  }

  for (const experience of profile.experience) {
    const dates = [experience.startDate, experience.endDate].filter((date): date is string => Boolean(date))
    chunks.push({
      id: `experience-${experience.id}`,
      type: 'experience',
      title: `${experience.role} — ${experience.company}`,
      content: compact([
        `${profile.name} worked as ${experience.role} at ${experience.company}${experience.location ? ` in ${experience.location}` : ''}${dates.length ? ` from ${dates.join(' to ')}` : ''}.`,
        experience.summary,
        experience.highlights?.length ? `Key responsibilities and contributions: ${experience.highlights.join(' ')}` : undefined,
        experience.technologies?.length ? `Technologies: ${experience.technologies.join(', ')}.` : undefined,
      ]),
      metadata: {
        sourceId: experience.id,
        technologies: experience.technologies,
        dates,
      },
    })
  }

  for (const education of profile.education) {
    const dates = [education.startDate, education.endDate].filter((date): date is string => Boolean(date))
    chunks.push({
      id: `education-${education.id}`,
      type: 'education',
      title: education.degree,
      content: compact([
        `${profile.name} completed ${education.degree}${education.institution ? ` at ${education.institution}` : ''}${dates.length ? ` from ${dates.join(' to ')}` : ''}.`,
        education.description ? `Area of study or research: ${education.description}.` : undefined,
        education.honours ? `Honours: ${education.honours}.` : undefined,
      ]),
      metadata: { sourceId: education.id, dates },
    })
  }

  for (const project of profile.projects) {
    const urls = project.links?.map((link) => link.url)
    const isAiProject = /\bAI\b|generation/i.test(project.category)
    chunks.push({
      id: `project-${project.id}`,
      type: 'project',
      title: project.title,
      content: compact([
        `Project — ${project.title}`,
        `${project.title} is ${isAiProject ? 'an AI project' : 'a project'} built by ${profile.name} in the ${project.category} category.`,
        `Project description: ${project.shortDescription}`,
        project.description ? `Additional project details: ${project.description}` : undefined,
        project.technologies?.length ? `Technologies: ${project.technologies.join(', ')}.` : undefined,
        project.tags?.length ? `Relevant capabilities: ${project.tags.join(', ')}.` : undefined,
        project.links?.length ? `Links: ${project.links.map((link) => `${link.label}: ${link.url}`).join(', ')}.` : undefined,
      ]),
      metadata: { sourceId: project.id, category: project.category, technologies: project.technologies, urls },
    })
  }

  for (const service of profile.services) {
    chunks.push({
      id: `service-${service.id}`,
      type: 'service',
      title: service.name,
      content: `${profile.name} offers ${service.name}: ${service.description}`,
      metadata: { sourceId: service.id },
    })
  }

  for (const highlight of profile.highlights) {
    chunks.push({
      id: `highlight-${highlight.id}`,
      type: 'highlight',
      title: highlight.title,
      content: `${profile.name}'s ${highlight.title} focus: ${highlight.description}`,
      metadata: { sourceId: highlight.id },
    })
  }

  return chunks
}
