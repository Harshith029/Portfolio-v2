# harshith.dev — Portfolio

Personal portfolio of **Harshith Pali** — AI Engineer and full-stack developer based in Hyderabad.

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies. Runs on plain GitHub Pages.

🔗 **Live:** [harshith029.github.io/Portfolio](https://harshith029.github.io/Portfolio-v2/)

---

## Features

- **Dark terminal-editorial aesthetic** — JetBrains Mono + Fraunces, orange accent
- **Interactive hero terminal** with 20+ commands (`help`, `projects`, `sudo hire`, `joke`, etc.)
- **Six project cards with custom visuals** — each hand-built in SVG/CSS, showing what the system actually does (SQL safety checks for SafeMigrate, route scoring for AITO, WhatsApp chat flow for QuickDrop, and more)
- **Second Brain** — a local knowledge base with fuzzy matching that answers questions about projects, stack, availability, and hiring terms. Runs 100% in the browser, no API keys, no backend.
- **Command palette** (`⌘K` / `Ctrl+K`) — quick navigation and actions
- **Live status pill** — rotating activity indicator with password-protected admin panel
- **Fully responsive** — mobile, tablet, desktop
- **Respects `prefers-reduced-motion`**
- **SEO + Open Graph meta tags** for link previews on Twitter/LinkedIn

---

## Tech stack

- HTML5 / CSS3 / Vanilla JavaScript — no framework, no build step
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) + [Fraunces](https://fonts.google.com/specimen/Fraunces) via Google Fonts
- Hosted on GitHub Pages

That's it. No npm, no webpack, no transpilation. One file, one deploy, done.

---

## Project structure

```
Portfolio/
├── index.html              # the entire site — HTML, CSS, and JS inline
├── Harshith Resume.pdf     # downloadable resume
└── README.md               # this file
```

Single-file architecture is deliberate:
- Zero build step, zero dependencies, zero tooling to break
- Works anywhere HTML works — GitHub Pages, local file, USB stick, anywhere
- Easy to audit and deploy in one commit

---

## Running locally

**Option 1 — Just open the file**

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

Most features work. The **admin panel password unlock** won't work from `file://` because the `crypto.subtle` API requires a secure context (`https://` or `localhost`). To test that, use Option 2.

**Option 2 — Run a local server**

```bash
# Python 3
python3 -m http.server 8000

# Node
npx http-server -p 8000

# Or: VS Code with the "Live Server" extension
```

Then open [http://localhost:8000](http://localhost:8000).

---

## Deploying to GitHub Pages

1. Push this repo to GitHub (public)
2. Go to **Settings → Pages**
3. **Source:** Deploy from a branch
4. **Branch:** `main` / `(root)`
5. Save
6. Site goes live at `https://YOUR-USERNAME.github.io/REPO-NAME/` within ~1 minute

**For a custom domain:** add a `CNAME` file to the repo root containing your domain (e.g., `harshith.dev`), and add a CNAME DNS record at your registrar pointing to `YOUR-USERNAME.github.io`.

---

## Admin panel

The floating status pill (bottom-left) has a hidden admin mode for updating your current status (e.g., "coding / safemigrate", "watching youtube", "in class").

**How to access:**
- Click the ✎ pencil icon on the pill, or
- Press `Alt + S`, or
- Type `admin` in the terminal, or
- Open the command palette (`⌘K`) and select "Admin · set status"

**Authentication:**
- Protected by a SHA-256 hashed password
- Hash is stored in the `ADMIN_PASSWORD_HASH` constant inside `index.html`
- Unlock persists for the current browser session only (uses `sessionStorage`)

**Security caveat:** this is client-side auth. Good enough to keep casual visitors from changing your status, but anyone with DevTools and time could brute-force the hash offline. Fine for a portfolio. Don't use this pattern for actual secrets.

**To change the password:**

Paste this in your browser console, replacing `yourpass` with your new password:

```javascript
crypto.subtle.digest("SHA-256", new TextEncoder().encode("yourpass"))
  .then(h => console.log(Array.from(new Uint8Array(h))
    .map(b => b.toString(16).padStart(2, "0")).join("")));
```

Copy the 64-character hash it prints, and replace the `ADMIN_PASSWORD_HASH` value in `index.html`.

---

## Second Brain

Interactive Q&A panel in section 07 that knows about the projects, stack, availability, and hiring terms.

Current implementation: local bigram fuzzy matching over a ~20-entry knowledge base. Handles typos and loose phrasing, picks from multiple answer variants so replies don't feel canned.

**How it works:**
- KB lives in the `kb` array inside the main `<script>` block
- Each entry has `keywords` (for matching) and `answers` (an array of variants)
- `similarity()` function scores bigram overlap between the user's question and each entry
- Best-scoring entry above a 0.45 threshold wins; otherwise a fallback response is shown
- `lastAnswerIndex` prevents the same variant from repeating twice in a row

**To add a new Q&A topic:**
1. Add a new object to the `kb` array with `id`, `keywords` (array of strings), and `answers` (array of HTML strings)
2. Save and reload — no build step, works immediately

**Limits:** keyword matching has blind spots with negations ("why *shouldn't* I hire you?") or out-of-scope questions. A future upgrade could swap this for a real LLM via a serverless proxy to Claude or GPT — but the local version keeps the site free to run with zero backend.

---

## Customization

**Colors** — edit the CSS `:root` variables at the top of `index.html`:

```css
--accent: #ff5b2e;  /* main orange */
--amber: #f5c76a;   /* secondary highlight */
--cyan: #7fd9cf;    /* data / info */
--green: #7ad67a;   /* success */
--danger: #ff6f61;  /* warnings */
```

**Projects** — edit the `<article class="project-card">` blocks in the Work section. Each card has its own custom SVG/CSS visual — inspect classes like `.safemigrate-visual`, `.quickdrop-visual`, `.traffic-visual` to see how the visuals are constructed.

**Socials** — if you change any social link, update it in all five places to stay consistent:
1. Contact section (section 09) — the grid of `<a class="contact-link">` cards
2. Footer — the "Elsewhere" column
3. Command palette — `paletteActions` object in the main script
4. Terminal `contact` command — the `terminalCommands.contact` array
5. Second Brain KB — the `contact` entry in the `kb` array

**Status presets** — edit the `.status-preset` buttons in the status admin modal to change what quick-preset moods are available.

---

## Credits

- Design & engineering: Harshith Pali (built with pair-programming from Claude)
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Fraunces](https://fonts.google.com/specimen/Fraunces)
- Hosting: GitHub Pages

Design influences: editorial-dev aesthetic popularized by sites like [rauno.me](https://rauno.me), [linear.app](https://linear.app), and [vercel.com](https://vercel.com). Specific layouts, visuals, content, and code are original to this project.

---

## License

**Code:** MIT — fork, study, adapt.

**Content** (project descriptions, copy, achievements, Second Brain responses): © 2026 Harshith Pali. Please don't copy verbatim for your own portfolio — use the code as a scaffold, but write your own story.

---

## Contact

- **Email:** [harshith.pali3286@gmail.com](mailto:harshith.pali3286@gmail.com)
- **GitHub:** [@Harshith029](https://github.com/Harshith029)
- **LinkedIn:** [krishnaharshith](https://www.linkedin.com/in/krishnaharshith/)
- **HuggingFace:** [@Harshdev09](https://huggingface.co/Harshdev09)
- **Kaggle:** [@harshithpali](https://www.kaggle.com/harshithpali)
