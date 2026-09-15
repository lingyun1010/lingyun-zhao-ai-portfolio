import type { KnowledgeChunkType } from './types.ts'

export type RetrievalIntent = Extract<KnowledgeChunkType, 'summary' | 'project' | 'experience' | 'education' | 'skill'>

const INTENT_PATTERNS: Record<RetrievalIntent, RegExp[]> = {
  summary: [
    /\b(?:full|preferred)?\s*name\b/i,
    /\bwho are you\b/i,
    /\bwhere (?:are you based|do you live)\b/i,
    /\b(?:tell me about yourself|your background|professional background)\b/i,
    /\b(?:roles?|jobs?|positions?) (?:are you|you are) (?:interested in|looking for)\b/i,
    /\b(?:career focus|professional profile)\b/i,
  ],
  project: [
    /\bprojects?\b/i,
    /\b(?:what|things?)\s+(?:have\s+you\s+)?built\b/i,
    /\bportfolio\s+(?:work|pieces?)\b/i,
  ],
  experience: [
    /\bprofessional experience\b/i,
    /\bwork(?:ed|ing)?\s+(?:at|for|as)\b/i,
    /\bwhere\s+(?:have\s+you\s+)?worked\b/i,
    /\b(?:employment|career|employers?|companies)\b/i,
  ],
  education: [
    /\b(?:education|studied|study|degree|phd|university|qualifications?)\b/i,
  ],
  skill: [
    /\b(?:skills?|technologies|tech stack|programming languages|tools)\b/i,
    /\bwhat\s+do\s+you\s+work\s+with\b/i,
  ],
}

export function detectRetrievalIntents(query: string): RetrievalIntent[] {
  return (Object.entries(INTENT_PATTERNS) as Array<[RetrievalIntent, RegExp[]]>)
    .filter(([, patterns]) => patterns.some((pattern) => pattern.test(query)))
    .map(([intent]) => intent)
}
