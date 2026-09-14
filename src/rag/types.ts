export type KnowledgeChunkType =
  | 'summary'
  | 'skill'
  | 'experience'
  | 'education'
  | 'project'
  | 'service'
  | 'highlight'

export interface KnowledgeChunkMetadata {
  sourceId?: string
  category?: string
  technologies?: string[]
  dates?: string[]
  urls?: string[]
}

export interface KnowledgeChunk {
  id: string
  type: KnowledgeChunkType
  title: string
  content: string
  metadata: KnowledgeChunkMetadata
}

export interface IndexedKnowledgeChunk {
  chunk: KnowledgeChunk
  embedding: number[]
}

export interface RagIndex {
  version: 1
  embeddingModel: string
  items: IndexedKnowledgeChunk[]
}

export interface RetrievalResult {
  chunk: KnowledgeChunk
  vectorScore: number
  finalScore: number
  intentMatched: boolean
}

export interface PortfolioAnswerSource {
  id: string
  type: KnowledgeChunkType
  title: string
}

export interface PortfolioAnswer {
  answer: string
  sources: PortfolioAnswerSource[]
  relatedIds: string[]
  confidence: 'high' | 'medium' | 'low'
}
