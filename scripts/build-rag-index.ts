import { mkdir, writeFile } from 'node:fs/promises'
import { profile } from '../src/data/profile.ts'
import { buildKnowledgeChunks } from '../src/rag/buildKnowledgeChunks.ts'
import { RAG_CONFIG } from '../src/rag/config.ts'
import { embedTexts } from '../src/rag/embeddings.ts'
import type { RagIndex } from '../src/rag/types.ts'

const chunks = buildKnowledgeChunks(profile)
const embeddings = await embedTexts(chunks.map((chunk) => chunk.content))
const index: RagIndex = {
  version: 1,
  embeddingModel: RAG_CONFIG.embeddingModel,
  items: chunks.map((chunk, position) => ({ chunk, embedding: embeddings[position] })),
}

await mkdir(new URL('../generated/', import.meta.url), { recursive: true })
await writeFile(new URL('../generated/rag-index.json', import.meta.url), `${JSON.stringify(index, null, 2)}\n`)
console.log(`Built ${index.items.length} chunks with ${index.embeddingModel}.`)
