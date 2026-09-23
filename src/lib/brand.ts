/**
 * Brand / logo registry.
 *
 * Three layers, in priority order:
 *   1. A file you drop in  public/logos/<slug>.svg  (or .png)  — always wins.
 *   2. An official mark from the `simple-icons` package, where one exists.
 *   3. A generated monogram tile in the brand colour.
 *
 * So every logo in the site has *something* real to show today, and any of them
 * can be swapped for the genuine asset later without touching a component.
 *
 * Named imports only — a namespace import would bundle all 3400+ icons.
 */
import {
  siCss,
  siExpress,
  siFacebook,
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siGoogle,
  siInstagram,
  siGoogleads,
  siGoogleanalytics,
  siGooglesheets,
  siHtml5,
  siJavascript,
  siMeta,
  siMongodb,
  siMysql,
  siN8n,
  siNodedotjs,
  siOpenapiinitiative,
  siOpenjdk,
  siPostman,
  siPython,
  siReact,
  siRedux,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siWhatsapp,
  siZapier,
} from 'simple-icons'

export type BrandDef = {
  /** file-safe id — also the filename to use in public/logos/ */
  slug: string
  label: string
  /** accent colour used for the mark, the glow and the monogram tile */
  color: string
  /** 24×24 SVG path from simple-icons, when an official mark exists */
  path?: string
  /** letters used when there is no mark and no uploaded file */
  initials?: string
}

type Seed = {
  names: string[]
  slug?: string
  color?: string
  icon?: { path: string; hex: string }
  initials?: string
}

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

const SEEDS: Seed[] = [
  /* --- marketing stack --- */
  { names: ['Google Ads'], icon: siGoogleads },
  { names: ['Meta Ads', 'Meta', 'Meta Ads / Google ads', 'Meta Ads / Google Ads'], slug: 'meta-ads', icon: siMeta },
  { names: ['Google Analytics'], icon: siGoogleanalytics },
  { names: ['Google Sheets'], icon: siGooglesheets },
  { names: ['Facebook', 'Facebook Page'], slug: 'facebook', icon: siFacebook },
  { names: ['Instagram', 'Instagram Reels'], slug: 'instagram', icon: siInstagram },
  { names: ['WhatsApp Marketing', 'WhatsApp API'], slug: 'whatsapp', icon: siWhatsapp },
  { names: ['SEO'], color: '#34d399', initials: 'SEO' },
  { names: ['CRM'], color: '#22d3ee', initials: 'CRM' },
  { names: ['Tata Dialer'], color: '#f97316', initials: 'TD' },
  { names: ['Excel'], color: '#217346', initials: 'XL' },
  { names: ['Canva'], color: '#00C4CC', initials: 'CV' },
  { names: ['UI/UX'], slug: 'ui-ux', color: '#e879f9', initials: 'UX' },
  { names: ['Lead Generation'], color: '#38bdf8', initials: 'LG' },
  { names: ['Landing Pages'], color: '#22d3ee', initials: 'LP' },
  { names: ['Automation'], color: '#8b5cf6', initials: 'AU' },
  { names: ['Data Analytics', 'Data & Analytics', 'Data Management', 'Data Scraping'], slug: 'data', color: '#fbbf24', initials: 'DA' },

  /* --- engineering stack --- */
  { names: ['React', 'React.js', 'ReactJS'], slug: 'react', icon: siReact },
  { names: ['JavaScript'], icon: siJavascript },
  { names: ['TypeScript'], icon: siTypescript },
  { names: ['Python'], icon: siPython },
  { names: ['Java'], icon: siOpenjdk, color: '#f89820' },
  { names: ['Node.js'], slug: 'nodejs', icon: siNodedotjs },
  { names: ['Express.js'], slug: 'express', icon: siExpress, color: '#94a3b8' },
  { names: ['Redux Toolkit', 'Redux'], slug: 'redux', icon: siRedux },
  { names: ['HTML5'], icon: siHtml5 },
  { names: ['CSS3'], slug: 'css3', icon: siCss },
  { names: ['Tailwind CSS'], icon: siTailwindcss },
  { names: ['MongoDB'], icon: siMongodb },
  { names: ['SQL Server'], slug: 'sql-server', icon: siMysql, color: '#4479A1' },
  { names: ['Git'], icon: siGit },
  { names: ['GitHub'], icon: siGithub, color: '#e2e8f0' },
  { names: ['Vercel'], icon: siVercel, color: '#e2e8f0' },
  { names: ['Vite'], icon: siVite },
  { names: ['Framer Motion'], slug: 'framer-motion', icon: siFramer },
  { names: ['Figma'], icon: siFigma },
  { names: ['Postman'], icon: siPostman },
  { names: ['Visual Studio Code', 'VS Code'], slug: 'vs-code', color: '#007ACC', initials: 'VS' },
  { names: ['n8n'], icon: siN8n },
  { names: ['Zapier'], icon: siZapier },
  { names: ['APIs'], slug: 'apis', icon: siOpenapiinitiative },

  /* --- companies --- */
  { names: ['Superior Creative Creation', 'SCC'], slug: 'scc', color: '#22d3ee', initials: 'SCC' },
  { names: ['Enego Services Pvt. Ltd.', 'Enego Services Private Limited', 'Enego'], slug: 'enego', color: '#8b5cf6', initials: 'EN' },
  { names: ['Safe Your Web'], slug: 'safe-your-web', color: '#34d399', initials: 'SYW' },
  { names: ['CodSoft'], slug: 'codsoft', color: '#e879f9', initials: 'CS' },
  { names: ['Binding Bricks', 'Binding Bricks Buildtech'], slug: 'binding-bricks', color: '#fbbf24', initials: 'BB' },
  { names: ['Bajaj Magadh Auto Agency'], slug: 'bajaj-magadh', color: '#0ea5e9', initials: 'BM' },
  { names: ['Bajaj Finance'], slug: 'bajaj-finance', color: '#2563eb', initials: 'BF' },
  { names: ['Magadh Iron', 'Magadh Iron Pvt. Ltd.', 'Magadh Iron Pvt.ltd'], slug: 'magadh-iron', color: '#f97316', initials: 'MI' },

  /* --- schools & issuers --- */
  { names: ['B.S. College, Danapur', 'B.S. College'], slug: 'bs-college', color: '#22d3ee', initials: 'BSC' },
  { names: ['Indira Gandhi National Open University (IGNOU)', 'IGNOU'], slug: 'ignou', color: '#8b5cf6', initials: 'IG' },
  { names: ['University of Helsinki • MinnaLearn', 'University of Helsinki'], slug: 'helsinki', color: '#60a5fa', initials: 'UH' },
  { names: ['Great Learning Academy', 'Great Learning'], slug: 'great-learning', color: '#f59e0b', initials: 'GL' },
  { names: ['Amity Institute for Competitive Examinations', 'Amity'], slug: 'amity', color: '#ef4444', initials: 'AM' },
  { names: ['BrainTrain Publication'], slug: 'braintrain', color: '#a78bfa', initials: 'BT' },
  { names: ['Magadh TMT Bars'], slug: 'magadh-tmt', color: '#f97316', initials: 'MT' },
  { names: ["St. Xavier's High School", "St. Xavier's High School, Patna"], slug: 'st-xaviers', color: '#38bdf8', initials: 'SX' },
  { names: ['St. Michael High School'], slug: 'st-michael', color: '#34d399', initials: 'SM' },
  { names: ['Rakhi Making Competition'], slug: 'rakhi', color: '#e879f9', initials: 'RM' },
  { names: ['Google'], icon: siGoogle },

  /* --- disciplines that show up as tiles on cards and in the 3D scene --- */
  { names: ['Performance Marketing'], slug: 'performance-marketing', color: '#8b5cf6', initials: 'PM' },
  { names: ['Lead Management'], slug: 'lead-management', color: '#22d3ee', initials: 'LM' },
  { names: ['Sales Automation'], slug: 'sales-automation', color: '#e879f9', initials: 'SA' },
  { names: ['Campaign Management'], slug: 'campaign-management', color: '#38bdf8', initials: 'CM' },
  { names: ['Business Strategy'], slug: 'business-strategy', color: '#34d399', initials: 'BS' },
  { names: ['Digital Growth', 'Growth'], slug: 'digital-growth', color: '#fbbf24', initials: 'DG' },
  { names: ['Conversion Strategy'], slug: 'conversion-strategy', color: '#a78bfa', initials: 'CS' },
  { names: ['Growth & Analytics'], slug: 'growth-analytics', color: '#e879f9', initials: 'GA' },
  { names: ['Web & Personal Brand'], slug: 'web-personal-brand', color: '#22d3ee', initials: 'WB' },
  { names: ['Digital Marketing'], slug: 'digital-marketing', color: '#38bdf8', initials: 'DM' },
  { names: ['AI', 'Artificial Intelligence'], slug: 'ai', color: '#8b5cf6', initials: 'AI' },
]

const FALLBACK_COLORS = ['#22d3ee', '#8b5cf6', '#e879f9', '#34d399', '#fbbf24', '#38bdf8']

const byName = new Map<string, BrandDef>()
const bySlug = new Map<string, BrandDef>()

for (const seed of SEEDS) {
  const slug = seed.slug ?? slugify(seed.names[0])
  const def: BrandDef = {
    slug,
    label: seed.names[0],
    color: seed.color ?? (seed.icon ? `#${seed.icon.hex}` : pickColor(slug)),
    path: seed.icon?.path,
    initials: seed.initials ?? initialsOf(seed.names[0]),
  }
  bySlug.set(slug, def)
  for (const n of seed.names) byName.set(n.toLowerCase(), def)
}

/* ------------------------------------------------------------------ */
/*  Lookup                                                             */
/* ------------------------------------------------------------------ */

/** Resolve any label ("Google Ads", "Bajaj Finance", "React.js") to a brand. */
export function brand(name: string): BrandDef {
  const hit = byName.get(name.toLowerCase()) ?? bySlug.get(slugify(name))
  if (hit) return hit
  const slug = slugify(name)
  const made: BrandDef = {
    slug,
    label: name,
    color: pickColor(slug),
    initials: initialsOf(name),
  }
  bySlug.set(slug, made)
  byName.set(name.toLowerCase(), made)
  return made
}

/** Where to look for a user-supplied logo file, most specific first. */
export function logoCandidates(slug: string) {
  const base = import.meta.env.BASE_URL || '/'
  return [`${base}logos/${slug}.svg`, `${base}logos/${slug}.png`, `${base}logos/${slug}.webp`]
}

/** Every brand the registry knows about — used by the docs page in the README. */
export function allBrands() {
  return Array.from(bySlug.values())
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[.'’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function initialsOf(name: string) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function pickColor(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return FALLBACK_COLORS[h % FALLBACK_COLORS.length]
}
