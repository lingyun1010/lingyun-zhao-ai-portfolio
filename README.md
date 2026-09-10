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
