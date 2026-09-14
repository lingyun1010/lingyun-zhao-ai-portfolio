import { answerPortfolioQuestion } from '../src/rag/answerQuestion.ts'
import { retrieve } from '../src/rag/retrieve.ts'

const question = process.argv.slice(2).filter((argument) => argument !== '--').join(' ').trim()
if (!question) throw new Error('Pass a question, for example: pnpm rag:test -- "What AI projects have you built?"')

console.log(`Question:\n${question}\n\nRetrieved:`)
const results = await retrieve(question)
results.forEach((result, index) => console.log(
  `${index + 1}. ${result.chunk.title} | ${result.chunk.type} | vector=${result.vectorScore.toFixed(3)} | final=${result.finalScore.toFixed(3)}`,
))
console.log(`\nAnswer:\n${(await answerPortfolioQuestion(question, { retrievalResults: results })).answer}`)
