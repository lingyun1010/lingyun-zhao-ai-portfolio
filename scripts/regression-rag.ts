import { answerPortfolioQuestion } from '../src/rag/answerQuestion.ts'
import { retrieve } from '../src/rag/retrieve.ts'

const questions = [
  'What is your name?',
  "What's your full name?",
  'Where are you based?',
  'Where do you live?',
  'Tell me about yourself.',
  "What's your background?",
  'What roles are you interested in?',
  'What AI projects have you built?',
  'What experience do you have with RAG?',
  'Tell me about your computer vision background.',
  'What technologies do you work with?',
  'Have you worked as a Product Manager?',
  'Where have you worked?',
  'What projects use retrieval or RAG?',
  'Tell me about your education.',
]

for (const question of questions) {
  console.log(`\nQuestion: ${question}`)
  const results = await retrieve(question)
  results.forEach((result, index) => console.log(
    `${index + 1}. ${result.chunk.title} | ${result.chunk.type} | vector=${result.vectorScore.toFixed(3)} | final=${result.finalScore.toFixed(3)}`,
  ))
  const response = await answerPortfolioQuestion(question, { retrievalResults: results })
  console.log(`Answer: ${response.answer}`)
}
