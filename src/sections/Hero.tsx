import { motion } from 'framer-motion'
import { Section } from '../components/ui'
import ImageSlot from '../components/ImageSlot'
import { growthFlow, media, profile } from '../data/portfolio'

export default function Hero() {
  return (
    <Section id="hero" className="!py-20" wide>
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ---------------------------------------------------------- text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="eyebrow mb-6"
          >
            {profile.brand}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl"
          >
            Niranjan
            <br />
            <span className="grad-text">Dwivedi.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-white/65"
          >
            {profile.tagline}
            <span className="mt-3 block text-base text-white/45">{profile.intro}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Let's connect
            </a>
            <a
              href="#projects"
              className="glass rounded-full px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              View the work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35"
          >
            {growthFlow.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={i === 0 ? 'text-cyan' : undefined}>{step}</span>
                {i < growthFlow.length - 1 && <span className="text-white/15">→</span>}
              </span>
            ))}
          </motion.div>
        </div>

        {/* -------------------------------------------------------- portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden justify-self-end lg:block"
        >
          <div className="relative w-[360px] xl:w-[400px]">
            <span className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan/20 via-violet/10 to-transparent blur-2xl" />

            <ImageSlot
              dir="images"
              file={media.portrait}
              label="Add your portrait"
              className="aspect-[4/5] w-full backdrop-blur-xl"
            />

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {media.heroGallery.map((file, i) => (
                <ImageSlot
                  key={file}
                  dir="images"
                  file={file}
                  label={`Work ${i + 1}`}
                  hint={false}
                  className="aspect-square backdrop-blur-xl"
                />
              ))}
            </div>

            <div className="glass mt-2.5 flex items-center justify-between px-4 py-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Based in
              </span>
              <span className="text-xs text-white/70">Noida, India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
