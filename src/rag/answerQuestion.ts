import OpenAI from 'openai'
import { RAG_CONFIG } from './config.ts'
import { buildGroundedPrompt, PORTFOLIO_SYSTEM_PROMPT } from './prompt.ts'
import { retrieve } from './retrieve.ts'
import type { PortfolioAnswer, RetrievalResult } from './types.ts'

const insufficientAnswer = (): PortfolioAnswer => ({
  answer: "My portfolio doesn't contain enough information to answer that confidently.",
  sources: [],
  relatedIds: [],
  confidence: 'low',
})

function confidenceFor(results: RetrievalResult[]): PortfolioAnswer['confidence'] {
  if ((results[0]?.vectorScore ?? 0) >= 0.65) return 'high'
  return results.length >= 2 ? 'medium' : 'low'
}

export async function answerPortfolioQuestion(
  question: string,
  options: { retrievalResults?: RetrievalResult[] } = {},
): Promise<PortfolioAnswer> {
  const results = options.retrievalResults ?? await retrieve(question)
  if (results.length === 0) return insufficientAnswer()
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is required')

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const response = await client.responses.create({
    model: RAG_CONFIG.answerModel,
    instructions: PORTFOLIO_SYSTEM_PROMPT,
    input: buildGroundedPrompt(question, results),
    text: {
      format: {
        type: 'json_schema',
        name: 'portfolio_answer',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            answer: { type: 'string' },
            sourceIds: { type: 'array', items: { type: 'string' } },
          },
          required: ['answer', 'sourceIds'],
          additionalProperties: false,
        },
      },
    },
  })

  const parsed = JSON.parse(response.output_text) as { answer: string; sourceIds: string[] }
  const allowed = new Map(results.map(({ chunk }) => [chunk.id, chunk]))
  const sourceIds = [...new Set(parsed.sourceIds)].filter((id) => allowed.has(id))
  const selected = sourceIds.length ? sourceIds : [results[0].chunk.id]

  return {
    answer: parsed.answer,
    sources: selected.map((id) => {
      const chunk = allowed.get(id)!
      return { id: chunk.id, type: chunk.type, title: chunk.title }
    }),
    relatedIds: [...new Set(selected.map((id) => allowed.get(id)?.metadata.sourceId).filter((id): id is string => Boolean(id)))],
    confidence: confidenceFor(results),
  }
}
