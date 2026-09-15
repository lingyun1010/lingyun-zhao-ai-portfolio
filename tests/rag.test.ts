import assert from 'node:assert/strict'
import test from 'node:test'
import { profile } from '../src/data/profile.ts'
import { buildKnowledgeChunks } from '../src/rag/buildKnowledgeChunks.ts'
import { cosineSimilarity } from '../src/rag/cosineSimilarity.ts'
import { detectRetrievalIntents } from '../src/rag/detectIntent.ts'
import { loadProfileKnowledge } from '../src/rag/loadProfileKnowledge.ts'
import { retrieve } from '../src/rag/retrieve.ts'
import type { RagIndex } from '../src/rag/types.ts'

const canonicalProfileKnowledge = await loadProfileKnowledge()
const buildChunks = () => buildKnowledgeChunks(profile, canonicalProfileKnowledge)

test('builds deterministic, uniquely identified semantic chunks', () => {
  const first = buildChunks()
  const second = buildChunks()
  assert.deepEqual(first, second)
  assert.equal(first.length, 20)
  assert.equal(new Set(first.map((chunk) => chunk.id)).size, first.length)
  assert.deepEqual(new Set(first.map((chunk) => chunk.type)), new Set(['summary', 'skill', 'experience', 'education', 'project', 'service', 'highlight']))
  assert.match(first.find((chunk) => chunk.id === 'experience-embl-ebi-senior-software-engineer')!.content, /Lingyun Zhao worked as/)
})

test('calculates cosine similarity and handles invalid vectors', () => {
  assert.equal(cosineSimilarity([1, 0], [1, 0]), 1)
  assert.equal(cosineSimilarity([1, 0], [0, 1]), 0)
  assert.equal(cosineSimilarity([], []), 0)
  assert.equal(cosineSimilarity([1], [1, 2]), 0)
})

test('sorts results, applies topK, and filters below the threshold', async () => {
  const chunks = buildChunks().slice(0, 3)
  const index: RagIndex = {
    version: 1,
    embeddingModel: 'test',
    items: [
      { chunk: chunks[0], embedding: [1, 0] },
      { chunk: chunks[1], embedding: [0.8, 0.2] },
      { chunk: chunks[2], embedding: [0, 1] },
    ],
  }
  const results = await retrieve('query', { index, embedQuery: async () => [1, 0], topK: 2, minimumSimilarity: 0.5 })
  assert.deepEqual(results.map((result) => result.chunk.id), [chunks[0].id, chunks[1].id])
  assert.ok(results.every((result) => result.vectorScore >= 0.5))
})

test('returns no results when every score is below the threshold', async () => {
  const [chunk] = buildChunks()
  const index: RagIndex = { version: 1, embeddingModel: 'test', items: [{ chunk, embedding: [0, 1] }] }
  assert.deepEqual(await retrieve('query', { index, embedQuery: async () => [1, 0], minimumSimilarity: 0.1 }), [])
})

test('does not represent Product Manager as an experience title', () => {
  const experienceText = buildChunks()
    .filter((chunk) => chunk.type === 'experience')
    .map((chunk) => chunk.content)
    .join(' ')
  assert.doesNotMatch(experienceText, /worked as (?:a )?Product Manager/i)
})

test('contains grounded source coverage for the required portfolio questions', () => {
  const chunks = buildChunks()
  const byId = new Map(chunks.map((chunk) => [chunk.id, chunk.content]))

  assert.match(byId.get('project-tiktok-content-agent')!, /LLM analysis/)
  assert.match(byId.get('project-ecommerce-rag-support-agent')!, /retrieval/i)
  assert.match(byId.get('education-phd-computer-vision')!, /Scene Estimation and Modelling in Haze/)
  assert.match(byId.get('skill-product-engineering')!, /React.*TypeScript.*JavaScript/)
  assert.equal(profile.experience.some((item) => /Product Manager/i.test(item.role)), false)
})

test('detects entity intent without treating Product Manager as project intent', () => {
  assert.deepEqual(detectRetrievalIntents('What is your full name?'), ['summary'])
  assert.deepEqual(detectRetrievalIntents('Where do you live?'), ['summary'])
  assert.deepEqual(detectRetrievalIntents('What roles are you interested in?'), ['summary'])
  assert.deepEqual(detectRetrievalIntents('What AI projects have you built?'), ['project'])
  assert.deepEqual(detectRetrievalIntents('Where have you worked?'), ['experience'])
  assert.deepEqual(detectRetrievalIntents('Tell me about your education'), ['education'])
  assert.deepEqual(detectRetrievalIntents('What technologies do you work with?'), ['skill'])
  assert.deepEqual(detectRetrievalIntents('Have you worked as a Product Manager?'), ['experience'])
})

test('boosts matching entity types without filtering other relevant types', async () => {
  const chunks = buildChunks()
  const project = chunks.find((chunk) => chunk.type === 'project')!
  const skill = chunks.find((chunk) => chunk.type === 'skill')!
  const index: RagIndex = {
    version: 1,
    embeddingModel: 'test',
    items: [
      { chunk: project, embedding: [0.8, 0.2] },
      { chunk: skill, embedding: [0.85, 0.15] },
    ],
  }
  const results = await retrieve('Show me your projects', { index, embedQuery: async () => [1, 0], minimumSimilarity: 0 })
  assert.equal(results[0].chunk.type, 'project')
  assert.ok(results[0].finalScore > results[0].vectorScore)
  assert.equal(results[1].finalScore, results[1].vectorScore)
})

test('lets explicit entity intent rescue a near-threshold matching chunk only', async () => {
  const chunks = buildChunks()
  const education = chunks.find((chunk) => chunk.type === 'education')!
  const service = chunks.find((chunk) => chunk.type === 'service')!
  const index: RagIndex = {
    version: 1,
    embeddingModel: 'test',
    items: [
      { chunk: education, embedding: [0.2, 0.98] },
      { chunk: service, embedding: [0.2, 0.98] },
    ],
  }
  const results = await retrieve('Tell me about your education', {
    index,
    embedQuery: async () => [1, 0],
    minimumSimilarity: 0.3,
    minimumIntentSimilarity: 0.17,
  })
  assert.deepEqual(results.map((result) => result.chunk.type), ['education'])
})

test('keeps canonical identity and biography facts together in one profile chunk', () => {
  const profileChunk = buildChunks().find((chunk) => chunk.id === 'summary-profile')!

  assert.equal(profileChunk.metadata.sourceId, 'knowledge/profile.md')
  assert.match(profileChunk.content, /Full name: Lingyun Zhao/)
  assert.match(profileChunk.content, /Current location: Sydney, Australia/)
  assert.match(profileChunk.content, /approximately 7 years of industry experience in the UK/)
  assert.match(profileChunk.content, /AI Engineer or Full-Stack GenAI Engineer roles/)
  assert.match(profileChunk.content, /PhD in Computer Vision, Queen Mary University of London, 2014–2019/)
  assert.match(profileChunk.content, /Docker and Kubernetes/)
  assert.match(profileChunk.content, /Make\.com social-media automation workflows/)
})

test('retrieves the canonical profile for basic identity and biography questions', async () => {
  const chunks = buildChunks()
  const profileChunk = chunks.find((chunk) => chunk.id === 'summary-profile')!
  const distractor = chunks.find((chunk) => chunk.type === 'project')!
  const index: RagIndex = {
    version: 1,
    embeddingModel: 'test',
    items: [
      { chunk: profileChunk, embedding: [1, 0] },
      { chunk: distractor, embedding: [0, 1] },
    ],
  }
  const questions = [
    'What is your name?',
    "What's your full name?",
    'Where are you based?',
    'Where do you live?',
    'Tell me about yourself',
    "What's your background?",
    'What roles are you interested in?',
  ]

  for (const question of questions) {
    const [result] = await retrieve(question, {
      index,
      embedQuery: async () => [1, 0],
      minimumSimilarity: 0.3,
    })
    assert.equal(result.chunk.id, 'summary-profile', question)
    assert.equal(result.intentMatched, true, question)
  }
})
