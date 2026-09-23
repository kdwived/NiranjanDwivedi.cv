import { Card, Eyebrow, Reveal, Section } from '../components/ui'
import ImageSlot from '../components/ImageSlot'
import { approach, faqs, media, profile } from '../data/portfolio'

export default function About() {
  return (
    <Section id="about">
      <Reveal>
        <Eyebrow>About me</Eyebrow>
        <h2 className="section-title">
          About <span className="grad-text">Niranjan.</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip normal-case tracking-normal">From {profile.origin}</span>
              <span className="chip normal-case tracking-normal">Based in Noida</span>
              <span className="chip normal-case tracking-normal">Working across India</span>
            </div>
          </Reveal>
          {profile.bio.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-white/60 sm:text-lg">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.stats.map((s) => (
                <div key={s.label} className="glass px-4 py-4">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="flex h-full flex-col gap-4">
          <ImageSlot
            dir="images"
            file={media.aboutShot}
            label="Add a working shot"
            className="aspect-[16/10] w-full"
          />
          <Card accent="#8b5cf6" className="flex-1">
            <p className="eyebrow mb-5">My approach</p>
            <ul className="space-y-4">
              {approach.map((a) => (
                <li key={a.n} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-[10px] text-cyan/70">{a.n}</span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{a.title}</span>
                    <span className="block text-sm text-white/45">{a.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          </div>
        </Reveal>
      </div>

      {/* Plain answers to the questions people actually type. These are also
          emitted as FAQPage structured data in index.html — keep the two in
          step, or search engines will see a mismatch. */}
      <Reveal delay={0.2}>
        <div className="mt-14">
          <p className="eyebrow mb-5">Quick answers</p>
          <div className="grid gap-3 md:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="glass group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-white/85">
                  {f.q}
                  <span className="shrink-0 text-white/30 transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
