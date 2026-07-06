# harshith.dev — Portfolio v3

Personal portfolio of **Harshith Pali** — AI Engineer and full-stack developer based in Hyderabad.

🔗 **Live:** [harshith029.github.io/Portfolio-v2](https://harshith029.github.io/Portfolio-v2/)

A premium, dark-only, single-page site: Next.js static export with a React Three Fiber neural-constellation hero, Framer Motion reveals, Lenis smooth scrolling, and a ⌘K command palette.

---

## Stack

- **Next.js 15** (App Router, `output: "export"` — fully static)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Framer Motion** — reveals, counters, magnetic buttons, tilt cards
- **React Three Fiber + Three.js** — hero 3D scene (3 draw calls, lazy-loaded, DPR-capped)
- **Lenis** — smooth scrolling
- Fonts: Inter, Space Grotesk, Geist Mono via `next/font`

## Structure

```
src/
├── app/            # layout (SEO, JSON-LD), page, sitemap, robots, manifest, icon
├── components/
│   ├── three/      # HeroScene (R3F)
│   ├── ui/         # Reveal, Magnetic, Counter, Section, Icons
│   └── …           # Nav, Hero, Projects, About, Research, Skills,
│                   # Journey, Achievements, Contact, Footer,
│                   # CommandPalette, SmoothScroll, CursorGlow
├── data/           # all content: projects, skills, timeline, research, achievements
└── lib/            # shared easing + scroll helper
```

**All content lives in `src/data/`** — edit a project, skill, or timeline entry there and nothing else needs touching.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export → ./out
```

## Deployment

Deployed to **GitHub Pages** by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`:

1. `npm ci && npm run build` with `NEXT_PUBLIC_BASE_PATH=/Portfolio-v2`
2. `./out` is uploaded and deployed via `actions/deploy-pages`

Pages must be set to **"GitHub Actions"** as the build source (Settings → Pages).
To host at a root domain or on Vercel instead, drop the `NEXT_PUBLIC_BASE_PATH` env — no code changes needed.

## Performance notes

- Three.js is `next/dynamic`-imported with `ssr: false` — it never blocks first paint
- The hero scene is 3 draw calls (points, line segments, wireframe core) with a capped DPR of 1.75 and reduced particle counts on mobile
- `prefers-reduced-motion` disables Lenis, the scene loop, and entrance animations
- No image assets — visuals are CSS/SVG/canvas

## Design system

| Token | Value |
|---|---|
| Background | `#050505` |
| Panel / Surface / Card | `#0B0B0F` / `#111111` / `#18181B` |
| Accent | `#3B82F6` (electric blue) |
| Secondary | `#22D3EE` (cyan) |
| Success | `#10B981` |
| Text / Muted | `#FFFFFF` / `#A1A1AA` |
| Borders | `rgba(255,255,255,0.08)` |

## License

**Code:** MIT — fork, study, adapt.
**Content** (project descriptions, copy, achievements): © 2026 Harshith Pali. Use the code as a scaffold, but write your own story.

## Contact

- **Email:** [harshith.pali3286@gmail.com](mailto:harshith.pali3286@gmail.com)
- **GitHub:** [@Harshith029](https://github.com/Harshith029)
- **LinkedIn:** [krishnaharshith](https://www.linkedin.com/in/krishnaharshith/)
