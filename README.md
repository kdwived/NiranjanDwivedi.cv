# Niranjan Dwivedi — 3D Portfolio

A scroll-driven 3D portfolio built with **Node.js tooling (Vite) + React + React Three Fiber**.

**Every shape in the world is made of particles.** There is not a single drawn line, wireframe
or solid mesh in the scene — rings, pipelines, timelines, card frames, the floor grid, even the
hero's shell are all points sampled along a path and spaced like beads on a string, drifting
slowly so nothing ever looks frozen. Scrolling flies a camera through nine zones while the
particle field re-forms itself into a different shape for each one, and readable HTML content
sits on top.

Content is ported from **niranjandwivedi.cv**.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # types only
```

Requires Node 18+ (built and tested on Node 22).

---

## Deploy

**Vercel** — push to GitHub, import the repo, accept the defaults:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework        | Vite            |
| Build command    | `npm run build` |
| Output directory | `dist`          |

**Netlify / Cloudflare Pages / GitHub Pages** — same build command, publish `dist`.
Single page, no client-side router, so no rewrite rules are needed.

---

## The two things you'll want to add

Everything below already works with placeholders. Adding the real files changes nothing in
the code — the site picks them up on the next load.

### 1. Photos and scans → `public/`

| folder | what goes in it |
| --- | --- |
| `public/images/` | hero portrait, three small work tiles, one About shot |
| `public/certificates/` | one scan per certificate (10 of them) |
| `public/projects/` | two screenshots per project |
| `public/logos/` | any brand or company logo you want to override |

Each folder has its own `README.md` listing the **exact file names** to use. Until a file
exists, the site shows a placeholder at exactly the right size naming the path it wants —
so the layout never shifts when you add the real thing.

### 2. Logos — the two-letter tiles

Anywhere you see **two letters** on the site (BF, MI, SCC, GL, PM, LM…) there is no
public logo for that name, so the site draws a monogram instead. Every one of them
can be replaced by dropping a file in `public/logos/`.

`public/logos/README.md` is generated from the real content and lists **every tile in
the site** — the letters you see, the exact file name to add, and what it is. The 81
monograms are listed first, because those are the ones worth uploading.

Logos resolve in three layers, best first:

1. **Your file** — `public/logos/<slug>.svg` (or `.png` / `.webp`). Always wins.
2. **The official mark**, shipped via the `simple-icons` package — React, TypeScript, Node,
   MongoDB, Google Ads, Meta, WhatsApp, Figma, Git, Postman, n8n, Zapier, Vercel, GitHub and
   about fifteen more already render their real logo, in their real brand colour.
3. **A monogram tile** in the brand colour, for anything with no public mark — your past
   employers, the colleges, the certificate issuers.

`public/logos/README.md` lists all 58 registered brands and flags the 29 that are currently
monograms — those are the ones worth uploading. To add or rename a brand, edit `SEEDS` in
`src/lib/brand.ts`.

The same three layers feed the 3D scene, so a logo you upload also appears on the floating
tiles in the toolkit sphere, the capability rings and the career helix.

---

## SEO &amp; AEO

The site is set up to own the search for **"Niranjan Dwivedi"** and to be quotable by AI
answer engines. What ships:

| what | where |
| --- | --- |
| Title, description, canonical, robots, geo tags | `index.html` |
| Open Graph + Twitter cards, with a generated share image | `index.html`, `public/images/og-image.jpg` |
| Structured data — Person, Organization, WebSite, ProfilePage, **FAQPage** | `index.html` (JSON-LD) |
| A visible FAQ that matches the FAQPage schema | About section, from `faqs` in `portfolio.ts` |
| `robots.txt` allowing GPTBot, PerplexityBot, ClaudeBot, Google-Extended | `public/robots.txt` |
| `sitemap.xml`, `site.webmanifest`, SVG favicon | `public/` |
| A `<noscript>` summary so non-JS crawlers still get the substance | `index.html` |

**Change the domain in four places** if it is ever not `niranjandwivedi.cv`: `seo.siteUrl` in
`src/data/portfolio.ts`, the canonical + og:url + JSON-LD `@id`s in `index.html`,
`public/sitemap.xml`, and `public/robots.txt`.

### What still needs doing off-page

On-page work is done, but ranking first for your own name also depends on things only you can
do — and they matter more than anything in this repo:

1. **Submit to Google Search Console** and Bing Webmaster Tools, then request indexing. This is
   the single highest-impact step and takes five minutes.
2. **Point your profiles at the site.** LinkedIn, GitHub, Instagram, X, Behance — the website
   field on each. Consistent name + city + links across profiles is what search engines use to
   confirm you are one person.
3. **Fill in `sameAs`** in the Person JSON-LD in `index.html` with those profile URLs. That array
   is deliberately empty right now because guessed links would be worse than none.
4. **Add the real portrait** at `public/images/portrait.jpg` — the Person schema references it.
5. Keep the domain, don't move it. Age on an exact-match name domain does a lot of the work.

Being straight with you: no one can promise position one. For an exact-match domain on an
uncommon name it is very achievable, usually within a few weeks of indexing — but it is decided
by Google, not by markup. The markup makes sure that when you do rank, the result shows your
name, photo, role and FAQ rather than a bare blue link.

---

## Editing the content

Everything else lives in **one file**: `src/data/portfolio.ts` — name, tagline, bio,
capabilities, growth flow, toolkit, skills and levels, projects, experience, education,
certificates, contact details, and the image file names.

Both the HTML sections and the 3D world read from it, so:

- add a job to `experience` → a new node appears on the 3D career helix, with its logo
- add a tool to `toolkit` → a new logo joins the sphere in Technical Arsenal
- add a project to `projects` → a new card, a new case-study view, a new floating panel
- add a `highlights` line or an `images` entry → it shows up in the project's detail view

---

## What's in each section

| section | HTML | behind it, all in particles |
| --- | --- | --- |
| Hero | portrait + work tiles, growth flow | a particle shell wrapping the portrait, two orbiting bead rings |
| About | bio, stats, approach, working shot | three orbiting discipline rings + drifting particle clusters |
| Capabilities | six cards, each with its real tool logos | those tools riding two counter-rotating particle rings |
| Growth Engine | three stages, system flow, working stack | Traffic → Scale strung along a particle path, with light pulsing down it; the field forms a funnel |
| Technical Arsenal | category switcher, proficiency bars | 20 logo tiles inside a particle shell |
| Experience | eight roles with company logos | a particle helix with a pulse travelling down it, one logo per employer |
| Projects | four clickable cards → full case study | particle-outlined frames carrying the logo and title |
| Academic Foundation | degree rail, year-filtered credential wall | particle pillars under an arc of issuer marks |
| Contact | details, socials, message form | the field forms an interlocking link mark |

Clicking a project opens a case-study view with what the system does, screenshot slots and
the stack. Clicking a certificate opens the scan full-screen. Both close on Escape.

---

## Project structure

```
src/
├─ data/portfolio.ts        ← ALL content lives here
├─ App.tsx                  ← canvas + overlay composition
├─ lib/
│  ├─ scroll.ts             ← global scroll store, per-section progress, easing
│  ├─ brand.ts              ← the logo registry (edit SEEDS to add a brand)
│  ├─ brandTexture.ts       ← the same logos, drawn to canvas for the 3D scene
│  ├─ logoProbe.ts          ← finds out which uploaded files actually exist
│  └─ labelTexture.ts       ← canvas-generated text, glow and project-card textures
├─ scenes/
│  ├─ World.tsx             ← camera rig, fog, starfield, particle lattices, zone placement
│  ├─ MorphField.tsx        ← the particle field and its nine target shapes
│  ├─ particles.tsx         ← how a shape becomes particles (see below)
│  ├─ zones.tsx             ← the nine 3D zones
│  ├─ BrandPlane.tsx        ← a logo tile floating in 3D
│  └─ primitives.tsx        ← Label, Glow, Bob, Spin
├─ sections/                ← the nine HTML overlay sections
├─ components/
│  ├─ Chrome.tsx            ← nav, dot rail, progress bar, loader, scroll hint
│  ├─ BrandIcon.tsx         ← logo in the DOM, with the same three fallbacks
│  ├─ ImageSlot.tsx         ← an image that isn't there yet, plus the lightbox
│  └─ ui.tsx                ← Section / Reveal / Card / Tag primitives
└─ styles/index.css         ← Tailwind layers, glass + scrim styling
```

## How the scroll drives everything

`src/lib/scroll.ts` measures progress **per section**, not against total document height, so
sections can be any height and the camera still sits in the matching 3D zone. `World.tsx`
reads that value inside `useFrame` and eases it; `MorphField.tsx` reads the same value and
blends the particle positions between shape *n* and shape *n+1*. No React re-render happens
per frame — the DOM overlay stays completely static while the world moves.

Four knobs, all in `App.tsx`:

- **`quality`** — scales every particle count (0.6 on phones, 1 on desktop).
- **`bias`** — how far right of centre the world sits so it clears the text column.
  Responsive: `0` under 900px, `5` under 1200px, `8.5` above.
- **`scale`** — shrinks the whole world on narrow screens, because a phone sees a much
  smaller slice of it: `0.46` under 640px, `0.6` under 900px, `0.85` under 1200px.
- **`reducedMotion`** — when the OS asks for reduced motion the canvas is replaced by a
  static gradient and all animation stops.

## Making shapes out of particles

`src/scenes/particles.tsx` is the whole vocabulary. Four samplers turn something into evenly
spaced points — `sampleEdges` (the edges of *any* geometry), `sampleCurve` (a path),
`sampleRing`, `sampleCluster` — and five components render them with motion:

| component | replaces | what it does |
| --- | --- | --- |
| `ParticleEdges` | wireframes | beads along the edges of any geometry you hand it |
| `ParticleRing` | every torus | a turning, slowly breathing ring of beads |
| `ParticleFlow` | tubes and pulses | beads along a path with light travelling down it |
| `ParticleFrame` | card outlines | a rectangle drawn in beads |
| `ParticleNode` | solid spheres | a soft, pulsing ball of points |
| `ParticleLattice` | the floor grid | a drifting plane of points |

Bead **size** matters more than count: a long edge with too few beads reads as dust rather
than a line. If a shape looks faint, raise `size` before raising `count`.

## The layout budget — read this before moving anything in the scene

On a wide screen the text column takes the left two-thirds, so the world only ever gets a
**tall, narrow strip** on the right: about ten units across and thirteen tall in this scene's
units. `BOX` and `CX` at the top of `src/scenes/zones.tsx` define it, and every zone is
composed as a vertical column inside it. Three rules keep it clean:

1. **Nothing leaves the box.** A ring of radius 6 or a card 6 wide will slide under the text
   and look like clutter. Keep shapes inside roughly ±4.8 units of `CX`.
2. **Rows are spaced by more than their own height.** The project cards are 2.4 tall on a
   2.95 pitch, so two frames can never touch however much they bob.
3. **Labels are anchored, not centred.** `Label` takes `anchor="left" | "right"`, which pins
   the text's edge to the thing it names. A centred label drifts further away the longer the
   text gets — that is exactly how "Qualification" ended up floating away from its node.

Colour follows one ramp (`themeColor`, cyan → violet → magenta) so every accent in the scene
belongs to the same theme, and the ambient `MorphField` is deliberately dimmer than the zone
content — it is the backdrop, never the subject.

## How the front and the back stay in step

Three links tie the text column to the world behind it, all through `src/lib/scroll.ts`:

- **`scrollState.sectionProgress`** — how far you are *through* a section. The experience
  helix and the project frames use it (via `useScrollIndex`) to light up the row for the
  card you are actually reading, and dim the rest.
- **`focusState`** — hovering a capability card calls `setFocus('capabilities', c.n)`, and
  the tool orbit turns to bring that card's own tools to the front and fades the others.
- **The shapes themselves** echo the layout: the Growth Engine's stage cards narrow as they
  go down, matching the funnel the particles form behind them.

Two of the nine particle shapes are drawn glyphs rather than maths: the ॐ in About and the
arrow pointing at the form in Contact. Both come from `glyphShape()`, which samples anything
you can draw on a canvas. Two things matter there: draw with a **light weight fill**, not a
stroke (stroking gives two parallel contours that merge into a blob), and the sampler walks
the contour **evenly** — random sampling clumps.

`SPACING` in `src/scenes/World.tsx` controls the distance between zones along −Z. To change
what a section's particles form, edit its builder in `MorphField.tsx` — `glyphShape()` turns
anything you can draw on a canvas into a particle shape, which is how the contact link mark
is made.

---

## Notes

- **No external 3D assets.** All text and logos in the 3D scene are drawn to canvas textures
  at runtime, so there are no font files or models to host.
- **The contact form uses Web3Forms.** Create a free access key at web3forms.com and paste it
  into `web3formsKey` in `src/data/portfolio.ts` — messages then arrive in your inbox, with a
  spam honeypot and a proper sending / sent / error state. Leave the key empty and the form
  falls back to opening the visitor's mail client, so it is never a dead end.
- Update the GitHub URL in `profile.github` (`src/data/portfolio.ts`) — it's a placeholder.
- Screenshots of dashboards or CRM screens usually need names and phone numbers blurred
  before they go on a public site.
