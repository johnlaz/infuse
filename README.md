# INFUSE — Site Injector

**Edit every word and image on any website — without touching a single line of code.**

INFUSE Site Injector is a browser-based PWA (Progressive Web App) that lets you load any HTML file, visually edit all its text and images, preview changes live, and export a clean updated file — all powered by Groq AI.

---

## What It Does

You drop in an HTML file. INFUSE parses it and surfaces every heading, paragraph, link, button, list item, and image as an editable card. You make your changes. You export. No code editor, no FTP, no Git. Just the content.

It's built for designers handing off to clients, agencies doing rapid revisions, freelancers making quick copy tweaks, and anyone who needs to update a site without opening the source.

---

## Features

### Visual Content Editor
- Parses every text element from your HTML — headings (H1–H6), paragraphs, links, buttons, list items, labels, table cells, blockquotes, and more
- Detects all `<img>` tags automatically, including those with no `src`
- Filter tabs let you view All / Headings only / Text only / Images only with live element counts
- Each field shows its tag type, a character count, and warns when text is getting long
- Click any element in the live preview to jump directly to its edit card

### Live Preview
- Toggle a full-width browser preview of your HTML file as you edit
- All changes reflect in real time (300ms debounce)
- A macOS-style browser chrome frame with colored dots makes it feel like a real browser window
- Click any element in the preview — it closes the preview and jumps your editor to the right field

### Image Management
- Upload replacement images directly from your computer — no URLs needed
- Uploaded images are embedded as base64 so the exported file is fully self-contained
- Thumbnail previews with upload overlay on hover
- Alt text editing for every image (accessibility + SEO)

### Groq AI Deep Scan
- One-click scan that sends your HTML to Groq's llama-3.3-70b model
- Finds images the DOM parser misses: CSS `background-image: url()` values in `<style>` blocks, inline styles, `srcset`, and `data-src` attributes
- Newly discovered images are added to the Images tab with a ✦ badge and their source context as a label
- Runs after session start — greyed out before

### Groq AI Content Assistant
- Full AI chat panel (slide-in from the right) powered by Groq — the fastest publicly available LLM inference
- Per-field suggestions: click the AI button on any text card to get a specific rewrite suggestion with an inline Apply button
- **AI Review All** — sends your top 8 text fields for a bulk quality/SEO review in one shot
- Quick-prompt chips: Review, Headlines, SEO, Tone, CTAs
- Full conversation history maintained across the session

### Theme & Color System
- **3 built-in preset themes** (Dark Ocean, Midnight Pro, Forest Tech) that automatically map to your page's actual CSS variable names
- **AI Theme Generator** — Groq reads your page content and generates 3 custom branded palettes using your file's real CSS variables
- **Manual color picker** — reads every `--variable: #hex` from your page's `<style>` blocks and surfaces them as editable swatches
- Selecting a theme or adjusting a swatch immediately opens the preview and applies the change live
- Colors are injected with `!important` appended to body end, guaranteeing they win the cascade over the page's own `:root` block

### Export
- Downloads a clean `.edited.html` file with all your changes applied
- Text replacements use DOM path-based logic — no regex string hacks — so nested spans and complex layouts export correctly
- Theme colors are baked in as a `<style>` block appended before `</body>`
- The exported file is fully standalone — no dependencies on INFUSE

### PWA Support
- Installable as a desktop or mobile app via your browser's "Add to Home Screen" / "Install" prompt
- Works offline after first load (service worker caches the app shell)
- GitHub Pages compatible — includes `.nojekyll`, `404.html` redirect, and a navigation-first service worker that prevents white-page-on-refresh issues

---

## How to Use

### 1. Set Your Groq Key
Click **Set Groq Key** in the top bar. Get a free key at [console.groq.com/keys](https://console.groq.com/keys) — no billing required, generous free tier. Your key is stored in browser memory only and never sent anywhere except directly to Groq's API.

### 2. Load Your HTML
Drag and drop an `.html` file onto the drop zone, or click to browse. Multiple files can be queued. Select one and click **Start Session**.

### 3. Edit
- Scroll through the editor cards and update any text directly in the textarea
- Click the 🤖 button on any card for an AI rewrite suggestion
- Click the image thumbnail or Upload Image button to swap any image
- Use the filter tabs to focus on just headings, text, or images

### 4. Deep Scan (optional)
Click **Groq Deep Scan** to find images the parser may have missed — especially useful for sites that use CSS background images or lazy-loading patterns.

### 5. Preview
Toggle **Preview** in the top bar to see your changes in a live iframe. Click any element in the preview to jump to its edit card.

### 6. Themes (optional)
Click **Themes** to open the color system. Pick a preset, generate AI themes from your content, or manually tweak any CSS variable color with the color picker.

### 7. Export
Click **Export** to download your finished file as `[original-name].edited.html`.

---

## File Structure

```
infuse-v1.8/
├── index.html              # The entire app — self-contained, ~320KB
├── manifest.json           # PWA manifest (name, icons, theme color)
├── sw.js                   # Service worker (offline support, GitHub Pages compatible)
├── infusesiteinjector.ico  # App icon
├── 404.html                # GitHub Pages SPA redirect (prevents white-page-on-refresh)
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
└── README.md               # This file
```

---

## Hosting on GitHub Pages

1. Create a new repository (public)
2. Upload all 6 files (including `.nojekyll` and `404.html`) to the root
3. Go to **Settings → Pages** and set the source to `main` branch / root
4. Your app will be live at `https://yourusername.github.io/your-repo-name/`

The `.nojekyll` file is critical — without it, GitHub's Jekyll processing can silently mangle assets. The `404.html` redirect prevents white pages when navigating directly to the URL or refreshing.

---

## Technical Notes

- **AI Model:** Groq `llama-3.3-70b-versatile` — used for chat, per-field suggestions, deep scan, and theme generation
- **No backend:** Everything runs in the browser. Your HTML files and Groq key never leave your machine (except the key being sent to Groq's API in request headers)
- **DOM-based replacement:** Text and image edits use CSS-path-based DOM targeting, not string matching — handles nested spans, complex layouts, and repeated text safely
- **Theme injection:** Colors are written as `--var: value !important` inside a `<style id="injector-theme">` block appended to `<body>`, guaranteeing cascade priority over the page's own `:root` definitions
- **Image embedding:** Uploaded images are stored as base64 data URIs in the exported HTML — no external file references needed

---

## Built With

- Vanilla HTML, CSS, JavaScript — zero frameworks, zero build step
- [Groq API](https://console.groq.com) — llama-3.3-70b-versatile
- [Google Fonts](https://fonts.google.com) — Syne, JetBrains Mono, Inter

---

*INFUSE Site Injector — v1.8*
