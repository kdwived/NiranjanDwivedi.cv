import { Card, Eyebrow, Reveal, Section } from '../components/ui'
import BrandIcon from '../components/BrandIcon'
import { engine, profile, systemFlow, toolkit } from '../data/portfolio'

export default function Engine() {
  return (
    <Section id="engine">
      <Reveal>
        <Eyebrow>SCC operating system</Eyebrow>
        <h2 className="section-title">
          The <span className="grad-text">Growth Engine.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/50">
          Superior Creative Creation is the ecosystem I am building around marketing, technology,
          AI, automation, branding and practical business growth.
        </p>
      </Reveal>

      {/* the cards narrow as you go down, so the front reads as the same
          funnel the particles form behind it */}
      <div className="mt-10">
        {engine.map((e, i) => {
          const accent = ['#22d3ee', '#8b5cf6', '#e879f9'][i]
          return (
            <Reveal key={e.title} delay={i * 0.08}>
              <div
                className="mx-auto transition-all"
                style={{ maxWidth: `${100 - i * 15}%` }}
              >
                <Card accent={accent}>
                  <div className="flex items-start gap-5">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] font-bold"
                      style={{ borderColor: `${accent}55`, color: accent }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{e.title}</h3>
                      <p className="mt-1.5 text-sm text-white/45">{e.body}</p>
                    </div>
                  </div>
                </Card>
              </div>
              {i < engine.length - 1 && (
                <div className="flex justify-center py-2" aria-hidden>
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                    <path
                      d="M1 1l8 9 8-9"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.2}>
        <div className="glass mt-4 flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <span className="eyebrow">System flow</span>
          <div className="flex flex-wrap items-center gap-3">
            {systemFlow.map((s, i) => (
              <span key={s.label} className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-white/30">{s.n}</span>
                  <span className="text-xs font-semibold tracking-widest text-white/75">
                    {s.label}
                  </span>
                </span>
                {i < systemFlow.length - 1 && <span className="text-white/15">›</span>}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="mt-10">
          <p className="eyebrow mb-4">Working stack</p>
          <div className="flex flex-wrap gap-2">
            {toolkit.map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 text-xs text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                <BrandIcon name={t} size={24} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.34}>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-white/35">
          Core philosophy — creative ideas <span className="text-cyan">→</span> intelligent systems{' '}
          <span className="text-violet">→</span> business growth
        </p>
        <p className="mt-3 text-sm text-white/40">{profile.philosophy.body}</p>
      </Reveal>
    </Section>
  )
}
