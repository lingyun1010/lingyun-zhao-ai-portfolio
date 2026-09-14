import { createServer } from 'node:http'
import { answerPortfolioQuestion } from '../src/rag/answerQuestion.ts'
import { RAG_CONFIG } from '../src/rag/config.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

createServer(async (request, response) => {
  const send = (status: number, body: unknown) => {
    response.writeHead(status, corsHeaders)
    response.end(JSON.stringify(body))
  }

  if (request.method === 'OPTIONS') return send(204, null)
  if (request.method !== 'POST' || request.url !== '/api/chat') return send(404, { error: 'Not found' })

  try {
    const chunks: Buffer[] = []
    for await (const chunk of request) chunks.push(chunk)
    const body = JSON.parse(Buffer.concat(chunks).toString()) as { message?: unknown }
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    if (!message) return send(400, { error: 'Message cannot be empty' })
    if (message.length > RAG_CONFIG.maximumQuestionLength) {
      return send(400, { error: `Message must be ${RAG_CONFIG.maximumQuestionLength} characters or fewer` })
    }
    send(200, await answerPortfolioQuestion(message))
  } catch (error) {
    console.error('Local portfolio API request failed', error instanceof SyntaxError ? 'Invalid JSON' : 'Request failed')
    send(error instanceof SyntaxError ? 400 : 500, {
      error: error instanceof SyntaxError ? 'Request body must be valid JSON' : 'Unable to answer the question right now',
    })
  }
}).listen(3001, '127.0.0.1', () => console.log('Local portfolio API listening on http://localhost:3001'))
