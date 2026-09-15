# AI Agent Working Guide

This file is the fast handoff for AI coding agents working on the portfolio. Read `README.md` for the product overview and this file before changing implementation details.

## Current Architecture

- `index.html` is the active application: markup, responsive CSS, UI rendering, Hero interactions, scroll animation, chat client, avatar direction mapping, and Three.js cursor effect all live here.
- `src/data/profile.ts` is the canonical source for visible UI content, skills, experience, education, projects, project images, and external links.
- `knowledge/profile.md` is the canonical RAG source for identity and biography questions. Its facts are kept together in the `summary-profile` chunk.
- `src/rag/` contains framework-independent chunking, intent detection, retrieval, prompting, embeddings, and answer generation.
- `api/chat.ts` is the Vercel serverless chat endpoint. Never expose the OpenAI key to browser code.
- `generated/rag-index.json` is committed derived data used by the API. It currently contains 20 chunks.
- `public/angle-frames/` and related preview/contact-sheet assets support the pointer-following avatar.
- `.github/workflows/pages.yml` builds the frontend for GitHub Pages and points it at the separately hosted Vercel API.

`src/main.tsx` and `src/styles.css` are not the main UI surface. Do not migrate `index.html` into React merely because React packages are installed.

## Current Product State

- Frontend/API/RAG integration works.
- The Hero preserves the directional avatar, particle title, subtle GhostCursor, speech bubble with tail, input, five electric-border suggested questions, source chips, and related-section navigation.
- Chat remains stateless and single-turn. Do not add history or streaming unless explicitly requested.
- Post-Hero highlight cards and About skill cards replay their entrance only on downward passes. They reset after an upward exit.
- About copy highlights from top to bottom with a feathered boundary; the heading completes before the paragraph begins.
- Projects are a single-column native sticky ScrollStack, not a three-column grid. The existing edge glow and project links must remain usable.
- Responsive rules intentionally stop desktop absolute Hero positioning below the tablet breakpoint.
- Reduced-motion users receive static, immediately readable content.

## Important Invariants

- Preserve the existing visual theme, avatar artwork, directional interaction, RAG behavior, suggested-question behavior, source chips, and API wiring.
- Prefer small CSS/JavaScript refinements over structural rewrites.
- Do not add animation dependencies such as GSAP or Lenis for effects already implemented with native browser APIs.
- Keep visible portfolio data in `src/data/profile.ts`; avoid duplicating copy in `index.html` unless it is section-level UI copy.
- Keep basic identity, biography, career-focus, and roles-of-interest answers grounded in `knowledge/profile.md`. Do not hardcode them in `api/chat.ts` or the prompt.
- Keep stable profile IDs because RAG `relatedIds` and source-chip navigation depend on matching `data-profile-id` values.
- Project images must have meaningful `imageAlt` text and links must point to the corresponding repository or public page.
- Never put `OPENAI_API_KEY` in a `VITE_` variable or client bundle.
- Preserve relative asset paths so GitHub Pages works from a repository subpath.
- Respect `prefers-reduced-motion` for new animation work.

## Profile and RAG Update Workflow

When changing identity or biography facts, edit `knowledge/profile.md`. When changing visible site content, skills, experience, education, projects, project links, or project descriptions, edit `src/data/profile.ts`. Keep overlapping facts consistent.

1. Edit the appropriate canonical source or sources.
2. Update or add retrieval tests when semantic coverage changes.
3. Run `pnpm rag:build` to regenerate `generated/rag-index.json` (requires `OPENAI_API_KEY` and network access).
4. Confirm the generated item count matches `buildKnowledgeChunks(profile, canonicalProfileKnowledge)` and update intentional fixed-count tests.
5. Run the full validation commands below.

Changing only presentation CSS/JavaScript does not require rebuilding the RAG index.

## Validation

Run before handing work back:

```bash
pnpm typecheck
pnpm test
pnpm build
```

For retrieval or answer changes, also run targeted checks such as:

```bash
pnpm rag:test -- "What AI projects have you built?"
pnpm rag:regression
```

The Vite development URL is `http://localhost:5173/`. `pnpm preview` uses port 3000. Run `pnpm dev:api` separately for local end-to-end chat testing.

## Known Build Note

Vite currently reports that the main minified JavaScript chunk is larger than 500 kB because the single page includes Three.js and post-processing. The build succeeds. Treat this as a performance-improvement opportunity, not a functional failure; do not perform an unsolicited architecture rewrite solely to remove the warning.
