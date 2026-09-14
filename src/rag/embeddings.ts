import OpenAI from 'openai'
import { RAG_CONFIG } from './config.ts'

function createClient() {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is required')
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

export async function embedTexts(inputs: string[]): Promise<number[][]> {
  if (inputs.length === 0) return []
  const response = await createClient().embeddings.create({
    model: RAG_CONFIG.embeddingModel,
    input: inputs,
    encoding_format: 'float',
  })
  return response.data.sort((left, right) => left.index - right.index).map((item) => item.embedding)
}

export async function embedText(input: string): Promise<number[]> {
  const [embedding] = await embedTexts([input])
  return embedding
}
