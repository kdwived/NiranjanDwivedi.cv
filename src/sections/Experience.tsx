import { Eyebrow, Reveal, Section, Tag } from '../components/ui'
import BrandIcon from '../components/BrandIcon'
import { experience } from '../data/portfolio'

export default function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <Eyebrow>Professional journey</Eyebrow>
        <h2 className="section-title">
          Where I've <span className="grad-text">Worked.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/50">
          From sales and customer relationships to digital marketing, growth, technology and
          automation — each role added a layer to the way I build growth systems today.
        </p>
      </Reveal>

      <div className="relative mt-12 pl-6 sm:pl-10">
        <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan via-violet to-transparent sm:left-3" />

        {experience.map((job, i) => (
          <Reveal key={job.n} delay={Math.min(i, 4) * 0.05}>
            <article className="group relative pb-10">
              <span
                className={`absolute -left-6 top-2 h-2.5 w-2.5 rounded-full ring-4 ring-ink sm:-left-[2.55rem] ${
                  i === 0 ? 'bg-cyan' : 'bg-white/25'
                }`}
                style={i === 0 ? { boxShadow: '0 0 16px #22d3ee' } : undefined}
              />
              <div className="glass p-5 transition-colors group-hover:border-white/20 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan/70">
                    {job.n}
                  </span>
                  <span className="chip">{job.badge}</span>
                  <span
                    className={`chip ${job.status === 'CURRENT' ? 'border-cyan/40 text-cyan' : ''}`}
                  >
                    {job.status}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-white/35">{job.period}</span>
                </div>

                <div className="mt-4 flex items-start gap-4">
                  <BrandIcon name={job.company} size={46} />
                  <div>
                    <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-white/55">{job.company}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{job.body}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
