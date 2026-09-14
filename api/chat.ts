import { answerPortfolioQuestion } from '../src/rag/answerQuestion.ts'
import { RAG_CONFIG } from '../src/rag/config.ts'

interface ApiRequest { method?: string; body?: unknown; headers?: { origin?: string } }
interface ApiResponse {
  status(code: number): ApiResponse
  end(): void
  json(body: unknown): void
  setHeader(name: string, value: string): void
}

const allowedOrigins = new Set([
  'https://lingyun1010.github.io',
  'http://localhost:5173',
])

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const origin = request.headers?.origin
  if (origin && allowedOrigins.has(origin)) response.setHeader('Access-Control-Allow-Origin', origin)
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.setHeader('Vary', 'Origin')
  response.setHeader('Cache-Control', 'no-store')
  if (request.method === 'OPTIONS') return response.status(204).end()
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })

  const body = request.body as { message?: unknown } | null
  if (!body || typeof body !== 'object' || typeof body.message !== 'string') {
    return response.status(400).json({ error: 'Request body must contain a message string' })
  }

  const message = body.message.trim()
  if (!message) return response.status(400).json({ error: 'Message cannot be empty' })
  if (message.length > RAG_CONFIG.maximumQuestionLength) {
    return response.status(400).json({ error: `Message must be ${RAG_CONFIG.maximumQuestionLength} characters or fewer` })
  }

  try {
    return response.status(200).json(await answerPortfolioQuestion(message))
  } catch (error) {
    console.error('Portfolio chat request failed', error instanceof Error ? error.message : 'Unknown error')
    return response.status(500).json({ error: 'Unable to answer the question right now' })
  }
}
