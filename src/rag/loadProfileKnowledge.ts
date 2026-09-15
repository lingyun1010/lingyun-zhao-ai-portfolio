import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const defaultProfileKnowledgeUrl = new URL('../../knowledge/profile.md', import.meta.url)

export async function loadProfileKnowledge(path = fileURLToPath(defaultProfileKnowledgeUrl)): Promise<string> {
  const content = (await readFile(path, 'utf8')).trim()
  if (!content) throw new Error('Canonical profile knowledge is empty')
  return content
}
