# Lingyun Zhao AI Portfolio

A personal portfolio site for an AI engineer and computer vision researcher. The site presents production engineering experience, applied GenAI work, RAG systems, data platforms, and visual computing research through a highly interactive single-page design.

Live site: [https://lingyun1010.github.io/lingyun-zhao-ai-portfolio/](https://lingyun1010.github.io/lingyun-zhao-ai-portfolio/)

## Project Overview

This portfolio is built as a Vite-powered static site. The main experience lives in `index.html`, with public assets in `public/` and GitHub Pages deployment handled through GitHub Actions.

The page includes:

- A full-screen hero with a video-derived cartoon character portrait.
- Mouse-direction-based character angle switching.
- A GhostCursor-style WebGL pointer trail.
- Edge-reactive glowing cards for skill and project sections.
- Responsive portfolio sections for highlights, skills, services, projects, experience, education, and contact.

## Design Direction

The visual language combines a dark cinematic portfolio surface with high-contrast typography and soft neon interaction details.

Key design choices:

- **Large typographic hero**: the oversized headline creates an immediate first-viewport identity moment.
- **Character-led focal point**: the hero portrait is centered and layered beneath the headline, giving the page a playful but polished personal signal.
- **Dark editorial canvas**: black and charcoal sections make the character, gradient lighting, and card interactions stand out.
- **Alternating content rhythm**: dark portfolio sections are balanced with light service and experience sections for readability.
- **Compact technical content**: skills and project details use chips, cards, and short copy so the page remains scannable.

## Hero Interaction

The hero character is generated from an animation source and exported into transparent PNG frames.

The site uses an explicit `ANGLE_KEYS` configuration to map mouse direction to selected frames. This mapping was created from inspected extracted frames rather than assuming the animation is evenly distributed around 360 degrees.

Current behavior:

- The center frame is used when the pointer is near the middle of the viewport.
- Sixteen directional frames are used for surrounding pointer directions.
- Frame changes are instant and avoid brightness or opacity shifts, so the portrait does not flicker during angle changes.
- All frame paths are relative, so the animation works under the GitHub Pages project path.

Relevant assets:

- `public/angle-frames/`
- `public/angle-keys.json`
- `public/angle-keys-preview.jpg`
- `public/all-frames-contact-sheet.jpg`

## Ghost Cursor

The mouse effect is inspired by the React Bits GhostCursor component and implemented directly in the static page with Three.js.

It adds:

- A soft smoke-like cursor trail.
- Bloom glow around the trail.
- Subtle film-grain texture.
- Inertia, so the trail feels fluid rather than rigid.
- Idle fade-out after the pointer stops or leaves the window.

The canvas is fixed across the viewport and uses `pointer-events: none`, so it does not block navigation, card hover states, or links.

## Card Glow

The skills and project cards use a React Bits-inspired edge glow treatment adapted for plain HTML, CSS, and JavaScript.

The effect reacts to pointer proximity:

- Moving close to a card edge reveals a directional glow.
- The glow angle follows the cursor position around the card.
- A subtle mesh-gradient fill appears near the active edge.
- The effect fades out after hover, preserving the calm baseline layout.

Applied sections:

- Four skill cards in the About section.
- Three project cards in the Projects section.

## Content Structure

The page is organized as a single scrollable portfolio:

- **Hero**: identity, technical positioning, animated portrait, and primary contact action.
- **Highlights**: quick overview of applied GenAI, production systems, and vision/3D work.
- **About**: concise profile summary and technical skill groups.
- **Services**: applied GenAI, full-stack delivery, knowledge systems, and computer vision.
- **Projects**: selected AI, RAG, and scientific data platform work.
- **Experience**: production software engineering background.
- **Education and contact panel**: academic background and site-level contact area.

## Profile Data Architecture

`src/data/profile.ts` is the canonical structured representation of the portfolio's CV-derived content. It keeps identity, contact details, skills, services, experience, education, and projects separate from the React presentation layer, with stable IDs for every major record.

```text
Current phase:

Existing CV-derived content
          ↓
     profile.ts
      /       \
     ↓         ↓
Portfolio UI  Future RAG pipeline
```

The next planned phase will connect the source CV to this structure:

```text
CV.pdf
↓
automatic profile extraction / sync
↓
profile.ts or generated profile data
```

That ingestion step should validate extracted facts, preserve stable IDs where records match, and flag conflicts for review before replacing the canonical profile data.

## RAG Architecture

The RAG service is deliberately isolated from the browser application. The static portfolio never imports the server-side modules or receives the OpenAI API key.

```text
profile.ts
   ↓
KnowledgeChunk[]
   ↓
precomputed embeddings
   ↓
generated/rag-index.json

Visitor question
   ↓
POST /api/chat
   ↓
query embedding
   ↓
cosine similarity + relevance threshold
   ↓
intent-aware type reranking
   ↓
top-k profile chunks
   ↓
grounded OpenAI response
   ↓
structured PortfolioAnswer
```

The portfolio knowledge base is small, so in-memory vector search keeps the architecture lightweight and transparent while preserving a real embedding-based RAG pipeline. An external vector database is intentionally not used.

After cosine similarity, a deterministic intent detector recognizes project, professional-experience, education, and skill questions. A matching chunk type receives a modest `1.18` score multiplier. Other chunk types are never filtered out. The normal raw-vector threshold is `0.30`; an explicitly requested entity type may pass a separate `0.17` floor so a low-scoring but structurally relevant record, such as education, is not discarded before reranking. Debug output reports both the raw vector score and final reranked score.

Copy `.env.example` to a local `.env` and set `OPENAI_API_KEY`. Secrets must be configured only in the server environment and must never use a `VITE_` prefix. `OPENAI_EMBEDDING_MODEL` defaults to `text-embedding-3-small`; `OPENAI_ANSWER_MODEL` defaults to `gpt-5-mini`.

Build and commit the generated index whenever canonical profile content or the embedding model changes:

```bash
pnpm rag:build
```

`generated/rag-index.json` is intended to be version-controlled because it is immutable derived portfolio data required by the serverless function. It contains profile text and numeric embeddings, but no API key. It has not been generated until `rag:build` completes successfully.

To inspect retrieval and a final answer locally:

```bash
pnpm rag:test -- "What AI projects have you built?"
```

The serverless endpoint accepts a stateless request:

```json
POST /api/chat
{ "message": "What experience do you have with RAG?" }
```

It returns an `answer`, traceable `sources`, stable `relatedIds`, and a `confidence` level. Empty, malformed, non-POST, and messages over 500 characters are rejected without exposing internal errors.

The same pipeline can later accept generated profile data without changing retrieval:

```text
User uploads CV.pdf
↓
profile extraction and review
↓
Profile
↓
same chunking and RAG pipeline
```

This README intentionally avoids publishing personal contact details. The live site may contain user-facing contact UI, but repository documentation should not expose private contact information.

## Tech Stack

- Vite
- TypeScript-ready project setup
- React dependencies retained from the original setup
- Three.js for the GhostCursor WebGL effect
- HTML, CSS, and JavaScript for the current static page implementation
- GitHub Actions
- GitHub Pages

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the local site:

```bash
pnpm run dev
```

Open:

```text
http://localhost:3000/
```

Build for production:

```bash
pnpm run build
```

Preview the production build:

```bash
pnpm run preview
```

## GitHub Pages Deployment

Deployment is configured in `.github/workflows/pages.yml`.

On every push to `main`, GitHub Actions will:

1. Install dependencies with pnpm.
2. Build the Vite site.
3. Upload the `dist/` output as a Pages artifact.
4. Publish the latest portfolio to GitHub Pages.

`vite.config.ts` sets:

```ts
base: "./"
```

This is important because GitHub Pages serves the site from a repository subpath. Relative asset paths ensure the JavaScript bundle, character frames, and public assets load correctly on the live page.
