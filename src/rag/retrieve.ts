import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { RAG_CONFIG } from './config.ts'
import { cosineSimilarity } from './cosineSimilarity.ts'
import { detectRetrievalIntents } from './detectIntent.ts'
import { embedText } from './embeddings.ts'
import type { RagIndex, RetrievalResult } from './types.ts'

const defaultIndexUrl = new URL('../../generated/rag-index.json', import.meta.url)

export interface RetrieveOptions {
  topK?: number
  minimumSimilarity?: number
  minimumIntentSimilarity?: number
  index?: RagIndex
  embedQuery?: (query: string) => Promise<number[]>
}

export async function loadRagIndex(path = fileURLToPath(defaultIndexUrl)): Promise<RagIndex> {
  const index = JSON.parse(await readFile(path, 'utf8')) as RagIndex
  if (index.version !== 1 || !Array.isArray(index.items)) throw new Error('Unsupported or malformed RAG index')
  if (index.embeddingModel !== RAG_CONFIG.embeddingModel) {
    throw new Error(`RAG index model ${index.embeddingModel} does not match ${RAG_CONFIG.embeddingModel}`)
  }
  return index
}

export async function retrieve(query: string, options: RetrieveOptions = {}): Promise<RetrievalResult[]> {
  const normalizedQuery = query.trim()
  if (!normalizedQuery) return []

  const index = options.index ?? await loadRagIndex()
  const queryEmbedding = await (options.embedQuery ?? embedText)(normalizedQuery)
  const minimumSimilarity = options.minimumSimilarity ?? RAG_CONFIG.minimumSimilarity
  const minimumIntentSimilarity = options.minimumIntentSimilarity ?? RAG_CONFIG.minimumIntentSimilarity
  const topK = options.topK ?? RAG_CONFIG.topK
  const intents = detectRetrievalIntents(normalizedQuery)

  return index.items
    .map(({ chunk, embedding }) => {
      const vectorScore = cosineSimilarity(queryEmbedding, embedding)
      const intentMatched = intents.some((intent) => intent === chunk.type)
      const typeBoost = intentMatched ? RAG_CONFIG.intentTypeBoost : 1
      return { chunk, vectorScore, finalScore: vectorScore * typeBoost, intentMatched }
    })
    .filter((result) => result.vectorScore >= (result.intentMatched ? minimumIntentSimilarity : minimumSimilarity))
    .sort((left, right) => right.finalScore - left.finalScore || right.vectorScore - left.vectorScore || left.chunk.id.localeCompare(right.chunk.id))
    .slice(0, topK)
}
