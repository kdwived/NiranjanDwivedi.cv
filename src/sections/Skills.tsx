import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Eyebrow, Reveal, Section } from '../components/ui'
import BrandIcon from '../components/BrandIcon'
import { skills } from '../data/portfolio'

export default function Skills() {
  const [active, setActive] = useState(0)
  const category = skills[active]

  return (
    <Section id="skills">
      <Reveal>
        <Eyebrow>Skills &amp; technologies</Eyebrow>
        <h2 className="section-title">
          Technical <span className="grad-text">Arsenal.</span>
        </h2>
        <p className="mt-4 max-w-xl text-white/50">
          A combination of programming, modern frameworks, web technologies, databases and
          professional tools.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="flex flex-col gap-2">
            {skills.map((s, i) => (
              <button
                key={s.category}
                onClick={() => setActive(i)}
                className={`glass flex items-center justify-between px-5 py-4 text-left transition-all ${
                  active === i ? 'border-white/25' : 'opacity-70 hover:opacity-100'
                }`}
                style={active === i ? { borderColor: `${s.color}66` } : undefined}
              >
                <span className="flex items-center gap-3">
                  <span className="flex -space-x-1.5">
                    {s.items.slice(0, 3).map((it) => (
                      <BrandIcon key={it.name} name={it.name} size={24} />
                    ))}
                  </span>
                  <span>
                  <span className="block text-sm font-semibold text-white">{s.category}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/35">
                    {s.items.length} technologies
                  </span>
                  </span>
                </span>
                <span
                  className="h-2 w-2 rounded-full transition-all"
                  style={{
                    background: s.color,
                    boxShadow: active === i ? `0 0 14px ${s.color}` : 'none',
                    opacity: active === i ? 1 : 0.35,
                  }}
                />
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card accent={category.color} className="h-full">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold text-white">{category.category}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                Proficiency
              </span>
            </div>
            <div className="mt-7 space-y-5">
              {category.items.map((item, i) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2.5 text-white/80">
                      <BrandIcon name={item.name} size={26} />
                      {item.name}
                    </span>
                    <span className="font-mono text-xs" style={{ color: category.color }}>
                      {item.level}%
                    </span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      key={`${category.category}-${item.name}`}
                      className="h-full rounded-full"
                      style={{ background: category.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-white/10 pt-5 text-sm text-white/40">
              Technology is a tool. Impact is the goal.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
