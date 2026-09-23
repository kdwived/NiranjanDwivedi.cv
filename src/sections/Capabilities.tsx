import { Card, Eyebrow, Reveal, Section } from '../components/ui'
import { BrandRow } from '../components/BrandIcon'
import { clearFocus, setFocus } from '../lib/scroll'
import { capabilities } from '../data/portfolio'

export default function Capabilities() {
  return (
    <Section id="capabilities">
      <Reveal>
        <Eyebrow>Capabilities</Eyebrow>
        <h2 className="section-title">
          What <span className="grad-text">I do.</span>
        </h2>
        <p className="mt-4 max-w-xl text-white/50">
          Six connected disciplines — used together, not as separate services.
        </p>
        <p className="mt-2 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 lg:block">
          Hover a card to find its tools in the field
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.06}>
            <div
              className="h-full"
              onMouseEnter={() => setFocus('capabilities', c.n)}
              onMouseLeave={() => clearFocus('capabilities')}
              onFocus={() => setFocus('capabilities', c.n)}
              onBlur={() => clearFocus('capabilities')}
              tabIndex={0}
            >
            <Card accent={c.accent} className="h-full">
              <div className="flex items-start justify-between">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg border text-[11px] font-bold"
                  style={{ borderColor: `${c.accent}55`, color: c.accent }}
                >
                  {c.n}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: c.accent, boxShadow: `0 0 12px ${c.accent}` }}
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">{c.body}</p>
              <BrandRow names={c.tools} size={30} className="mt-5" />
            </Card>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
